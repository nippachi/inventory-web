let React = require("react")

let classNames = require("react-material/ui/view/DialogFooter/classNames")

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
