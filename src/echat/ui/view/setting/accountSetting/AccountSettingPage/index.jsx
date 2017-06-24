let React       = require("react");
let Shadow      = require("react-material/ui/effect/Shadow");
let Tab         = require("react-material/ui/view/Tab");
let TabBar      = require("react-material/ui/view/TabBar");
let CompanyTab  = require("echat/ui/view/setting/accountSetting/CompanySettingBody");
let PageTitle   = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/setting/accountSetting/AccountSettingPage/classNames");

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
        className={classNames.AccountPage}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="アカウント設定"
            description="アカウント情報を設定できます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/setting/account",
                query   : {
                  "tab_index": "0"
                }
              }}
            >
              アカウント情報
            </Tab>
          </TabBar>
        </Shadow>


        <CompanyTab
          operateApi={operateApi}
          style={{minWidth: '100%', width: '100%'}}
        />
      </div>
    )
  }
};


