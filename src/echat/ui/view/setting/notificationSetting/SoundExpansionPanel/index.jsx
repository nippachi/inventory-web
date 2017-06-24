let React          = require("react");
let Button         = require("react-material/ui/view/Button");
let ExpansionPanel = require("react-material/ui/view/ExpansionPanel");
let FlexibleSpace  = require("react-material/ui/view/FlexibleSpace");
let LinearLayout   = require("react-material/ui/view/LinearLayout");
let SoundDialog    = require("echat/ui/view/setting/notificationSetting/SoundDialog");
let SoundPanel     = require("echat/ui/view/setting/notificationSetting/SoundPanel");
let TextField      = require("react-material/ui/view/form/TextField");
let Notification   = require("echat-common/model/Notification");


module.exports = class extends React.Component {

    componentWillMount() {
        this.setState({
            dialogIsVisible     : false,
            newVisitSound       : undefined,
            newFirstMessageSound: undefined,
            newMessageSound     : undefined
        })
    }

    componentDidMount() {
    }

    render() {
        let {
                sounds = [],
                notification,
                operateApi,
                onClose,
                onUpdateNotification,
                onDeleteNotification,
                ...props
            }          = this.props;

        return (
            <ExpansionPanel
                labelText={notification.defaultFlag ? "デフォルト" : "ホスト名"}
                value={notification.defaultFlag ? "標準の通知音を設定" : notification.hostname}
                {...props}
            >
                <form
                    autoComplete="off"
                    onSubmit={async(e) => {
                        e.preventDefault();

                        let n = await operateApi(a => notification.update({
                            hostname         : !notification.defaultFlag ? e.target.querySelector("*[name='hostname']").value : "",
                            visitSound       : this.state.newVisitSound ? sounds.find(s => s.id == this.state.newVisitSound.id).id : notification.visitSound ? notification.visitSound : 1,
                            firstMessageSound: this.state.newFirstMessageSound ? sounds.find(s => s.id == this.state.newFirstMessageSound.id).id : notification.firstMessageSound ? notification.visitSound : 1,
                            messageSound     : this.state.newMessageSound ? sounds.find(s => s.id == this.state.newMessageSound.id).id : notification.messageSound ? notification.messageSound : 1,
                            activeFlag       : true,
                            accountId        : a.accountId
                        }));

                        this.setState({
                            selectedIndex: undefined
                        });
                        onUpdateNotification && onUpdateNotification(n);
                        onClose && onClose()
                    }}
                >
                    {!notification.defaultFlag && <TextField
                        name="hostname"
                        labelText="hostname"
                        autoFocus={true}
                        defaultValue={notification.hostname}
                        required
                        hintText="www.example.com"
                    />}
                    <SoundPanel
                        label="訪問者通知音"
                        soundTitle={this.state.newVisitSound ? this.state.newVisitSound.title : (sounds.find(y => y.id == notification.visitSound) || {}).title}
                        onClick={() => {
                            this.setState({
                                soundType      : "visitSound",
                                dialogIsVisible: true,
                            })
                        }}
                    />
                    <SoundPanel
                        label="初回メッセージ通知音"
                        soundTitle={this.state.newFirstMessageSound ? this.state.newFirstMessageSound.title : (sounds.find(y => y.id == notification.firstMessageSound) || {}).title}
                        onClick={() => {
                            this.setState({
                                soundType      : "firstMessageSound",
                                dialogIsVisible: true,
                            })
                        }}
                    />
                    <SoundPanel
                        label="メッセージ通知音"
                        soundTitle={this.state.newMessageSound ? this.state.newMessageSound.title : (sounds.find(y => y.id == notification.messageSound) || {}).title}
                        onClick={() => {
                            this.setState({
                                soundType      : "messageSound",
                                dialogIsVisible: true,
                            })
                        }}
                    />
                    <LinearLayout
                        orientation="horizontal"
                    >
                        <FlexibleSpace/>
                        {!notification.defaultFlag && <Button
                            onClick={() => {
                                notification.destroy();
                                onDeleteNotification && onDeleteNotification()
                                onClose && onClose()
                            }}
                        >
                            削除
                        </Button>}
                        <Button
                            component="button"
                        >
                            送信
                        </Button>
                    </LinearLayout>
                </form>
                <SoundDialog
                    visible={this.state.dialogIsVisible}
                    sounds={sounds}
                    onCancel={() =>
                        this.setState({
                            soundsDialogIsVisible: false,
                            dialogIsVisible      : false
                        })
                    }
                    onSelect={(s) => {
                        this.setState({
                            dialogIsVisible: false
                        });
                        switch (this.state.soundType) {
                            case "visitSound":
                                this.setState({
                                    newVisitSound: s
                                });
                                break;
                            case "firstMessageSound":
                                this.setState({
                                    newFirstMessageSound: s
                                });
                                break;
                            case "messageSound":
                                this.setState({
                                    newMessageSound: s
                                });
                                break;
                        }
                    }}
                />
            </ExpansionPanel>)
    }
}