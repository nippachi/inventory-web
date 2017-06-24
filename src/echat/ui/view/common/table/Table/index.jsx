let React        = require("react");
const classNames = require("echat/ui/view/common/table/Table/classNames");

module.exports = (props) =>
  <table
    {... props}
    className={classNames.Table + " " + props.className}
  />;
