let React = require("react")

let classNames = require("react-material/ui/view/MaterialIcon/classNames")

module.exports = ({
    className,
    component = "span",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
