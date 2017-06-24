const classNames = require("echat/ui/view/common/FontAwesomeIcon/classNames");
let React        = require("react");
module.exports   = (
  {
    icon,
    children,
    ...props
  }
) =>
  <span
    {... props}
    className={classNames.FontAwesomeIcon + " " + props.className}
  >
        {icon}
    {children}
    </span>;
