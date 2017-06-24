let React = require("react")
let Image = require("react-material/ui/view/Image")

let classNames = require("react-material/ui/view/ListItemAvatar/classNames")

module.exports = ({
    className,
    component = Image,
    Component = component,
    selected,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
