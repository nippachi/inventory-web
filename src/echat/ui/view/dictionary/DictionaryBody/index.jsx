let React              = require("react");
let DictionaryDialog   = require("echat/ui/view/dictionary/DictionaryDialog");
let DictionaryList     = require("echat/ui/view/dictionary/DictionaryList");
let DictionaryListItem = require("echat/ui/view/dictionary/DictionaryListItem");
let ToolBar            = require("echat/ui/view/common/toolBar/ToolBar");
let ToolBarList        = require("echat/ui/view/common/toolBar/ToolBarList");
let ToolBarListItem    = require("echat/ui/view/common/toolBar/ToolBarListItem");

const classNames = require("echat/ui/view/dictionary/DictionaryBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState({
      editDialogIsVisible  : false,
      createDialogIsVisible: false,
      editedDictionary     : undefined,
      selectedDictionaryIds: []
    })
  }

  render() {
    let {
          operateApi,
          scope,
          dictionaries,
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
                dictionaries.map((x) => this.state.selectedDictionaryIds.includes(x.id) && !x.activeFlag && (async() => {
                  await x.update({
                    activeFlag: true
                  });
                })())
              }}
            >
              有効化
            </ToolBarListItem>
            <ToolBarListItem
              icon={"close"}
              onClick={() => {
                dictionaries.map((x) => this.state.selectedDictionaryIds.includes(x.id) && x.activeFlag && (async() => {
                  await x.update({
                    activeFlag: false
                  });
                })())
              }}
            >
              無効化
            </ToolBarListItem>
            <ToolBarListItem
              icon={"delete"}
              onClick={() => {
                dictionaries.map((x) => this.state.selectedDictionaryIds.includes(x.id) && (async() => {
                  await x.destroy();
                })());
                this.setState({selectedDictionaryIds: []})
              }}
            >
              削除
            </ToolBarListItem>
          </ToolBarList>
        </ToolBar>
        <DictionaryList
          onAllSelected={(x) =>
            this.setState({
              selectedDictionaryIds: (
                this.state.selectedDictionaryIds.length < dictionaries.length ? dictionaries.map((x) => x.id)
                  : []
              )
            })
          }
        >
          {dictionaries && dictionaries.map(
            (x) =>
              <DictionaryListItem
                dictionary={x}
                key={x.id}
                onSelected={() =>
                  this.setState({
                    selectedDictionaryIds: (
                      this.state.selectedDictionaryIds.includes(x.id) ? this.state.selectedDictionaryIds.filter((y) => x.id != y)
                        : this.state.selectedDictionaryIds.concat(x.id)
                    )
                  })
                }
                selected={this.state.selectedDictionaryIds.includes(x.id)}
                onEdited={() =>
                  this.setState({
                    editedDictionary   : x,
                    editDialogIsVisible: true
                  })
                }
                onEnabled={async() => {
                  let activeFlag = !x.activeFlag;
                  await x.update({
                    activeFlag
                  });
                }}
              />
          )}
        </DictionaryList>
        <DictionaryDialog
          isVisible={this.state.editDialogIsVisible}
          scope={scope}
          onCancel={() => {
            this.setState({editDialogIsVisible: false})
          }}
          dictionary={this.state.editedDictionary}
          operateApi={operateApi}
        />
        <DictionaryDialog
          isVisible={this.state.createDialogIsVisible}
          scope={scope}
          onCancel={() => {
            this.setState({createDialogIsVisible: false})
          }}
          operateApi={operateApi}
        />
      </div>
    )
  }
};


