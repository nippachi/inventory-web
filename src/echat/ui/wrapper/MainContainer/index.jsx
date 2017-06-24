let React             = require("react");
let ReactDOM          = require("react-dom");
let apply             = require("echat/apply");
let Connect           = require("echat-common/model/Connect");
let Dictionary        = require("echat-common/model/Dictionary");
let Message           = require("echat-common/model/Message");
let NotificationModel = require("echat-common/model/Notification");
let Sound             = require("echat-common/model/Sound");
let Operator          = require("echat-common/model/Operator");
let Transition        = require("echat-common/model/Transition.js");
let Visitor           = require("echat-common/model/Visitor");
let Header            = require("echat/ui/view/header/Header");
let NavigationBar     = require("echat/ui/view/NavigationBar");
let ChatWidget        = require("echat/ui/view/widget/ChatWidget");
let RoomDialog        = require("echat/ui/view/widget/RoomDialog");
let Button            = require("react-material/ui/view/Button");
let Dialog            = require("react-material/ui/view/Dialog");
let DialogHeader      = require("react-material/ui/view/DialogHeader");
let DialogFooter      = require("react-material/ui/view/DialogFooter");
let MaterialIcon      = require("react-material/ui/view/MaterialIcon");
let Root              = require("react-material/ui/control/Root");
let Ripple            = require("react-material/ui/effect/Ripple");
let Shadow            = require("react-material/ui/effect/Shadow");

let classNames = require("echat/ui/wrapper/MainContainer/classNames");

let changeFavicon = ({
    isBadge = true
}) => {
    if (isBadge) {
        document.getElementById("apple-touch-favicon").href = "/img/badge-apple-touch-icon.png";
        document.getElementById("favicon-32x32").href       = "/img/badge-favicon-32x32.png";
        document.getElementById("favicon-16x16").href       = "/img/badge-favicon-16x16.png";
        document.getElementById("favicon").href             = "/img/badge-favicon.ico";
    } else {
        document.getElementById("apple-touch-favicon").href = "/img/apple-touch-icon.png";
        document.getElementById("favicon-32x32").href       = "/img/favicon-32x32.png";
        document.getElementById("favicon-16x16").href       = "/img/favicon-16x16.png";
        document.getElementById("favicon").href             = "/img/favicon.ico";
    }
};


let notification = (n) => {
    changeFavicon({isBadge:true});

    n.onclick = () => {
        window.focus();
        n.close()
    };
    setTimeout(() => n.close(), 5000)
};

