let React           = require("react");
let ReactDOM        = require("react-dom");
let Log             = require("echat/ui/view/widget/Log");
let ChatPanel       = require("echat/ui/view/widget/ChatPanel");
let OperatorMessage = require("echat/ui/view/widget/OperatorMessage");
let VisitorMessage  = require("echat/ui/view/widget/VisitorMessage");

let classNames = require("echat/ui/view/widget/Content/classNames");

module.exports = class extends React.Component {

  componentWillMount() {
    this.setState(
      {
        messages        : [],
        viewDictionaries: false
      })
  }

  componentDidMount() {
    this.setState({messages: this.props.messages});
  }

  componentWillReceiveProps(props) {
    this.setState({messages: props.messages});
  }

  componentDidUpdate() {
      let logElement       = ReactDOM.findDOMNode(this).children[0];
      logElement.scrollTop = logElement.scrollHeight;
  }

  render() {
    let {
          accountDictionaries  = [],
          operatorDictionaries = [],
          visitor,
          messages =[],
          operateApi,
          className,
          ...props
        }                      = this.props;

    return (
      <div
        className={
          [
            className,
            classNames.Host
          ].join(" ")
        }
        {...props}
      >
        <Log>
          {this.state.messages && this.state.messages.map(
            (x) => !x.operatorId ?
              <VisitorMessage
                key={x.id}
                word={x.message}
                timestamp={x.createdDate}
                balloonColor="#DDD"
                messageColor="Black"
              /> :
              <OperatorMessage
                key={x.id}
                word={x.message}
                timestamp={x.createdDate}
                balloonColor="#DDD"
                messageColor="Black"
              />
          )}
        </Log>
        <ChatPanel
          visitor={visitor}
          operateApi={operateApi}
          sendMessage={() => {
            let logElement       = ReactDOM.findDOMNode(this).children[0];
            logElement.scrollTop = logElement.scrollHeight;
          }}
          operatorDictionaries={operatorDictionaries}
          accountDictionaries={accountDictionaries}
        />
      </div>
    )
  };
};