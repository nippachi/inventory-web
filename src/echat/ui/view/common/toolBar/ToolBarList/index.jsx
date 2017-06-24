let React = require("react");
let List  = require("echat/ui/view/common/list/List");

const classNames = require("echat/ui/view/common/toolBar/ToolBarList/classNames");

module.exports = (
  {
    position = "left",
    ...props
  }
) =>
  <List
    {...props}
    className={[
      classNames.ToolBarList,
      position == "left" ? classNames.Left : classNames.Right
    ].join(" ")}
  />;
