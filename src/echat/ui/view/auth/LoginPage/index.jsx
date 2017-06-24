let React       = require("react");
let Button      = require("react-material/ui/view/Button");
let Shadow      = require("react-material/ui/effect/Shadow");
let TextField   = require("react-material/ui/view/form/TextField");
let CheckBox    = require("echat/ui/view/common/CheckBox");
let config      = require("echat-common/config");
let createToken = require("echat-common/api/auth/createToken");

const classNames = require("echat/ui/view/auth/LoginPage/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState(
            {
                checkBoxIsSelected: false,
                isSending         : false,
            })
    }

    componentDidMount() {
    }

    render() {

        let {onLogIn, onError} = this.props;

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    {/* left */}
                    <Shadow
                        elevation={18}
                        position="right"
                    />
                    {/* left top */}
                    <Shadow
                        elevation={18}
                        position="bottom"
                    />
                    {/* left bottom */}
                    <Shadow
                        elevation={18}
                        position="top"
                    >
                        {/* triangle */}
                        <Shadow
                            elevation={18}
                            position="top"
                        />
                    </Shadow>
                    {/* right */}
                    <Shadow
                        elevation={18}
                        position="left"
                    />
                </div>
                <div>
                    <div
                        className={classNames.EveryChat81Logo}
                    />
                    <Shadow
                        elevation={14}
                        className={classNames.LoginShadow}
                    >
                        <form
                            autoComplete="off"
                            className={classNames.LoginForm}
                            onSubmit={async(e) => {
                                e.preventDefault();
                                let form = e.target;

                                try {
                                    this.setState({isSending: true});
                                    let credential = await createToken({
                                        apiHost : config["echat_api_host"],
                                        email   : form.querySelector("*[name='email']").value,
                                        password: form.querySelector("*[name='password']").value
                                    });

                                    onLogIn({
                                            credential  : credential,
                                            staySignedIn: this.state.checkBoxIsSelected
                                        })
                                } catch (e) {
                                    console.log(e);

                                    onError(e);

                                    form.querySelector("*[name='password']").value = "";

                                    this.setState({
                                        isSending: false
                                    });
                                }
                            }}
                        >
                            <div>
                                <TextField
                                    name="email"
                                    labelText="メールアドレス"
                                    autoFocus={true}
                                    required
                                />
                                <TextField
                                    name="password"
                                    labelText="パスワード"
                                    type="password"
                                    required
                                />
                            </div>
                            <div>
                                <div
                                    className={classNames.LoginKeep}
                                >
                                    <CheckBox
                                        className={classNames.CheckBox}
                                        selected={this.state.checkBoxIsSelected}
                                        onClick={() => {
                                            this.setState({checkBoxIsSelected: !this.state.checkBoxIsSelected})
                                        }}
                                    />
                                    ログイン状態を維持
                                </div>
                                <Button
                                    component="button"
                                    type="flat"
                                    disabled={this.state.isSending}
                                >
                                    ログイン
                                </Button>
                            </div>
                        </form>
                    </Shadow>
                </div>
            </div>
        )
    }
};


