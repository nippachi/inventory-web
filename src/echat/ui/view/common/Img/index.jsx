const classNames = require("echat/ui/view/common/Img/classNames");
let React        = require("react");
module.exports   = ({
    icon,
    ...props
}) =>
    <img
        className={classNames.Image + " " + props.className}
        icon={icon}
        {... props}
    />;