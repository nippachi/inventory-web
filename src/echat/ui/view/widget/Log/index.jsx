let React           = require("react");

let classNames = require("echat/ui/view/widget/Log/classNames");

module.exports = (
  {
    className,
    ...props
  }
) => <div
  className={
    [
      className,
      classNames.Host
    ].join(" ")
  }
  {...props}
/>;