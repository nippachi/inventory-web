let React     = require("react");
let Shadow    = require("react-material/ui/effect/Shadow");
let Tab       = require("react-material/ui/view/Tab");
let TabBar    = require("react-material/ui/view/TabBar");
let ViewPager = require("react-material/ui/view/ViewPager");
let ChatBody  = require("echat/ui/view/chat/ChatBody");
let PageTitle = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/chat/ChatPage/classNames");

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
        className={classNames.ChatPage}
        {...props}
      >
        <Shadow>
          <PageTitle
            title="チャット"
            description="訪問者とのチャットを行えます。"
          />
          <TabBar
            location={location}
          >
            <Tab
              to={{
                pathname: "/chat",
                query   : {
                  "tab_index": "0"
                }
              }}
            >
              訪問者一覧
            </Tab>
            {/*<Tab*/}
            {/*to={{*/}
            {/*pathname: "/chat",*/}
            {/*query   : {*/}
            {/*"tab_index": "1"*/}
            {/*}*/}
            {/*}}*/}
            {/*>*/}
            {/*全体設定*/}
            {/*</Tab>*/}
          </TabBar>
        </Shadow>
        <ViewPager
          selectedIndex={location.query["tab_index"] || 0}
          className={classNames.ViewPager}
        >
          <ChatBody
            operateApi={operateApi}
            scope="account"
            className={classNames.ChatBody}
            joinVisitor={joinVisitor}
            visitors={visitors}
            selectedVisitorIds={selectedVisitorIds}
          />
        </ViewPager>
      </div>
    )
  }
};
