let React     = require("react");
let ReactDOM  = require("react-dom");
let Message   = require("echat-common/model/Message");
let TextField = require("echat/ui/view/widget/TextField");
let SelectBox = require("echat/ui/view/common/select/SelectBox");
let Option    = require("echat/ui/view/common/select/Option");

let classNames = require("echat/ui/view/widget/ChatPanel/classNames");

module.exports = class extends React.Component {

  componentWillMount() {
    this.setState({
        viewDictionaries: false
      })
  }

  componentDidUpdate() {
    if (this.state.viewDictionaries) {
      let dictionaries = this.props.operatorDictionaries.concat(this.props.accountDictionaries);
      (dictionaries.length != 0) && ReactDOM.findDOMNode(this).children[1].firstChild.firstChild.firstChild.focus();
    }
  }

  render() {
    let {
          visitor,
          sendMessage,
          operateApi,
          operatorDictionaries = [],
          accountDictionaries  = [],
          className,
          ...props
        }                      = this.props;

    return (
      <form
        className={
          [
            className,
            classNames.Host
          ].join(" ")
        }
      >
        <TextField
          name="chatPanel"
          labelText="メッセージ"
          autoFocus={true}
          autoComplete={false}
          placeholder="shift + Enterで送信"
          multiLine
          onKeyDown={(e) => {
            if (e.shiftKey && e.keyCode == 13 && e.target.value == "") {
              e.preventDefault();
            } else if (e.keyCode == 40 && e.target.value == "") {
              this.setState({viewDictionaries: true})
            } else if (e.shiftKey && e.keyCode == 13 && e.target.value != "") {
              e.preventDefault();
              //Pass-by-value
              let value      = Object.assign("", {message: e.target.value});
              e.target.value = "";

              (async () => {
                await operateApi(
                  a => Message.create({
                    ...a,
                    visitorId: visitor.id,
                    message  : {
                      visitorId : visitor.id,
                      operatorId: a.operatorId,
                      message   : value.message
                    }
                  })
                );
                  sendMessage && sendMessage();
              })();
            }
          }}
        />
        <SelectBox
          visible={this.state.viewDictionaries}
          className={classNames.SelectBox}
          style={{
            overflow: "auto",
            width   : "100%"
          }}
          onCancel={() => this.setState({viewDictionaries: false})}
        >
          {operatorDictionaries.map(
            (x) => (x.activeFlag ? <Option
                className={classNames.Option}
                key={"od" + x.id}
                tabIndex={x.id}
                onClick={() => {
                  ReactDOM.findDOMNode(this).firstChild.children[1].value = x.wording;
                  this.setState({viewDictionaries: false})
                }}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    ReactDOM.findDOMNode(this).firstChild.children[1].value = x.wording;
                    ReactDOM.findDOMNode(this).firstChild.children[1].focus();
                    this.setState({viewDictionaries: false});
                  }
                }}
              >
                <div
                  className={classNames.Dictionaries}
                >
                  <p
                    className={classNames.dictionaryName}
                  >
                    {x.name}
                  </p>
                  <p
                    className={classNames.dictionaryDescription}
                  >
                    :{x.description}
                  </p>
                </div>
              </Option> : undefined)
          )}
          {accountDictionaries.map(
            (x) => (x.activeFlag ? <Option
                  className={classNames.Option}
                  key={"ad" + x.id}
                  tabIndex={parseInt("100" + x.id.toFixed())}
                  onClick={() => {
                    ReactDOM.findDOMNode(this).firstChild.children[1].value = x.wording;
                    ReactDOM.findDOMNode(this).firstChild.children[1].focus();
                    this.setState({viewDictionaries: false});
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                      ReactDOM.findDOMNode(this).firstChild.children[1].value = x.wording;
                      ReactDOM.findDOMNode(this).firstChild.children[1].focus();
                      this.setState({viewDictionaries: false});
                    }
                  }}
                >
                  <div
                    className={classNames.Dictionaries}
                  >
                    <span
                      className={classNames.dictionaryName}
                    >
                      {x.name}
                    </span>
                    <span
                      className={classNames.dictionaryDescription}
                    >
                      {x.description}
                    </span>
                  </div>
                </Option> : undefined
            )
          )}
        </SelectBox>
      </form>);
  }
};