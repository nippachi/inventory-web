let ImageInput   = require("react-material/ui/view/form/ImageInput");
let React        = require("react");
let Widget       = require("echat-common/model/Widget");
let Dialog       = require("react-material/ui/view/Dialog");
let DialogHeader = require("react-material/ui/view/DialogHeader");
let DialogBody   = require("react-material/ui/view/DialogBody");
let DialogFooter = require("react-material/ui/view/DialogFooter");
let Button       = require("react-material/ui/view/Button");
let TextField    = require("react-material/ui/view/form/TextField");
let ViewPager    = require("react-material/ui/view/ViewPager");
let ColorPicker  = require("echat/ui/view/common/form/ColorPicker");

const classNames = require("echat/ui/view/setting/widgetSetting/WidgetDialog/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        selectedIndex: 0
      })
  }

  componentDidMount() {
  }

  render() {
    let {
          isVisible,
          onCancel,
          widget,
          operateApi,
          onCreate
        } = this.props;

    return (
      <Dialog
        visible={isVisible}
      >
        <form
          autoComplete="off"
          onSubmit={async(e) => {
            e.preventDefault();
            let form                 = e.target;
            let name                 = form.querySelector("*[name='name']").value;
            let image                = form.querySelector("*[name='image']").files;
            let mainColor            = form.querySelector("*[name='mainColor']").value;
            let titleColor           = form.querySelector("*[name='titleColor']").value;
            let subtitleColor        = form.querySelector("*[name='subtitleColor']").value;
            let descriptionColor     = form.querySelector("*[name='descriptionColor']").value;
            let userMessageColor     = form.querySelector("*[name='userMessageColor']").value;
            let operatorMessageColor = form.querySelector("*[name='operatorMessageColor']").value;
            let userBalloonColor     = form.querySelector("*[name='userBalloonColor']").value;
            let operatorBalloonColor = form.querySelector("*[name='operatorBalloonColor']").value;
            let title                = form.querySelector("*[name='title']").value;
            let subtitle             = form.querySelector("*[name='subtitle']").value;
            let description          = form.querySelector("*[name='description']").value;

            if (widget) {
              await operateApi(
                () => widget.update(
                  {
                    name,
                    image: image.length > 0 ? image : undefined,
                    mainColor,
                    titleColor,
                    subtitleColor,
                    descriptionColor,
                    userMessageColor,
                    operatorMessageColor,
                    userBalloonColor,
                    operatorBalloonColor,
                    title,
                    subtitle,
                    description
                  }));
              this.forceUpdate()
            } else {
              let widget = await operateApi(
                a => Widget.create({
                  ...a,
                  widget: {
                    name,
                    image: image.length > 0 ? image : undefined,
                    mainColor,
                    titleColor,
                    subtitleColor,
                    descriptionColor,
                    userMessageColor,
                    operatorMessageColor,
                    userBalloonColor,
                    operatorBalloonColor,
                    title,
                    subtitle,
                    description,
                    // Default at creation
                    activeFlag: true
                  }
                })
              );
              onCreate && onCreate(widget);
              this.forceUpdate()
            }
            this.setState(
              {
                selectedIndex: 0
              });
            onCancel && onCancel()

          }}
          className={classNames.DialogForm}
        >
          <ViewPager
            selectedIndex={this.state.selectedIndex}
          >
            <div>
              <DialogHeader>
                ウィジェット {widget ? "編集" : "新規追加"}
              </DialogHeader>
              <DialogBody>
                <TextField
                  name="name"
                  labelText="名称"
                  autoFocus={true}
                  defaultValue={widget && widget.name}
                  required
                />
                <ImageInput
                  className={classNames.ImageInput}
                  labelText="ウィジェット画像"
                  name="image"
                  placeholder="クリックして選択"
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
                ウィジェット {widget ? "編集" : "新規追加"}
              </DialogHeader>
              <DialogBody>
                <ColorPicker
                  name="mainColor"
                  label="メインカラー"
                  defaultColor={widget && widget.mainColor}
                />
                <ColorPicker
                  name="titleColor"
                  label="タイトルカラー"
                  defaultColor={widget && widget.titleColor}
                />
                <ColorPicker
                  name="subtitleColor"
                  label="サブタイトルカラー"
                  defaultColor={widget && widget.subtitleColor}
                />
                <ColorPicker
                  name="descriptionColor"
                  label="説明カラー"
                  defaultColor={widget && widget.descriptionColor}
                />
                <ColorPicker
                  name="userMessageColor"
                  label="ユーザーメッセージカラー"
                  defaultColor={widget && widget.userMessageColor}
                />
                <ColorPicker
                  name="operatorMessageColor"
                  label="オペレーターメッセージカラー"
                  defaultColor={widget && widget.operatorMessageColor}
                />
                <ColorPicker
                  name="userBalloonColor"
                  label="訪問者吹き出しカラー"
                  position="bottom"
                  defaultColor={widget && widget.userBalloonColor}
                />
                <ColorPicker
                  name="operatorBalloonColor"
                  label="オペレーター吹き出しカラー"
                  position="bottom"
                  defaultColor={widget && widget.operatorBalloonColor}
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
                  type="flat"
                  onClick={() => {
                    this.setState(
                      {
                        selectedIndex: 2
                      })
                  }}
                >
                  次へ
                </Button>
              </DialogFooter>
            </div>
            <div>
              <DialogHeader>
                ウィジェット {widget ? "編集" : "新規追加"}
              </DialogHeader>
              <DialogBody>
                <TextField
                  name="title"
                  labelText="タイトル"
                  defaultValue={widget && widget.title}
                />
                <TextField
                  name="subtitle"
                  labelText="サブタイトル"
                  defaultValue={widget && widget.subtitle}
                />
                <TextField
                  name="description"
                  labelText="説明文"
                  defaultValue={widget && widget.description}
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
                        selectedIndex: 1
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