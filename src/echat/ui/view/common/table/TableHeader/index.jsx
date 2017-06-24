let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableHeader/classNames");

module.exports = (
  {
    className,
    ...props
  }
) =>
  <th
    {... props}
    className={className + " " + classNames.TableHeader}
  />;