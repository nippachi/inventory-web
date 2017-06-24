let React           = require("react");
let Shadow          = require("react-material/ui/effect/Shadow");
let Tab             = require("react-material/ui/view/Tab");
let TabBar          = require("react-material/ui/view/TabBar");
let ViewPager       = require("react-material/ui/view/ViewPager");
let ChatHistoryBody = require("echat/ui/view/history/ChatHistoryBody");
let PageTitle       = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/history/HistoryPage/classNames");

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
                className={classNames.Host}
                {...props}
            >
                <Shadow>
                    <PageTitle
                        title="履歴"
                        description="チャット履歴の確認を行えます。"
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
                            チャット履歴
                        </Tab>
                        {/*<Tab*/}
                        {/*to={{*/}
                        {/*pathname: "/setting/account",*/}
                        {/*query   : {*/}
                        {/*"tab_index": "1"*/}
                        {/*}*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*会社情報*/}
                        {/*</Tab>*/}
                    </TabBar>
                </Shadow>


                <ChatHistoryBody
                    operateApi={operateApi}
                    style={{minWidth: '100%', width: '100%'}}
                />

                {/*<ViewPager*/}
                {/*selectedIndex={location.query["tab_index"] || 0}*/}
                {/*className={classNames.ViewPager}*/}
                {/*>*/}
                {/*<div*/}
                {/*style={{maxWidth:0,maxHeight:0}}*/}
                {/*/>*/}
                {/*<AccountPage*/}
                {/*operateApi={operateApi}*/}
                {/*style={{minWidth: '100%', width: '100%'}}*/}
                {/*/>*/}
                {/*<CompanyTab*/}
                {/*operateApi={operateApi}*/}
                {/*style={{minWidth: '100%', width: '100%'}}*/}
                {/*/>*/}
                {/*</ViewPager>*/}
            </div>
        )
    }
};


