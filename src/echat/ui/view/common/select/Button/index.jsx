let React           = require("react");
let Button          = require("react-material/ui/view/Button");
let FontAwesomeIcon = require("echat/ui/view/common/FontAwesomeIcon");
const classNames    = require("echat/ui/view/common/select/Button/classNames");

module.exports = (
  {
    icon,
    children,
    className,
    ...props
  }
) =>
  <Button
    {... props}
    icon={icon}
    type="flat"
    className={classNames.Button + " " + className}
  >
    {children}
    <FontAwesomeIcon
      icon={"\uF0D7"}
      className={classNames.FontAwesomeIcon}
    />
  </Button>;
