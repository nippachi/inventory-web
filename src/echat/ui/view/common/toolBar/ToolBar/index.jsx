let React  = require("react");
let Shadow = require("react-material/ui/effect/Shadow");

const classNames = require("echat/ui/view/common/toolBar/ToolBar/classNames");

module.exports = (
  {
    ...props
  }
) =>
  <Shadow
    className={classNames.ToolBar}
    {...props}
  />;
