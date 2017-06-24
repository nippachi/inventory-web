let React          = require("react");
let Shadow         = require("react-material/ui/effect/Shadow");
let Tab            = require("react-material/ui/view/Tab");
let TabBar         = require("react-material/ui/view/TabBar");
let ViewPager      = require("react-material/ui/view/ViewPager");
let DesignBody = require("echat/ui/view/setting/widgetSetting/DesignBody");
let PageTitle      = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/setting/widgetSetting/WidgetSettingPage/classNames");

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
        className={classNames.WidgetPage}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="ウィジェット設定"
            description="訪問者側に表示されるチャット画面の変更ができます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/setting/widget",
                query   : {
                  "tab_index": "0"
                }
              }}
            >
              デザイン設定
            </Tab>
          </TabBar>
        </Shadow>
        <ViewPager
          selectedIndex={location.query["tab_index"] || 0}
          className={classNames.ViewPager}
        >
          <DesignBody
            className={classNames.DesignPage}
            operateApi={operateApi}
          />
          <div/>
        </ViewPager>
      </div>
    )
  }

};
