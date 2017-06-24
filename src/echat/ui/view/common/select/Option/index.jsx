let React        = require("react");
let ListItem     = require("echat/ui/view/common/list/ListItem");
const classNames = require("echat/ui/view/common/select/Option/classNames");

module.exports = (
  {
    className,
    ...props
  }
) =>
  <ListItem
    className={[className, classNames.Option].join(" ")}
    {...props}
  >
  </ListItem>;