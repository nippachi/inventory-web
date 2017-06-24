let React        = require("react");
let ListItem     = require("echat/ui/view/common/list/ListItem");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");

const classNames = require("echat/ui/view/common/toolBar/ToolBarListItem/classNames");

module.exports = ({
    children,
    className,
    icon,
    ...props
}) =>
    <ListItem
        className={[
            className,
            classNames.ToolBarListItem
        ].join(" ")}
        {...props}
    >
        <MaterialIcon
            className={classNames.ToolBarIcon}
        >
            {icon}
        </MaterialIcon>
        {children}
    </ListItem>;
