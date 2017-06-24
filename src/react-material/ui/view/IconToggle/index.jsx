let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/IconToggle/classNames")

module.exports = ({
    className,
    component = "span",
    ...props
}) =>
    <Ripple
        {...props}
        className={
            [
                className,
                classNames.Host,
            ].join(" ")
        }
        component={component}
        fixed
    />
