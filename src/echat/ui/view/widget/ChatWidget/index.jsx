let React           = require("react");
let Content         = require("echat/ui/view/widget/Content");
let IconToggle      = require("react-material/ui/view/IconToggle");
let FontAwesomeIcon = require("echat/ui/view/common/FontAwesomeIcon");
let Information     = require("echat/ui/view/widget/Information");

let classNames = require("echat/ui/view/widget/ChatWidget/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        accountId   : undefined,
        visitor     : undefined,
        widget      : undefined,
        isError     : false,
        errorMessage: ""
      })
  }

  componentDidMount() {

  }

  render() {
    let {
          component = "div",
          Component = component,
          className,
          operateApi,
          onClose,
          onExpand,
          visitor,
          messages=[],
          accountDictionaries,
          operatorDictionaries,
          ...props
        }           = this.props;

    return (
      <Component
        className={
          [
            className,
            classNames.Host
          ].join(" ")
        }
        {...props}
      >
        {this.state.isError &&
        <div
          className={classNames.Error}
        >
          <div
            className={classNames.Modal}
          >
            {this.state.errorMessage}
            <button onClick={() => {
              this.setState({isError: false});
              this.componentDidMount();
            }}>
              retry
            </button>
          </div>
        </div>}
        <div
          className={classNames.TitleBar}
        >
          <p
            className={classNames.Title}
          >
            Name : {visitor && visitor.name}
          </p>
          <IconToggle
            component={FontAwesomeIcon}
            icon={"\uf065"}
            className={classNames.IconToggle}
            onClick={onExpand}
          />
          <IconToggle
            component={FontAwesomeIcon}
            icon={"\uf00d"}
            className={classNames.IconToggle}
            onClick={onClose}
          />
        </div>
        <Information
          visitor={visitor}
          messages={messages}
        />
        <Content
          visitor={visitor}
          messages={messages}
          operateApi={operateApi}
          accountDictionaries={accountDictionaries}
          operatorDictionaries={operatorDictionaries}
        />
      </Component>
    )
  }
};

