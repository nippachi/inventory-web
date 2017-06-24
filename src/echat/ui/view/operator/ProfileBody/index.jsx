let React              = require("react");
let Button             = require("react-material/ui/view/Button");
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList");
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace");
let ImageInput         = require("react-material/ui/view/form/ImageInput");
let TextField          = require("react-material/ui/view/form/TextField");
let LinearLayout       = require("react-material/ui/view/LinearLayout");
let Avatar             = require("echat/ui/view/common/Avatar");
let EditDialog         = require("echat/ui/view/common/EditDialog");

const classNames = require("echat/ui/view/operator/ProfileBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        selectedIndex           : undefined,
        editImageDialogIsVisible: false
      })
  }

  render() {
    let {operateApi, operator} = this.props;
    return (
      <div className={classNames.Profile}>
        <ExpansionPanelList
          selectedIndex={this.state.selectedIndex}
          onSelect={({index}) => this.setState({selectedIndex: index})}
        >
          <ExpansionPanel
            labelText="オペレーター名"
            value={operator && operator.name}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();
                await operateApi(() => operator.update({
                  name: e.target.querySelector("*[name='name']").value
                }));
                this.setState({selectedIndex: undefined})
              }}
            >
              <TextField
                name="name"
                autoFocus={true}
                defaultValue={operator && operator.name}
                required
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
          </ExpansionPanel>
          <ExpansionPanel
            labelText="表示名"
            value={operator && operator.displayName}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();
                await operateApi(() => operator.update({
                    displayName: e.target.querySelector("*[name='displayName']").value
                  }));
                this.setState({selectedIndex: undefined})
              }}
            >
              <TextField
                name="displayName"
                autoFocus={true}
                defaultValue={operator && operator.displayName}
                required
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
          </ExpansionPanel>
          <ExpansionPanel
            labelText="メールアドレス"
            value={operator && operator.email}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(() => operator.update({
                  email: e.target.querySelector("*[name='email']").value
                }));
                this.setState({selectedIndex: undefined})
              }}
            >
              <TextField
                name="email"
                autoFocus={true}
                defaultValue={operator && operator.email}
                required
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
          </ExpansionPanel>
          <ExpansionPanel
            labelText="パスワード"
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();
                let form     = e.target;
                let password = form.querySelector("*[name='password']").value;
                try {
                  await operator.update(
                    {
                      password
                    });
                  this.setState({selectedIndex: undefined})
                } catch (e) {
                  console.log(e)
                }
              }}
              className={classNames.PasswordForm}
            >
              <TextField
                name="password"
                labelText="新しいパスワード"
                type="password"
                required
              />
              <TextField
                name="checkPassword"
                labelText="新しいパスワード(確認)"
                type="password"
                onInput={(e) => {
                  let form          = e.target.form;
                  let password      = form.querySelector("*[name='password']").value;
                  let checkPassword = form.querySelector("*[name='checkPassword']").value;

                  let checkPasswordField = form.querySelector("*[name='checkPassword']");
                  if (password != checkPassword) {
                    checkPasswordField.setCustomValidity("パスワードが一致しません。");
                  } else {
                    checkPasswordField.setCustomValidity("");
                  }
                }}
                required
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
          </ExpansionPanel>
        </ExpansionPanelList>
        <Avatar
          onClick={() =>
            this.setState({
                editImageDialogIsVisible: true
              })
          }
          editable={true}
          src={operator && operator.imageFilePath}
        />
        <EditDialog
          visible={this.state.editImageDialogIsVisible}
          title="オペレーター画像"
          onCancel={() =>
            this.setState({editImageDialogIsVisible: false})
          }
          onSubmit={async(e) => {
            e.preventDefault();
            let form  = e.target;
            let image = form.querySelector("*[name='image']").files;

            await operateApi(() => operator.update({
              image
            }));
            this.setState({
              editImageDialogIsVisible: false
            })
          }}
          className={classNames.ImageDialogForm}
        >
          <ImageInput
            className={classNames.ImageInput}
            labelText="オペレーター画像"
            name="image"
            placeholder="クリックして選択"
          />
        </EditDialog>
      </div>
    )
  }
};
