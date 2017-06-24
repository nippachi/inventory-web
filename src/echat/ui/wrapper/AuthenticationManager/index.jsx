let config      = require("echat-common/config");
let deleteToken = require("echat-common/api/auth/deleteToken");
let apply       = require("echat/apply");
let React       = require("react");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            store: undefined
        })
    }

    componentDidMount() {
        let {
                location,
                router
            } = this.props;

        let store = (
            sessionStorage.getItem("token") ? sessionStorage
                : localStorage.getItem("token") ? localStorage
                    : undefined
        );

        if (store) {
            if (location.pathname == "/login")
                router.push("/");

            this.setState({
                store: store
            })
        } else {
            if (location.pathname != "/login")
                router.push({
                    pathname: "/login",
                    state   : {
                        nextLocation: location
                    }
                })
        }
    }

    render() {
        let {
                children,
                location,
                router,
                ...props
            } = this.props;

        if (this.state.store) {
            return React.cloneElement(
                children,
                {
                    ...props,
                    onLogOut: async() => {
                        try {
                            await deleteToken({
                                apiHost  : config["echat_api_host"],
                                token    : apply(this.state.store, "token"),
                                tokenType: apply(this.state.store, "tokenType")
                            })
                        } catch (e) {
                            console.log(e)
                        }

                        this.state.store.removeItem("token");
                        this.state.store.removeItem("tokenType");
                        this.state.store.removeItem("accountId");
                        this.state.store.removeItem("operatorId");

                        this.setState({
                            store: undefined
                        });

                        router.push({
                            pathname: "/login",
                            state   : {
                                nextLocation: location
                            }
                        })
                    },
                    store   : this.state.store
                }
            )
        } else if (location.pathname == "/login") {
            return React.cloneElement(
                children,
                {
                    ...props,
                    onLogIn: async({
                        credential,
                        staySignedIn
                    }) => {
                        let store = staySignedIn ? localStorage
                            : sessionStorage;

                        try {
                            store.setItem("token", JSON.stringify(credential.token));
                            store.setItem("tokenType", JSON.stringify(credential.tokenType));
                            store.setItem("accountId", JSON.stringify(credential.accountId));
                            store.setItem("operatorId", JSON.stringify(credential.operatorId));

                            this.setState({
                                store: store
                            });

                            router.push((location.state && location.state.nextLocation ) || "/");
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            );
        } else {
            return null
        }
    }
};