document.addEventListener('visibilitychange', function(){
    if ( !document.hidden ) {
        changeFavicon({isBadge: false});
    }
}, false);

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            navigationBarIsVisible  : true,
            headerPopupIsVisible    : false,
            statusSelectBoxIsVisible: false,
            activeVisitorIds        : [],
            selectedVisitorIds      : [],
            isVisibleVisitorFAB     : true,
            isLockVisibleVisitorFAB : true,
            isInvalidationToken     : false,
            joinVisitor             : [],
            visitors                : [],
            dialogVisitorId         : undefined,
            operatorDictionaries    : [],
            accountDictionaries     : [],
            operators               : [],
            notifications           : [],
            sounds                  : [],
            selectedSound           : undefined,
            operateApi              : async f => {
                try {
                    console.log("Call Operator API");

                    return await f({
                        token     : apply(this.props.store, "token"),
                        tokenType : apply(this.props.store, "tokenType"),
                        operatorId: apply(this.props.store, "operatorId"),
                        accountId : apply(this.props.store, "accountId")
                    })
                } catch (e) {
                    let {onError} = this.props;

                    onError(e);

                    throw e
                }
            }
        })
    }

    componentDidMount() {
        (async() => {

            // Browser Notification
            if (window.Notification && Notification.permission === "default")
                Notification.requestPermission(
                    (r) => {
                        if (r === "granted") {
                            notification(new Notification("Welcome to EveryChat81!", {
                                body: "訪問者来客と新規メッセージをおしらせします。",
                                icon: "/img/everychat81-notification.png",
                            }))
                        }

                    });

            let accountId = apply(this.props.store, "accountId");

            let operatorId = apply(this.props.store, "operatorId");

            this.setState({
                joinVisitor: visitor => {
                    this.state.operateApi(async({
                        accountId,
                        operatorId,
                        token,
                        tokenType
                    }) => {
                        let {getMonitoringSocket} = this.props;

                        let monitoringSocket = await getMonitoringSocket();

                        if (this.state.selectedVisitorIds.includes(visitor.id)) {
                            monitoringSocket.emit("leave", {
                                visitor_id : visitor.id,
                                operator_id: operatorId,
                                account_id : accountId,
                                api        : {
                                    token     : token,
                                    token_type: tokenType
                                }
                            });

                            this.setState({
                                selectedVisitorIds: this.state.selectedVisitorIds.filter(x => x != visitor.id),
                                activeVisitorIds  : this.state.activeVisitorIds.filter(x => x != visitor.id),
                                dialogVisitorId   : this.state.dialogVisitorId == visitor.id ? undefined : this.state.dialogVisitorId
                            })

                        } else {
                            console.log("join " + visitor.id);
                            monitoringSocket.emit("join", {
                                visitor_id : visitor.id,
                                operator_id: operatorId,
                                account_id : accountId,
                                api        : {
                                    token     : token,
                                    token_type: tokenType
                                }
                            });

                            this.setState({
                                selectedVisitorIds: this.state.selectedVisitorIds.concat(visitor.id),
                                activeVisitorIds  : this.state.activeVisitorIds.concat(visitor.id)
                            })
                        }
                        this.setState({
                            activeVisitorIds  : this.state.activeVisitorIds.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
                            selectedVisitorIds: this.state.selectedVisitorIds.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
                        });
                    })
                }
            })
        })
        ();
    }

    componentWillReceiveProps(props) {

        if (props.notificationClient && !this.props.notificationClient) {

            let {notificationClient, getMonitoringSocket} =props;

            let accountId = apply(props.store, "accountId");

            let operatorId = apply(props.store, "operatorId");

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "#",
                async(d) => {
                    let x = JSON.parse(d.body);
                    console.log(x)
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "messages.*.operators." + accountId + ".accounts",
                async d => {
                    console.log("got message");
                    let x = JSON.parse(d.body);

                    switch (x.method) {
                        case "create": {
                            let message = await this.state.operateApi(
                                a => Message.findById({
                                    ...a,
                                    id       : x.id,
                                    visitorId: x.visitor_id
                                })
                            );

                            this.state.visitors.filter(y => y.id == x.visitor_id).map(z => {
                                z.messages.push(message);
                                if (document.hidden) {

                                    if (!message.operatorId) {
                                        notification(new Notification("新規メッセージ受信 - EveryChat81", {
                                            body : z.name + " : " + message.message,
                                            icon : "/img/everychat81-notification.png",
                                            badge: "chat"
                                        }));

                                        let sound = ReactDOM.findDOMNode(this).children[2];

                                        let isSetSound = false;
                                        this.state.notifications.map(n => {
                                            if (!z.locationHostname.indexOf(n.hostname)) {
                                                if (z.messages.length <= 1) {
                                                    this.setState({selectedSound: this.state.sounds.find(s => n.firstMessageSound == s.id)})
                                                } else {
                                                    this.setState({selectedSound: this.state.sounds.find(s => n.messageSound == s.id)})
                                                }
                                                isSetSound = true;
                                                sound.play()
                                            }
                                        });
                                        if (!isSetSound) {
                                            let defaultNotification = this.state.notifications.find(n => n.defaultFlag);
                                            if (z.messages.length <= 1) {
                                                this.setState({selectedSound: this.state.sounds.find(s => defaultNotification.firstMessageSound == s.id)})
                                            } else {
                                                this.setState({selectedSound: this.state.sounds.find(s => defaultNotification.messageSound == s.id)})
                                            }
                                            sound.play()
                                        }
                                    }

                                }
                            });
                            break
                        }
                        case "update": {
                            let message = await this.state.operateApi(
                                a => Message.findById({
                                    ...a,
                                    id       : x.id,
                                    visitorId: x.visitor_id
                                })
                            );

                            this.state.visitors.filter(y => y.id == x.visitor_id).map(y => y.messages = y.messages.map(z => z.id == x.id ? message : z))
                            break;
                        }
                        case"delete": {
                            this.state.visitors.filter(y => y.id == x.visitor_id).map(y => y.messages = y.messages.filter(z => z.id != x.id))
                        }
                    }

                    this.state.visitors.map(y => y.messages.sort((a, b) => a.id < b.id ? -1 : 1));
                    this.setState({
                        activeVisitorIds  : this.state.activeVisitorIds.sort((a, b) => a.id < b.id ? -1 : a.id > a.id ? 1 : 0),
                        selectedVisitorIds: this.state.selectedVisitorIds.sort((a, b) => a.id < b.id ? -1 : a.id > a.id ? 1 : 0)
                    });
                    this.forceUpdate();
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "operator_dictionaries." + operatorId + ".operators." + accountId + ".accounts",
                async d => {
                    console.log("got operator_dictionaries");
                    let x = JSON.parse(d.body);

                    this.setState({
                        operatorDictionaries: (
                            x.method == "create" ?
                                this.state.operatorDictionaries.concat(await this.state.operateApi(
                                    a => Dictionary.findById({
                                        ...a,
                                        id: x.id
                                    })
                                ))
                                : x.method == "delete" ? this.state.operatorDictionaries.filter(y => y.id != x.id)
                                    : x.method == "update" ? await (async() => {
                                            let operatorDictionary = await this.state.operateApi(
                                                a => Dictionary.findById({
                                                    ...a,
                                                    id: x.id
                                                })
                                            );

                                            return this.state.operatorDictionaries.map(
                                                y => y.id == operatorDictionary.id ? operatorDictionary : y
                                            )
                                        })()
                                        : this.state.operatorDictionaries
                        )
                    })
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "account_dictionaries.*.operators." + accountId + ".accounts",
                async(d) => {
                    let x = JSON.parse(d.body);

                    this.setState({
                        accountDictionaries: (
                            x.method == "create" ? this.state.accountDictionaries.concat(
                                    await this.state.operateApi(
                                        a => Dictionary.findById({
                                            ...a,
                                            id   : x.id,
                                            scope: "account"
                                        })
                                    )
                                )
                                : x.method == "delete" ? this.state.accountDictionaries.filter((y) => y.id != x.id)
                                    : x.method == "update" ? await (async() => {
                                            let accountDictionary = await this.state.operateApi(
                                                a => Dictionary.findById({
                                                    ...a,
                                                    id   : x.id,
                                                    scope: "account"
                                                })
                                            );
                                            return this.state.accountDictionaries.map(
                                                y => y.id == accountDictionary.id ? accountDictionary : y
                                            )
                                        })()
                                        : this.state.accountDictionaries
                        )
                    })
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "operators.*.operators." + accountId + ".accounts",
                async(d) => {
                    let x = JSON.parse(d.body);

                    this.setState({
                        operators: (
                            x.method == "create" ?
                                this.state.operators.concat(await this.state.operateApi(
                                    a => Operator.findById({
                                        ...a,
                                        id: x.id
                                    })
                                ))
                                : x.method == "delete" ? this.state.operators.filter(y => y.id != x.id)
                                    : x.method == "update" ? await (async() => {
                                            let operator = await this.state.operateApi(
                                                a => Operator.findById({
                                                    ...a,
                                                    id: x.id
                                                })
                                            );

                                            return this.state.operators.map(y => y.id == operator.id ? operator : y)
                                        })()
                                        : this.state.operators
                        )
                    })
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "auth." + operatorId + ".operators." + accountId + ".accounts",
                async(d) => {
                    let x = JSON.parse(d.body);

                    if (x.method == "invalidation") {
                        this.setState({
                            isInvalidationToken: true
                        });
                        notificationClient.disconnect();
                        let monitoringSocket = await getMonitoringSocket();
                        monitoringSocket.disconnect();
                    }
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "transition.*.operators." + accountId + ".accounts",
                async(d) => {
                    let x = JSON.parse(d.body);
                    switch (x.method) {
                        case "create": {
                            let transition = await this.state.operateApi(
                                a => Transition.find({
                                    ...a,
                                    visitorId: x.id
                                })
                            );
                            let connect    = await this.state.operateApi(
                                a => Connect.find({
                                    ...a,
                                    visitorId: x.id
                                })
                            );
                            this.state.visitors.filter(y => y.id == x.id).map(y => y.transition.concat(transition));
                            this.state.visitors.filter(y => y.id == x.id).map(y => y.connect.concat(connect));
                            break;
                        }
                    }
                }
            );

            notificationClient.subscribe(
                "/exchange/amq.topic/" + "visitors.*.operators." + accountId + ".accounts",
                async(d) => {
                    console.log("got visitors");
                    let x = JSON.parse(d.body);

                    switch (x.method) {
                        case "create":
                            break;
                        case "update":
                            if (this.state.visitors.every(y => y.id != x.id)) {
                                let visitor = await this.state.operateApi(
                                    a => Visitor.findById({
                                        ...a,
                                        id        : x.id,
                                        connecting: true
                                    })
                                );
                                this.setState({
                                    visitors: this.state.visitors.map((y) => (y.id == x.id) ? visitor : y)
                                });
                            }
                            break;
                        case "delete":
                            this.setState({
                                visitors: this.state.visitors.filter((y) => y.id != x.id),
                            });
                            break;
                        case "join":
                            if (!x.operator_id) {
                                let visitor = await this.state.operateApi(
                                    a => Visitor.findById({
                                        ...a,
                                        id: x.id
                                    })
                                );
                                console.log("visitor -> ", visitor);
                                this.setState({
                                    visitors: this.state.visitors.concat(visitor)
                                });
                                if (document.hidden) {

                                    notification(new Notification("訪問者 - EveryChat81", {
                                        body: "訪問者: " + visitor.name,
                                        icon: "/img/everychat81-notification.png"
                                    }));

                                    let sound      = ReactDOM.findDOMNode(this).children[2];
                                    let isSetSound = false;
                                    this.state.notifications.map(n => {
                                        if (!visitor.locationHostname.indexOf(n.hostname)) {
                                            this.setState({selectedSound: this.state.sounds.find(s => n.visitSound == s.id)})
                                            isSetSound = true;
                                            sound.play()
                                        }
                                    });

                                    if (!isSetSound) {
                                        let defaultNotification = this.state.notifications.find(n => n.defaultFlag);
                                        this.setState({selectedSound: this.state.sounds.find(s => defaultNotification.visitSound == s.id)});
                                        sound.play()
                                    }
                                }
                            }
                            break;
                        case "leave":
                            if (!x.operator_id) {
                                this.setState({
                                    visitors: this.state.visitors.filter(v => v.id != x.id)
                                });
                            }
                            break;
                    }
                    console.log(x.method, this.state.visitors);
                }
            );

            (async() => {
                this.setState({
                    accountDictionaries : await this.state.operateApi(
                        a => Dictionary.find({
                            ...a,
                            scope: "account",
                            query: null
                        })
                    ),
                    operators           : await
                        this.state.operateApi(
                            a => Operator.find({
                                ...a,
                                scope: "account",
                                query: null
                            })
                        ),
                    operatorDictionaries: await
                        this.state.operateApi(
                            a => Dictionary.find({
                                ...a,
                                scope: "operator",
                                query: null
                            })
                        ),
                    visitors            : await
                        this.state.operateApi(
                            a => Visitor.find({
                                ...a,
                                connecting: true,
                            })
                        ),
                    sounds              : await
                        this.state.operateApi(
                            a => Sound.find({
                                ...a,
                                query: null
                            })
                        ),
                    notifications       : await
                        this.state.operateApi(
                            a => NotificationModel.find({
                                ...a,
                                query: null
                            })
                        )
                })
            })()
        }
    }

    render() {
        let {
                store,
                children,
                location,
                notificationClient,
                getMonitoringSocket,
                getNotificationClient,
                onLogOut
            } = this.props;

        return (
            <div
                className={classNames.Host}
            >
                <Header
                    onNavigationButtonClick={() => this.setState({navigationBarIsVisible: !this.state.navigationBarIsVisible})}
                    operateApi={this.state.operateApi}
                    operator={this.state.operators.filter((x) => x.id == apply(this.props.store, "operatorId"))[0]}
                    onLogOut={onLogOut}
                />
                <div
                    className={classNames.Content}
                >
                    <Shadow
                        className={classNames.NavigationBar}
                        elevation={4}
                        position="right"
                    >
                        <NavigationBar
                            className={
                                this.state.navigationBarIsVisible ? classNames.ShowNavigationBar
                                    : classNames.HideNavigationBar
                            }
                            location={location}
                        />
                    </Shadow>
                    <main
                        className={classNames.Main}
                    >
                        {React.cloneElement(
                            children, {
                                operateApi          : this.state.operateApi,
                                joinVisitor         : this.state.joinVisitor,
                                visitors            : this.state.visitors,
                                selectedVisitorIds  : this.state.selectedVisitorIds,
                                operatorDictionaries: this.state.operatorDictionaries,
                                accountDictionaries : this.state.accountDictionaries,
                                operators           : this.state.operators,
                                operator            : this.state.operators.filter((x) => x.id == apply(this.props.store, "operatorId"))[0]
                            }
                        )}
                    </main>
                </div>
                <audio
                    src={this.state.selectedSound && this.state.selectedSound.soundFilePath}
                    preload="auto"
                    controls
                    className={classNames.Audio}
                />
                <Root
                    className={classNames.ChatContent}
                >
                    <div
                        className={classNames.WidgetWrapper}
                    >
                        {this.state.visitors.filter((x) => this.state.activeVisitorIds.includes(x.id)).map(
                            (x) => <ChatWidget
                                operateApi={this.state.operateApi}
                                onClose={() => this.setState({activeVisitorIds: this.state.activeVisitorIds.filter(y => y != x.id)})}
                                onExpand={() => this.setState({dialogVisitorId: x.id})}
                                visitor={x}
                                messages={x.messages}
                                className={classNames.ChatWidget}
                                accountDictionaries={this.state.accountDictionaries}
                                operatorDictionaries={this.state.operatorDictionaries}
                                key={x.id}
                            />)
                        }
                    </div>
                    <div
                        className={classNames.FABWrapper}
                        onMouseOver={() => !this.state.isLockVisibleVisitorFAB && this.setState({isVisibleVisitorFAB: true})}
                        onMouseOut={() => !this.state.isLockVisibleVisitorFAB && this.setState({isVisibleVisitorFAB: false})}
                    >
                        {this.state.visitors.filter((x) => this.state.selectedVisitorIds.includes(x.id)).map(
                            (x) => <Ripple
                                key={x.id}
                                component={Shadow}
                                onClick={() => {
                                    this.setState({
                                        activeVisitorIds: (
                                            this.state.activeVisitorIds.includes(x.id) ? this.state.activeVisitorIds.filter((y) => y != x.id)
                                                : this.state.activeVisitorIds.concat(x.id)
                                        )
                                    });
                                }}
                                elevation={6}
                                type="fab"
                                className={[
                                    classNames.FAB,
                                    classNames.RoomFAB,
                                    this.state.activeVisitorIds.includes(x.id) ? classNames.ActiveRoomFAB : classNames.DisableRoomFAB,
                                    this.state.isVisibleVisitorFAB ? classNames.ViewRoomFAB : classNames.HiddenRoomFAB
                                ].join(" ")}
                            >
                                <MaterialIcon
                                    className={classNames.FABVisitorName}
                                >
                                    {"person"}
                                </MaterialIcon>
                            </Ripple>
                        )}
                        <Ripple
                            component={Shadow}
                            elevation={6}
                            type="fab"
                            onClick={() => this.setState({isLockVisibleVisitorFAB: !this.state.isLockVisibleVisitorFAB})}
                            className={[
                                classNames.FAB,
                                classNames.MainFAB,
                            ].join(" ")}
                        >
                            <MaterialIcon
                                className={this.state.isLockVisibleVisitorFAB ? classNames.LockFABIcon : classNames.FABIcon}
                            >
                                {this.state.isLockVisibleVisitorFAB ? "forum" : "chat_bubble"}
                            </MaterialIcon>
                        </Ripple>
                    </div>
                </Root>
                <RoomDialog
                    isVisible={this.state.dialogVisitorId}
                    onCancel={() => this.setState({dialogVisitorId: undefined})}
                    visitor={this.state.dialogVisitorId && this.state.visitors.filter((x) => x.id == this.state.dialogVisitorId)[0]}
                    messages={this.state.dialogVisitorId && this.state.visitors.filter((x) => x.id == this.state.dialogVisitorId)[0].messages}
                    operateApi={this.state.operateApi}
                    operatorDictionaries={this.state.operatorDictionaries}
                    accountDictionaries={this.state.accountDictionaries}
                />
                <Dialog
                    visible={this.state.isInvalidationToken}
                >
                    <DialogHeader>
                        他のデバイスからのログインを検知しました。
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                onLogOut();
                            }}
                        >
                            ホーム画面へ
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
};
