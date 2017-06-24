let React                   = require("react");
let Shadow                  = require("react-material/ui/effect/Shadow");
let Tab                     = require("react-material/ui/view/Tab");
let TabBar                  = require("react-material/ui/view/TabBar");
let NotificationSettingBody = require("echat/ui/view/setting/notificationSetting/NotificationSettingBody");
let PageTitle               = require("echat/ui/view/common/PageTitle");

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
                className={classNames.Host}
                {...props}
            >
                <Shadow>
                    <PageTitle
                        title="通知設定"
                        description="オリジン別に通知の音を設定できます。 変更後はページを更新してください。"
                    />
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={{
                                pathname: "/setting/notification",
                                query   : {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            アカウント情報
                        </Tab>
                    </TabBar>
                </Shadow>
                <NotificationSettingBody
                    operateApi={operateApi}
                    style={{minWidth: '100%', width: '100%'}}
                />
            </div>
        )
    }
};


