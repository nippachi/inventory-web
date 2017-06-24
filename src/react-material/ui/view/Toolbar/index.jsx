let React  = require("react")
let Shadow = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Toolbar/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <Shadow
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
