let React            = require("react");
let Message          = require("echat/ui/view/widget/Message");
let SpeakerImage     = require("echat/ui/view/widget/SpeakerImage");
let TransmissionTime = require("echat/ui/view/widget/TransmissionTime");
let classNames       = require("echat/ui/view/widget/OperatorMessage/classNames");

module.exports = ({
  src,
  word,
  timestamp,
  balloonColor,
  messageColor,
  className,
  ...props
}) =>
  <div
    className={
      [
        className,
        classNames.Host
      ].join(" ")
    }
  >
    <TransmissionTime
      timestamp={timestamp}
    />
    <Message
      arrowPosition="right"
      word={word}
      balloonColor={balloonColor}
      messageColor={messageColor}
    />
  </div>;