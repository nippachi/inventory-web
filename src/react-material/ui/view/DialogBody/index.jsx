let React = require("react")

let classNames = require("react-material/ui/view/DialogBody/classNames")

module.exports = ({
    className,
    component = "div",
    Component = component,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
