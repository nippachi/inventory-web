let React  = require("react");
let Button = require("react-material/ui/view/Button");

const classNames = require("echat/ui/view/header/HeaderButton/classNames");

module.exports = (
  {
    icon,
    className,
    ...props
  }
) =>
  <Button
    {... props}
    icon={icon}
    type="flat"
    className={classNames.HeaderButton + " " + className}
  />;
