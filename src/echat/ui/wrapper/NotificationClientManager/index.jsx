let config = require("echat-common/config");
let React  = require("react")
let Stomp  = require("stompjs")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            notificationClient: undefined,
            unmounted: false,
        })
    }

    componentDidMount() {
        (async () => {
            this.setState({
                notificationClient: await new Promise((resolve, reject) => {
                    let loop = () => {
                        let socket = new WebSocket(config["echat_rabbitmq_host"] + "/ws");

                        let client   = Stomp.over(socket);
//                        client.debug = console.log;
                        client.connect(
                            "root",
                            "password",
                            () => resolve(client),
                            () => {
                                if(this.state.notificationClient)
                                    this.setState({notificationClient: undefined}),
                                    setTimeout(() => this.componentDidMount(), 3000)
                                else
                                    setTimeout(loop, 3000);
                            },
                            "/"
                        );
                    };
                    loop()
                })
            })
        })()
    }

    componentWillUnmount() {
        if (this.state.notificationClient)
            this.state.notificationClient.disconnect();

        this.setState({
            notificationClient: undefined,
            unmounted: true
        })
    }

    render() {
        let {
            children,
            ...props
        } = this.props;

        return React.cloneElement(
            children,
            {
                getNotificationClient: () => new Promise(
                    (resolve, reject) => {
                        let loop = () =>
                            this.state.unmounted          ? reject("component is unmounted")
                          : this.state.notificationClient ? resolve(this.state.notificationClient)
                          :                                 setTimeout(loop, 100)

                        loop()
                    }
                ),
                notificationClient  : this.state.notificationClient,
                ...props
            }
        )
    }
}
