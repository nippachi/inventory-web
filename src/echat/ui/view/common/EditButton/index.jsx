let React           = require("react");
let IconToggle      = require("react-material/ui/view/IconToggle");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");

const classNames = require("echat/ui/view/common/EditButton/classNames");

module.exports = (
  {
    icon = "mode_edit",
    className,
    ...props
  }
) =>
  <IconToggle
    className={[className, classNames.EditButton].join(" ")}
    component={MaterialIcon}
    {...props}
  >
    {icon}
  </IconToggle>;
