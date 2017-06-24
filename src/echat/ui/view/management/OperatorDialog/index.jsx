let ImageInput   = require("react-material/ui/view/form/ImageInput");
let React        = require("react");
let Operator     = require("echat-common/model/Operator");
let Dialog       = require("react-material/ui/view/Dialog");
let DialogHeader = require("react-material/ui/view/DialogHeader");
let DialogBody   = require("react-material/ui/view/DialogBody");
let DialogFooter = require("react-material/ui/view/DialogFooter");
let Button       = require("react-material/ui/view/Button");
let TextField    = require("react-material/ui/view/form/TextField");
let ViewPager    = require("react-material/ui/view/ViewPager");

const classNames = require("echat/ui/view/management/OperatorDialog/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: 0
        })
    }

    componentDidMount() {
    }

    render() {
        let {
                isVisible,
                onCancel,
                operator,
                operateApi
            } = this.props;

        return (
            <Dialog
                visible={isVisible}
            >
                <form
                    autoComplete="off"
                    onSubmit={async(e) => {
                        e.preventDefault();
                        let form        = e.target;
                        let name        = form.querySelector("*[name='name']").value;
                        let image       = form.querySelector("*[name='image']").files;
                        let displayName = form.querySelector("*[name='displayName']").value;
                        let email       = form.querySelector("*[name='email']").value;
                        let password    = form.querySelector("*[name='password']").value;
                        // Default at creation
                        // away
                        let operatorState = 2;
                        //admin
                        let authority     = 1;

                        if (operator) {
                            let x = await operateApi(
                                () => operator.update({
                                    name,
                                    displayName,
                                    email,
                                    image   : image.length > 0 ? image : undefined,
                                    password: password == "" ? undefined : password
                                })
                            );
                            this.forceUpdate();
                        } else {
                            let operator = await operateApi(
                                a => Operator.create(
                                    {
                                        ...a,
                                        operator: {
                                            name,
                                            displayName,
                                            email,
                                            image: image.length > 0 ? image : undefined,
                                            operatorState,
                                            authority,
                                            password
                                        }
                                    }));
                            this.forceUpdate()
                        }
                        this.setState({
                            editEmailDialogIsVisible: false,
                            selectedIndex           : 0
                        });
                        onCancel && onCancel()
                    }}
                >
                    <ViewPager
                        selectedIndex={this.state.selectedIndex}
                    >
                        <div>
                            <DialogHeader>
                                オペレーター {operator ? "編集" : "新規追加"}
                            </DialogHeader>
                            <DialogBody>
                                <ImageInput
                                    className={classNames.ImageInput}
                                    labelText="オペレーター画像"
                                    name="image"
                                    placeholder="クリックして選択"
                                />
                                <TextField
                                    name="name"
                                    labelText="名前"
                                    defaultValue={operator && operator.name}
                                    required
                                />
                                <TextField
                                    name="displayName"
                                    labelText="表示名"
                                    defaultValue={operator && operator.name}
                                    required
                                />
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    type="flat"
                                    onClick={() => {
                                        this.setState({
                                            selectedIndex: 0
                                        });
                                        onCancel && onCancel()
                                    }}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    type="flat"
                                    onClick={() => {
                                        this.setState(
                                            {
                                                selectedIndex: 0
                                            })
                                    }}
                                >
                                    前へ
                                </Button>
                                <Button
                                    type="flat"
                                    onClick={() => {
                                        this.setState(
                                            {
                                                selectedIndex: 1
                                            })
                                    }}
                                >
                                    次へ
                                </Button>
                            </DialogFooter>
                        </div>
                        <div>
                            <DialogHeader>
                                オペレーター {operator ? "編集" : "新規追加"}
                            </DialogHeader>
                            <DialogBody>
                                <TextField
                                    name="email"
                                    labelText="メールアドレス"
                                    defaultValue={operator && operator.email}
                                    type="email"
                                    required
                                />
                                <TextField
                                    name="password"
                                    labelText="パスワード"
                                    type="password"
                                    defaultValue={operator && operator.password}
                                    required={!operator}
                                />
                                <TextField
                                    name="checkPassword"
                                    labelText="パスワード(確認)"
                                    defaultValue={operator && operator.password}
                                    type="password"
                                    required={!operator}
                                    onInput={(e) => {
                                        let form               = e.target.form;
                                        let password           = form.querySelector("*[name='password']").value;
                                        let checkPassword      = form.querySelector("*[name='checkPassword']").value;
                                        let checkPasswordField = form.querySelector("*[name='checkPassword']");
                                        if (password != checkPassword) {
                                            checkPasswordField.setCustomValidity("パスワードが一致しません。");
                                        } else {
                                            checkPasswordField.setCustomValidity("");
                                        }
                                    }}
                                />
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    type="flat"
                                    onClick={() => {
                                        this.setState(
                                            {
                                                selectedIndex: 0
                                            });
                                        onCancel && onCancel()
                                    }}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    type="flat"
                                    onClick={() => {
                                        this.setState(
                                            {
                                                selectedIndex: 0
                                            })
                                    }}
                                >
                                    前へ
                                </Button>
                                <Button
                                    component="button"
                                    type="flat"
                                >
                                    登録
                                </Button>
                            </DialogFooter>
                        </div>
                    </ViewPager>
                </form>
            </Dialog>
        )
    }
};