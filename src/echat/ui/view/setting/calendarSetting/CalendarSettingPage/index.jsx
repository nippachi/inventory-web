let React               = require("react");
let Shadow              = require("react-material/ui/effect/Shadow");
let Tab                 = require("react-material/ui/view/Tab");
let TabBar              = require("react-material/ui/view/TabBar");
let CalendarSettingBody = require("echat/ui/view/setting/calendarSetting/CalendarSettingBody");
let PageTitle           = require("echat/ui/view/common/PageTitle");

const classNames = require("echat/ui/view/setting/calendarSetting/CalendarSettingPage/classNames");

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
                        title="営業時間設定"
                        description="各曜日単位で営業時間の設定ができます。"
                    />
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={{
                                pathname: "/setting/calendar",
                                query   : {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            アカウント情報
                        </Tab>
                    </TabBar>
                </Shadow>
                <CalendarSettingBody
                    operateApi={operateApi}
                    style={{minWidth: '100%', width: '100%'}}
                />
            </div>
        )
    }
};


