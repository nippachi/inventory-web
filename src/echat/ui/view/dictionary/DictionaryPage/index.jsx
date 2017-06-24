let React          = require("react");
let Shadow         = require("react-material/ui/effect/Shadow");
let Tab            = require("react-material/ui/view/Tab");
let TabBar         = require("react-material/ui/view/TabBar");
let ViewPager      = require("react-material/ui/view/ViewPager");
let DictionaryBody = require("echat/ui/view/dictionary/DictionaryBody");
let PageTitle      = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/dictionary/DictionaryPage/classNames");

module.exports = class extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    let {
          location,
          operateApi,
          joinVisitor,
          visitors,
          selectedVisitorIds,
          accountDictionaries,
          operatorDictionaries,
          operators,
          operator,
          ...props
        } = this.props;

    return (
      <div
        className={classNames.DictionaryPage}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="定型文設定"
            description="チャット対応中、使用頻度の高い文章を定型文として登録できます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/dictionaries",
                query   : {
                  "tab_index": "0"
                }
              }}
            >
              個人設定
            </Tab>
            <Tab
              to={{
                pathname: "/dictionaries",
                query   : {
                  "tab_index": "1"
                }
              }}
            >
              全体設定
            </Tab>
          </TabBar>
        </Shadow>
        <ViewPager
          selectedIndex={location.query["tab_index"] || 0}
          className={classNames.ViewPager}
        >
          <DictionaryBody
            operateApi={operateApi}
            scope="operator"
            className={classNames.DictionaryBody}
            dictionaries={operatorDictionaries}
          />
          <DictionaryBody
            operateApi={operateApi}
            scope="account"
            className={classNames.DictionaryBody}
            dictionaries={accountDictionaries}
          />
        </ViewPager>
      </div>
    )
  }
};
