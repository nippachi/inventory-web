let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableHead/classNames");

module.exports = (props) =>
  <thead
    {... props}
    className={classNames.TableHead + " " + props.className}
  >
  </thead>;
