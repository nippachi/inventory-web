let React       = require("react");
let config      = require("ims-common/config");
let createToken = require("ims-common/api/auth/createToken");

const classNames = require("ims/ui/view/auth/LoginPage/classNames");

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
                    background
                </div>
                <div>
                    <div/>
                    <div
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
                                        apiHost : config["ims_api_host"],
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
                                <textarea
                                    name="email"
                                    labelText="メールアドレス"
                                    autoFocus={true}
                                    required
                                />
                                <textarea
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
                                    <input
                                        type={"checkbox"}
                                        className={classNames.CheckBox}
                                        selected={this.state.checkBaoxIsSelected}
                                        onClick={() => {
                                            this.setState({checkBoxIsSelected: !this.state.checkBoxIsSelected})
                                        }}
                                    />
                                    ログイン状態を維持
                                </div>
                                <input
                                    component="button"
                                    type={"submit"}
                                    value={"ログイン"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};
