let React            = require("react");
let Message          = require("echat/ui/view/widget/Message");
let TransmissionTime = require("echat/ui/view/widget/TransmissionTime");
let classNames       = require("echat/ui/view/widget/VisitorMessage/classNames");

module.exports = ({
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
    }>
    <Message
      arrowPosition="left"
      word={word}
      balloonColor={balloonColor}
      messageColor={messageColor}
    />
    <TransmissionTime
      timestamp={timestamp}
    />
  </div>;
