let React            = require("react");
let OperatorList     = require("echat/ui/view/management/OperatorList");
let OperatorListItem = require("echat/ui/view/management/OperatorListItem");
let OperatorDialog   = require("echat/ui/view/management/OperatorDialog");
let ToolBar          = require("echat/ui/view/common/toolBar/ToolBar");
let ToolBarList      = require("echat/ui/view/common/toolBar/ToolBarList");
let ToolBarListItem  = require("echat/ui/view/common/toolBar/ToolBarListItem");

const classNames = require("echat/ui/view/management/OperatorBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        editDialogIsVisible  : false,
        createDialogIsVisible: false,
        editedOperator       : undefined,
        selectedOperatorIds    : []
      })
  }

  componentDidMount() {
  }

  render() {
    let {
          operateApi,
          operators,
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
              onClick={() => this.setState({createDialogIsVisible: true})}
            >
              新規追加
            </ToolBarListItem>
          </ToolBarList>
          <ToolBarList
            position="right"
          >
            <ToolBarListItem
              icon={"delete"}
              onClick={() => {
                operators.map((x) => this.state.selectedOperatorIds.includes(x.id) && (async() => await x.destroy())());
                this.setState({selectedOperatorIds: []});
              }}
            >
              削除
            </ToolBarListItem>
          </ToolBarList>
        </ToolBar>
        <OperatorList
          onAllSelected={(x) =>
            this.setState({
                selectedOperatorIds: (
                  this.state.selectedOperatorIds.length < operators.length ? operators.map((x) => x.id)
                    : []
                )
              })
          }
        >
          {operators && operators.map(
            (x) =>
              <OperatorListItem
                operator={x}
                key={x.id}
                onSelected={() =>
                  this.setState({
                      selectedOperatorIds: (
                        this.state.selectedOperatorIds.includes(x.id) ? this.state.selectedOperatorIds.filter((y) => x.id != y)
                          : this.state.selectedOperatorIds.concat(x.id)
                      )
                    })
                }
                selected={this.state.selectedOperatorIds.includes(x.id)}
                onEdited={() =>
                  this.setState({
                      editedOperator     : x,
                      editDialogIsVisible: true
                    })
                }
              />
          )}
        </OperatorList>
        <OperatorDialog
          isVisible={this.state.editDialogIsVisible}
          onCancel={() => {
            this.setState({editDialogIsVisible: false})
          }}
          operator={this.state.editedOperator}
          operateApi={operateApi}
        />
        <OperatorDialog
          isVisible={this.state.createDialogIsVisible}
          onCancel={() => {
            this.setState({createDialogIsVisible: false})
          }}
          operateApi={operateApi}
        />
      </div>
    )
  }
};

