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
                operateApi,
                onClose,
                onCreateNotification,
                ...props
            }          = this.props;

        return (
            <ExpansionPanel
                labelText={"新規追加"}
                value={"新規追加"}
                style={{
                    margin: "12px 0",
                    border: "1px solid skyblue"
                }}
                {...props}
            >
                <form
                    autoComplete="off"
                    onSubmit={async(e) => {
                        e.preventDefault();

                        let notification = await operateApi(a => Notification.create({
                            ...a,
                            notification: {
                                hostname         : e.target.querySelector("*[name='hostname']").value,
                                visitSound       : this.state.newVisitSound ? sounds.find(s => s.id == this.state.newVisitSound.id).id : 1,
                                firstMessageSound: this.state.newFirstMessageSound ? sounds.find(s => s.id == this.state.newFirstMessageSound.id).id : 1,
                                messageSound     : this.state.newMessageSound ? sounds.find(s => s.id == this.state.newMessageSound.id).id : 1,
                                activeFlag       : true,
                                defaultFlag      : false,
                                accountId        : a.accountId
                            }
                        }));
                        onCreateNotification(notification);

                        this.setState({
                            selectedIndex: undefined
                        });
                        onClose && onClose();
                    }}
                >
                    <TextField
                        name="hostname"
                        labelText="hostname"
                        autoFocus={true}
                        required
                        hintText="www.example.com"
                    />
                    <SoundPanel
                        label="訪問者通知音"
                        soundTitle={this.state.newVisitSound && this.state.newVisitSound.title }
                        onClick={() => {
                            this.setState({
                                soundType      : "visitSound",
                                dialogIsVisible: true,
                            })
                        }}
                    />
                    <SoundPanel
                        label="初回メッセージ通知音"
                        soundTitle={this.state.newFirstMessageSound && this.state.newFirstMessageSound.title }
                        onClick={() => {
                            this.setState({
                                soundType      : "firstMessageSound",
                                dialogIsVisible: true,
                            })
                        }}
                    />
                    <SoundPanel
                        label="メッセージ通知音"
                        soundTitle={this.state.newMessageSound && this.state.newMessageSound.title }
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
            </ExpansionPanel>
        )
    }
};