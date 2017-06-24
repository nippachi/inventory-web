let Shadow     = require("react-material/ui/effect/Shadow")
let classNames = require("react-material/ui/view/Card/classNames")
let React      = require("react")

module.exports = ({
    className,
    component = "div",
    ...props
}) =>
    <Shadow
        {...props}
        className={[className, classNames.Host].join(" ")}
        component={component}
        elevation={2}
    />
