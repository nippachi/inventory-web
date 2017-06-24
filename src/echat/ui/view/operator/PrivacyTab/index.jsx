let Dictionary      = require("echat-common/model/Dictionary");
let FontAwesomeIcon = require("echat/ui/view/common/FontAwesomeIcon");
let EditButton      = require("echat/ui/view/common/EditButton");

let React     = require("react");
let Dialog    = require("react-material/ui/view/Dialog");
let Button    = require("react-material/ui/view/Button");
let TextField = require("react-material/ui/view/form/TextField");

const classNames = require("echat/ui/view/operator/ProfileTab/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        dictionaries               : Dictionary.instance,
        editNameDialogIsVisible    : false,
        editPasswordDialogIsVisible: false,
        currentEditContent         : undefined
      })
  }

  componentDidMount() {
    (async() => {
      try {
        await this.state.dictionaries.updateItems();
        this.forceUpdate()
      }
      catch (e) {
        console.log(e)
      }
    })()
  }

  render() {
    let editNameDialog     =
          <Dialog
            isVisible={this.state.editNameDialogIsVisible}
          >
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                let form = e.target
              }}
              className={classNames.DialogForm}
            >
              <div>
                <h2
                  className={classNames.newDictionaryTitle}
                >{this.state.currentEditContent} 編集</h2>
                <TextField
                  name="currentPassword"
                  labelText="現在のパスワード"
                  autoFocus={true}
                  defaultValue={this.state.currentEditContent}
                  required
                />
              </div>
              <div>
                <h2
                  className={classNames.newDictionaryTitle}
                >{this.state.currentEditContent} 編集</h2>
                <TextField
                  name="currentPasswordCheck"
                  labelText="現在のパスワード(確認)"
                  autoFocus={true}
                  defaultValue={this.state.currentEditContent}
                  required
                />
              </div>
              <div>
                <h2
                  className={classNames.newDictionaryTitle}
                >{this.state.currentEditContent} 編集</h2>
                <TextField
                  name="newPassword"
                  labelText="新しいパスワード"
                  autoFocus={true}
                  defaultValue={this.state.currentEditContent}
                  required
                />
              </div>
              <div>
                <Button
                  type="flat"
                  onClick={() => {
                    this.setState({editNameDialogIsVisible: false})
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
              </div>
            </form>
          </Dialog>;
    let editPasswordDialog =
          <Dialog
            isVisible={this.state.editPasswordDialogIsVisible}
          >
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                let form = e.target
              }}
              className={classNames.DialogForm}
            >
              <div>
                <h2
                  className={classNames.newDictionaryTitle}
                >パスワード 変更</h2>
                <TextField
                  name="name"
                  labelText="名称"
                  autoFocus={true}
                  defaultValue={this.state.currentEditContent}
                  required
                />
                <TextField

                />
              </div>
              <div>
                <Button
                  type="flat"
                  onClick={() => {
                    this.setState({editNameDialogIsVisible: false})
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
              </div>
            </form>
          </Dialog>;
    return (
      <div className={classNames.Privacy}>

        <div>
          <div
            className={classNames.ProfileText}
          >
            <div>メールアドレス</div>
            <div>
              <Button
                onClick={() =>
                  this.setState(
                    {
                      editNameDialogIsVisible: true,
                      currentEditContent     : "オペレーター名"
                    })
                }
              />
            </div>
          </div>
          <div
            className={classNames.ProfileText}
          >
            <div>パスワード</div>
            <Button
              type="raised"
              onClick={() =>
                this.setState(
                  {
                    editPasswordDialogIsVisible: true,
                  })
              }
            >
              パスワードの変更
            </Button>
          </div>
        </div>
        {this.state.editNameDialogIsVisible ? editNameDialog : undefined}
        {this.state.editPasswordDialogIsVisible ? editPasswordDialog : undefined}
      </div>
    )
  }
};

