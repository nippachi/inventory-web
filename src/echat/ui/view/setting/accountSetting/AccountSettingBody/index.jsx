let React              = require("react");
let Button             = require("react-material/ui/view/Button");
let Dialog             = require("react-material/ui/view/Dialog");
let DialogHeader       = require("react-material/ui/view/DialogHeader");
let DialogBody         = require("react-material/ui/view/DialogBody");
let DialogFooter       = require("react-material/ui/view/DialogFooter");
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList");
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace");
let ImageInput         = require("react-material/ui/view/form/ImageInput");
let LinearLayout       = require("react-material/ui/view/LinearLayout");
let TextField          = require("react-material/ui/view/form/TextField");
let Account            = require("echat-common/model/Account");
let Avatar             = require("echat/ui/view/common/Avatar");

const classNames = require("echat/ui/view/setting/accountSetting/AccountSettingBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState({
      account                 : undefined,
      selectedIndex           : undefined,
      editImageDialogIsVisible: false
    })
  }

  componentDidMount() {
    (async () => {
      this.setState({
        account: await this.props.operateApi(
          a => Account.findById({
            ...a,
          })
        )
      })
    })()
  }

  render() {
    let {
          operateApi,
          ...props
        } = this.props;

    return (
      <div
        {...props}
        className={classNames.AccountPage}
      >
        <ExpansionPanelList
          selectedIndex={this.state.selectedIndex}
          onSelect={({index}) => this.setState({selectedIndex: index})}
        >
          <ExpansionPanel
            labelText="メールアドレス"
            value={this.state.account && this.state.account.email}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.account.update(
                    {
                      email: e.target.querySelector("*[name='email']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <TextField
                name="email"
                autoFocus={true}
                defaultValue={this.state.account && this.state.account.email}
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
            labelText="住所"
            value={this.state.account && this.state.account.address}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.account.update({
                    address: e.target.querySelector("*[name='address']").value
                  }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <TextField
                name="address"
                autoFocus={true}
                defaultValue={this.state.account && this.state.account.address}
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
            this.setState(
              {
                editImageDialogIsVisible: true
              })
          }
          editable={true}
          src={this.state.account && this.state.account.imageFilePath}
        />
        <Dialog
          visible={this.state.editImageDialogIsVisible}
        >
          <form
            autoComplete="off"
            onSubmit={async(e) => {
              e.preventDefault();
              let form  = e.target;
              let image = form.querySelector("*[name='image']").files;

              await operateApi(
                () => this.state.account.update(
                  {
                    image
                  }));
              this.setState(
                {
                  editImageDialogIsVisible: false
                })
            }}
          >
            <DialogHeader>
              <h2>アカウント画像 アップロード</h2>
            </DialogHeader>
            <DialogBody>
              <ImageInput
                className={classNames.ImageInput}
                labelText="アカウント画像"
                name="image"
                placeholder="クリックして選択"
              />
            </DialogBody>
            <DialogFooter>
              <Button
                type="flat"
                onClick={() => {
                  this.setState({editImageDialogIsVisible: false})
                }}
              >
                キャンセル
              </Button>
              <Button
                component="button"
                type="flat"
              >
                登録
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    )
  }
};