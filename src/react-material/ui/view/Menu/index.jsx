let React = require("react")
let List  = require("react-material/ui/view/List")
let Popup = require("react-material/ui/view/Popup")

let classNames = require("react-material/ui/view/Menu/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <Popup
        {...props}
        className={[className, classNames.Host].join(" ")}
        component={List}
    />
