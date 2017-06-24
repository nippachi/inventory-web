let React       = require("react");
let ProfileBody = require("echat/ui/view/operator/ProfileBody");
let Shadow      = require("react-material/ui/effect/Shadow");
let Tab         = require("react-material/ui/view/Tab");
let TabBar      = require("react-material/ui/view/TabBar");
let ViewPager   = require("react-material/ui/view/ViewPager");
let PageTitle   = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/operator/OperatorPage/classNames");

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
        className={classNames.Operator}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="オペレーター"
            description="プロフィール画像や表示名などの個人設定を変更できます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/operator",
                query   : {
                  "tab_index": "0"
                }
              }}>
              プロフィール
            </Tab>
          </TabBar>
        </Shadow>
        <ViewPager
          selectedIndex={location.query["tab_index"] || 0}
          className={classNames.ViewPager}
        >
          <ProfileBody
            operateApi={operateApi}
            operator={operator}
            className={classNames.ProfileBody}
          />
          <div/>
        </ViewPager>
      </div>

      //Privacy Path
      //{location.pathname == "/operator/privacy" ? <PrivacyTab/> : <div/>}
    )
  }
};


