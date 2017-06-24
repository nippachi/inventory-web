let React = require("react")

let classNames = require("react-material/ui/view/ToolbarTitle/classNames")

module.exports = ({
    className,
    component = "div",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
