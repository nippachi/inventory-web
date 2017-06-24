let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableFoot/classNames");
module.exports   = (props) =>
  <thead
    {... props}
    className={classNames.TableFoot + " " + props.className}
  >
  </thead>;
