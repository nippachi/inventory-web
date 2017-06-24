let React        = require("react");
let Button       = require("react-material/ui/view/Button");
let Dialog       = require("react-material/ui/view/Dialog");
let DialogHeader = require("react-material/ui/view/DialogHeader");
let DialogBody   = require("react-material/ui/view/DialogBody");
let DialogFooter = require("react-material/ui/view/DialogFooter");
let TextField    = require("react-material/ui/view/form/TextField");
let Dictionary   = require("echat-common/model/Dictionary");

const classNames = require("echat/ui/view/dictionary/DictionaryDialog/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    let {
          isVisible,
          onCancel,
          dictionary,
          operateApi,
          scope = "operator"
        }       = this.props;

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
            let description = form.querySelector("*[name='description']").value;
            let wording     = form.querySelector("*[name='wording']").value;

            if (dictionary) {

              await operateApi(
                () => dictionary.update(
                  {
                    name,
                    description,
                    wording
                  }));
              this.forceUpdate();
              onCancel && onCancel()

            } else {
              try {
                let dictionary = await operateApi(
                  ({token, tokenType, operatorId, accountId}) =>
                    Dictionary.create(
                      {
                        scope     : scope,
                        operatorId: operatorId,
                        accountId : accountId,
                        token     : token,
                        tokenType : tokenType,
                        dictionary: {
                          name,
                          wording,
                          description,
                          operatorId,
                          accountId,
                          // Default at creation
                          activeFlag: true
                        }
                      }));
                onCancel && onCancel()
              }
              catch (e) {
                console.log(e)
              }
            }
          }}
          className={classNames.DialogForm}
        >
          <DialogHeader>
            定型文 {dictionary ? "編集" : "新規追加"}
          </DialogHeader>
          <DialogBody>
            <TextField
              name="name"
              labelText="名称"
              autoFocus={true}
              defaultValue={dictionary && dictionary.name}
              required
            />
            <TextField
              name="description"
              labelText="説明"
              defaultValue={dictionary && dictionary.description}
              required
            />
            <TextField
              labelText="定型文"
              name="wording"
              cols="40"
              rows="4"
              required
              defaultValue={dictionary && dictionary.wording}
              multiLine
            />
          </DialogBody>
          <DialogFooter>
            <Button
              type="flat"
              onClick={() => {
                onCancel && onCancel()
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
    )
  }
};