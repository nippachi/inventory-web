let React                  = require("react");
let Button                 = require("react-material/ui/view/Button");
let ExpansionPanel         = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList     = require("react-material/ui/view/ExpansionPanelList");
let FlexibleSpace          = require("react-material/ui/view/FlexibleSpace");
let LinearLayout           = require("react-material/ui/view/LinearLayout");
let TextField              = require("react-material/ui/view/form/TextField");
let SoundPanel             = require("echat/ui/view/setting/notificationSetting/SoundPanel");
let Notification           = require("echat-common/model/Notification");
let Sound                  = require("echat-common/model/Sound");
let NewSoundExpansionPanel = require("echat/ui/view/setting/notificationSetting/NewSoundExpansionPanel");
let SoundExpansionPanel    = require("echat/ui/view/setting/notificationSetting/SoundExpansionPanel");

const classNames = require("echat/ui/view/setting/notificationSetting/NotificationSettingBody/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            notifications                   : [],
            sounds                          : [],
            selectedIndex                   : undefined,
            visitSoundDialogIsVisible       : false,
            firstMessageSoundDialogIsVisible: false,
            messageSoundDialogIsVisible     : false,
            visitSound                      : undefined,
            firstMessageSound               : undefined,
            messageSound                    : undefined
        })
    }

    componentDidMount() {
        (async() => {
            let notification = await this.props.operateApi(
                a => Notification.find({
                    ...a,
                }));
            console.log(notification);
            notification.sort((a, b) => a.defaultFlag ? 0 : 1);

            this.setState({
                notifications: notification,
                sounds       : await this.props.operateApi(
                    a => Sound.find({
                        ...a,
                    })
                )
            })
        })()

    }

    render() {
        console.log(this.state.notifications);
        let {
                operateApi,
                ...props
            } = this.props;

        return (
            <div
                {...props}
                className={classNames.Host}
            >
                <div>
                    <ExpansionPanelList
                        className={classNames.NotificationList}
                        selectedIndex={this.state.selectedIndex}
                        onSelect={({index}) => this.setState({selectedIndex: index})}
                    >
                        {this.state.notifications.map(x =>
                            <SoundExpansionPanel
                                sounds={this.state.sounds}
                                notification={x}
                                key={x.id}
                                operateApi={operateApi}
                                onClose={() => this.setState({selectedIndex: undefined})}
                                onUpdateNotification={(n) => {
                                    this.setState({notifications: this.state.notifications.map(y => y.id == n.id ? n : y)})
                                }}
                                onDeleteNotification={() => {
                                this.setState({notifications: this.state.notifications.filter(y => y != x)})
                            }   }
                            />
                        )}
                        <NewSoundExpansionPanel
                            sounds={this.state.sounds}
                            operateApi={operateApi}
                            onCreateNotification={(n) => {
                                this.setState({notifications : this.state.notifications.concat(n)})
                            }}
                        />
                    </ExpansionPanelList>
                </div>

            </div>
        )
    }
};