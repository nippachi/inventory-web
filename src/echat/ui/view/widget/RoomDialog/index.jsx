let React             = require("react");
let Dialog            = require("react-material/ui/view/Dialog");
let IconToggle        = require("react-material/ui/view/IconToggle");
let DialogInformation = require("echat/ui/view/widget/DialogInformation");
let FontAwesomeIcon   = require("echat/ui/view/common/FontAwesomeIcon");
let Shadow            = require("react-material/ui/effect/Shadow");
let Content           = require("echat/ui/view/widget/Content");

const classNames = require("echat/ui/view/widget/RoomDialog/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    let {
          operatorDictionaries,
          accountDictionaries,
          visitor,
          messages=[],
          isVisible,
          onCancel,
          operateApi,
          ...props
        }       = this.props;

    return (
      <Dialog
        visible={isVisible}
        className={classNames.Host}
        {...props}
      >
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
            icon={"\uf00d"}
            className={classNames.IconToggle}
            onClick={onCancel}
          />
        </div>
        <div
          className={classNames.WidgetBody}
        >
          <Content
            visitor={visitor}
            messages={messages}
            operateApi={operateApi}
            className={classNames.Content}
            operatorDictionaries={operatorDictionaries}
            accountDictionaries={accountDictionaries}
          />
          <Shadow
            elevation={2}
            position="left"
            className={classNames.Information}
          >
            <DialogInformation
              className={classNames.DialogInformation}
              operateApi={operateApi}
              visitor={visitor}
              messages={messages}
            />
          </Shadow>
        </div>
      </Dialog>
    )
  }
};