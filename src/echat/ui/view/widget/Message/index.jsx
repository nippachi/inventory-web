let React      = require("react");
let classNames = require("echat/ui/view/widget/Message/classNames");

module.exports = ({
  arrowPosition = "left",
  word,
  balloonColor = "#f6f6f6",
  messageColor = "white",
  className,
  ...props
}) =>
  <div
    className={
      [
        className,
        classNames.ArrowBox,
        arrowPosition == "left" ? classNames.Left
          : classNames.Right
      ].join(" ")
    }
    style={{
      backgroundColor: balloonColor
    }}
  >
      <pre
        className={classNames.Host}
        style={{
          color: messageColor,
        }}
        {...props}
      >
        {word}
      </pre>
  </div>;