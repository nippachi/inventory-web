// Currently Unused
let React           = require("react");
let ImageInput      = require("react-material/ui/view/form/ImageInput");
let Widget          = require("echat-common/model/Widget");
let WidgetDialog    = require("echat/ui/view/setting/widgetSetting/WidgetDialog");
let WidgetList      = require("echat/ui/view/setting/widgetSetting/WidgetList");
let WidgetListItem  = require("echat/ui/view/setting/widgetSetting/WidgetListItem");
let ToolBar         = require("echat/ui/view/common/toolBar/ToolBar");
let ToolBarList     = require("echat/ui/view/common/toolBar/ToolBarList");
let ToolBarListItem = require("echat/ui/view/common/toolBar/ToolBarListItem");

const classNames = require("echat/ui/view/setting/widgetSetting/DesignListBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        widgets              : [],
        editDialogIsVisible  : false,
        createDialogIsVisible: false,
        editedWidget         : undefined,
        selectedWidgets      : [],
        selectedIndex        : 0
      })
  }

  componentDidMount() {
    (async() => {
      let widgets = await this.props.operateApi(
        a => Widget.find({
          ...a,
          scope: "account",
          query: null
        })
      );

      this.setState({
        widgets: widgets
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
      >
        <ToolBar>
          <ToolBarList
            position="left"
          >
            <ToolBarListItem
              icon={"playlist_add"}
              onClick={() =>
                this.setState({createDialogIsVisible: true})
              }
            >
              新規追加
            </ToolBarListItem>
          </ToolBarList>
          <ToolBarList
            position="right"
          >
            <ToolBarListItem
              icon={"check"}
              onClick={() => {
                this.state.selectedWidgets
                  .filter((x) => x.activeFlag == false)
                  .map(
                    async x => {
                      await x.update(
                        {
                          activeFlag: true
                        });

                      this.forceUpdate()
                    })
              }}
            >
              有効化
            </ToolBarListItem>
            <ToolBarListItem
              icon={"close"}
              onClick={() => {
                this.state.selectedWidgets
                  .filter((x) => x.activeFlag == true)
                  .map(
                    async x => {
                      await x.update(
                        {
                          activeFlag: false
                        });

                      this.forceUpdate()
                    })
              }}
            >
              無効化
            </ToolBarListItem>
            <ToolBarListItem
              icon={"delete"}
              onClick={async() => {
                for (let x of this.state.selectedWidgets) {
                  await x.destroy();
                  this.setState(
                    {
                      widgets        : this.state.widgets.filter(y => y != x),
                      selectedWidgets: this.state.selectedWidgets.filter(y => y != x)
                    })
                }
              }}
            >
              削除
            </ToolBarListItem>
          </ToolBarList>
        </ToolBar>
        <WidgetList
          onAllSelected={(x) =>
            this.setState(
              {
                selectedWidgets: (
                  this.state.selectedWidgets.length < this.state.widgets.length ? Array.from(this.state.widgets)
                    : []
                )
              })
          }
        >
          {this.state.widgets && this.state.widgets.map(
            (x) =>
              <WidgetListItem
                widget={x}
                key={x.id}
                onSelected={() =>
                  this.setState(
                    {
                      selectedWidgets: (
                        this.state.selectedWidgets.includes(x) ? this.state.selectedWidgets.filter((y) => x != y)
                          : this.state.selectedWidgets.concat(x)
                      )
                    })
                }
                selected={this.state.selectedWidgets.includes(x)}
                onEdited={() =>
                  this.setState(
                    {
                      editedWidget       : x,
                      editDialogIsVisible: true
                    })
                }
                onEnabled={async() => {
                  let activeFlag = !x.activeFlag;
                  await x.update(
                    {
                      activeFlag
                    });
                  this.forceUpdate()
                }}
              />
          )}
        </WidgetList>
        <WidgetDialog
          isVisible={this.state.editDialogIsVisible}
          onCancel={() => {
            this.setState({editDialogIsVisible: false})
          }}
          widget={this.state.editedWidget}
          operateApi={operateApi}
        />
        <WidgetDialog
          isVisible={this.state.createDialogIsVisible}
          onCancel={() => {
            this.setState({createDialogIsVisible: false})
          }}
          onCreate={(x) => {
            this.setState(
              {
                widgets: this.state.widgets.concat(x)
              })
          }}
          operateApi={operateApi}
        />
      </div>
    )
  }
};
