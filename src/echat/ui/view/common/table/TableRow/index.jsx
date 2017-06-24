let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableRow/classNames");

module.exports = (
  {
    className,
    ...props
  }
) =>
  <tr
    {...props}
    className={className + " " + classNames.TableRow}
  >
  </tr>;