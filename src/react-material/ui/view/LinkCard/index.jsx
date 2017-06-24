let React  = require("react")
let Card   = require("react-material/ui/view/Card")
let {Link} = require("react-router")

let classNames = require("react-material/ui/view/LinkCard/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <Card
        {...props}
        className={[className, classNames.Host].join(" ")}
        component={Link}
    />
