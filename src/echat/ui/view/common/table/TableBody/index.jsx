let React        = require("react");
const classNames = require("echat/ui/view/common/table/TableBody/classNames");

module.exports = (props) =>
  <tbody
    {... props}
    className={classNames.TableBody + " " + props.className}
  >
  </tbody>;
