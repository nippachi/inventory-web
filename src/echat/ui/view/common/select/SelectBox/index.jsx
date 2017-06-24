let List  = require("echat/ui/view/common/list/List");
let React = require("react");
let Popup = require("react-material/ui/view/Popup");

const classNames = require("echat/ui/view/common/select/SelectBox/classNames");

module.exports = (
  {
    className,
    children,
    ...props
  }
) =>
  <Popup
    className={[classNames.Popup, className].join(" ")}
    {...props}
  >
    <List
      className={classNames.Options}
    >
      {children}
    </List>
  </Popup>;