let config = require("echat-common/config");
let React  = require("react")
let io     = require('socket.io-client');

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            monitoringSocket: undefined,
            unmounted: false
        })
    }

    componentDidMount() {
        (async () => {
            this.setState({
                monitoringSocket: await new Promise((resolve, reject) => {
                    let monitoringSocket = io(config["echat_monitoring_host"])
                    monitoringSocket.on("connected", () => resolve(monitoringSocket))
                })
            })

            console.log("#### socket connected")

            this.state.monitoringSocket.on("join", data => {
                console.log(data)
            })

            this.state.monitoringSocket.on("disconnect", data => {
                console.log("#### socket disconnected");
            })
        })()
    }

    componentWillUnmount() {
        if (this.state.monitoringSocket)
            this.state.monitoringSocket.disconnect()

        this.setState({
            monitoringSocket: undefined,
            unmounted: true
        })
    }

    render() {
        let {
            children,
            ...props
        } = this.props

        return React.cloneElement(
            children,
            {
                getMonitoringSocket: () => new Promise(
                    (resolve, reject) => {
                        let loop = () =>
                            this.state.unmounted        ? reject("component is unmounted")
                          : this.state.monitoringSocket ? resolve(this.state.monitoringSocket)
                          :                               setTimeout(loop, 100)

                        loop()
                    }
                ),
                monitoringSocket  : this.state.monitoringSocket,
                ...props
            }
        )
    }
}
