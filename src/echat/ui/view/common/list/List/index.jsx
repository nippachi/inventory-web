let React        = require("react");
const classNames = require("echat/ui/view/common/list/List/classNames");
module.exports   = (
  {
    className,
    ...props
  }
) =>
  <ul
    {... props}
    className={classNames.List + " " + className}
  />;
