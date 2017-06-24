let React = require("react")

let classNames = require("react-material/ui/view/ListItemIcon/classNames")

module.exports = ({
    className,
    component = "p",
    Component = component,
    selected,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
