let React        = require("react");
let Shadow       = require("react-material/ui/effect/Shadow");
let Tab          = require("react-material/ui/view/Tab");
let TabBar       = require("react-material/ui/view/TabBar");
let ViewPager    = require("react-material/ui/view/ViewPager");
let OperatorBody = require("echat/ui/view/management/OperatorBody");
let PageTitle    = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/management/ManagementPage/classNames");

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
        className={classNames.ManagementPage}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="管理"
            description="オペレーターの管理ができます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/management",
                query   : {
                  "tab_index": "0"
                }
              }}
            >
              オペレーター
            </Tab>
          </TabBar>
        </Shadow>
        <ViewPager
          selectedIndex={location.query["tab_index"] || 0}
          className={classNames.ViewPager}
        >
          <OperatorBody
            operateApi={operateApi}
            className={classNames.OperatorBody}
            operators={operators}
          />
          <div/>
        </ViewPager>
      </div>
    );
  }
};


