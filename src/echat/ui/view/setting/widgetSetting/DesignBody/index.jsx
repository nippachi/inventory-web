let React              = require("react");
let Button             = require("react-material/ui/view/Button");
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace");
let ImageInput         = require("react-material/ui/view/form/ImageInput");
let LinearLayout       = require("react-material/ui/view/LinearLayout");
let TextField          = require("react-material/ui/view/form/TextField");
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList");
let Avatar             = require("echat/ui/view/common/Avatar");
let ColorPicker        = require("echat/ui/view/common/form/ColorPicker");
let EditDialog         = require("echat/ui/view/common/EditDialog");
let Widget             = require("echat-common/model/Widget.js");

const classNames = require("echat/ui/view/setting/widgetSetting/DesignBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        selectedIndex: undefined,
        widget       : undefined
      })
  }

  componentDidMount() {
    (async() => {
      let widgets = await this.props.operateApi(
        a => Widget.find({
          ...a,
          query: null
        })
      );

      this.setState(
        {
          widget: widgets[0]
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
        className={classNames.DesignPage}
      >
        <ExpansionPanelList
          selectedIndex={this.state.selectedIndex}
          onSelect={({index}) => this.setState({selectedIndex: index})}
        >
          <ExpansionPanel
            labelText="タイトル"
            value={this.state.widget && this.state.widget.title}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      title: e.target.querySelector("*[name='title']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <TextField
                name="title"
                autoFocus={true}
                defaultValue={this.state.widget && this.state.widget.title}
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
            labelText="サブタイトル"
            value={this.state.widget && this.state.widget.subtitle}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      subtitle: e.target.querySelector("*[name='subtitle']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <TextField
                name="subtitle"
                autoFocus={true}
                defaultValue={this.state.widget && this.state.widget.subtitle}
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
            labelText="説明"
            value={this.state.widget && this.state.widget.description}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      description: e.target.querySelector("*[name='description']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <TextField
                name="description"
                autoFocus={true}
                defaultValue={this.state.widget && this.state.widget.description}
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
            labelText="メインカラー"
            value={this.state.widget && this.state.widget.mainColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      mainColor: e.target.querySelector("*[name='mainColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="mainColor"
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
            labelText="タイトル文字色"
            value={this.state.widget && this.state.widget.titleColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      titleColor: e.target.querySelector("*[name='titleColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="titleColor"
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
            labelText="サブタイトル文字色"
            value={this.state.widget && this.state.widget.subtitleColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      subtitleColor: e.target.querySelector("*[name='subtitleColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="subtitleColor"
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
            labelText="説明文字色"
            value={this.state.widget && this.state.widget.descriptionColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      descriptionColor: e.target.querySelector("*[name='descriptionColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="descriptionColor"
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
            labelText="オペレーター吹き出し色"
            value={this.state.widget && this.state.widget.descriptionColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      operatorBalloonColor: e.target.querySelector("*[name='operatorBalloonColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="operatorBalloonColor"
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
            labelText="訪問者吹き出し色"
            value={this.state.widget && this.state.widget.userBalloonColor}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.widget.update(
                    {
                      userBalloonColor: e.target.querySelector("*[name='userBalloonColor']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
            >
              <ColorPicker
                type="view"
                name="userBalloonColor"
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
          src={this.state.widget && this.state.widget.imageFilePath}
        />
        <EditDialog
          visible={this.state.editImageDialogIsVisible}
          title="ウィジェット画像"
          onCancel={() =>
            this.setState({editImageDialogIsVisible: false})
          }
          onSubmit={async(e) => {
            e.preventDefault();
            let form  = e.target;
            let image = form.querySelector("*[name='image']").files;

            await operateApi(
              () => this.state.widget.update(
                {
                  image
                }));
            this.setState(
              {
                editImageDialogIsVisible: false
              })
          }}
        >
          <ImageInput
            className={classNames.ImageInput}
            labelText="ウィジェット画像"
            name="image"
            placeholder="クリックして選択"
          />
        </EditDialog>
      </div>
    )
  }
};
