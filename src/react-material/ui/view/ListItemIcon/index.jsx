let React = require("react")
let Image = require("react-material/ui/view/Image")

let classNames = require("react-material/ui/view/ListItemIcon/classNames")

module.exports = ({
    className,
    component = Image,
    Component = component,
    selected,
    ...props
}) =>
    <Component
        {...props}
        className={
            [
                className,
                classNames.Host,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
    />
