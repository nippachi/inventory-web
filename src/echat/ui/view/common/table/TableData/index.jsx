let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableData/classNames");

module.exports = (
  {
    className,
    ...props
  }
) =>
  <td
    className={className + " " + classNames.TableData}
    {... props}
  />;
