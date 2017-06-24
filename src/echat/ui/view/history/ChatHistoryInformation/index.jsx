let React        = require("react");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");
let List         = require("echat/ui/view/common/list/List");
let ListItem     = require("echat/ui/view/common/list/ListItem");
let DurationTime = require("echat/ui/view/common/DurationTime");

const classNames = require("echat/ui/view/history/ChatHistoryInformation/classNames");

let toViewByTimeStamp = (time) => time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.getHours() + "時" + time.getMinutes() + "分";


module.exports = class extends React.Component {
    componentWillMount() {
    }

    componentDidUpdate() {
    }

    render() {
        let {
                operateApi,
                visitor,
                ...props
            } = this.props;

        let isDiff = false;

        if (visitor) {
            var connect     = visitor.connect.filter((x) => !x.disconnectedDate)[0];
            var lastConnect = visitor.connect[visitor.connect.length - 1];

            var timestamp;
            if (connect) {
                timestamp = connect.connectedDate;
            } else {
                timestamp = (lastConnect && lastConnect.length != 0 )&& lastConnect.disconnectedDate - lastConnect.connectedDate;
                isDiff    = true;
            }

            if (lastConnect) {
                let time      = new Date(lastConnect.connectedDate * 1000);
                var visitTime = toViewByTimeStamp(time)
            }

        }

        return (
            <div
                className={classNames.Host}
            >
                <div
                    className={classNames.Name}
                >
                    <div>
                        名前
                    </div>
                    <div>
                        {visitor && visitor.name}
                    </div>
                </div>
                <div>
                    <List
                        className={classNames.List}
                    >
                        <li
                            disabled={true}
                        >
                            <div>
                                訪問時間
                            </div>
                            <div>
                                {visitTime}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                初回訪問時間
                            </div>
                            <div>
                                {visitor && toViewByTimeStamp(new Date(visitor.createdDate * 1000))}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                滞在時間
                            </div>
                            <DurationTime
                                timestamp={timestamp && timestamp}
                                isDiff={isDiff}
                            />
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                訪問回数
                            </div>
                            <div>
                                {visitor && visitor.connect.length}回
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                ID
                            </div>
                            <div>
                                {visitor && visitor.id}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                情報
                            </div>
                            <div>
                                {visitor && visitor.information ? visitor.information : "未設定"}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                メールアドレス
                            </div>
                            <div>
                                {visitor && visitor.email ? visitor.email : "未設定"}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                電話番号
                            </div>
                            <div>
                                {visitor && visitor.phone ? visitor.phone : "未設定"}
                            </div>
                        </li>
                    </List>
                    <List
                        className={classNames.List}
                    >
                        <li
                            disabled={true}
                        >
                            <div>
                                HostName
                            </div>
                            <div>
                                {visitor && visitor.locationHostname}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                Path
                            </div>
                            <div>
                                {visitor && visitor.locationPathname}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                訪問者言語
                            </div>
                            <div>
                                {visitor && visitor.navigatorLanguage}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div>
                                Platform
                            </div>
                            <div>
                                {visitor && visitor.navigatorPlatform}
                            </div>
                        </li>
                        <li
                            disabled={true}
                        >
                            <div
                                className={classNames.UserAgent}
                            >
                                {visitor && visitor.navigatorUserAgent}
                            </div>
                        </li>
                    </List>
                </div>
            </div>
        )
    }
};