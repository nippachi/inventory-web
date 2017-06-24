const classNames = require("echat/ui/view/common/Link/classNames");
let React        = require("react");
let {Link}       = require("react-router");

module.exports = ({
    className,
    ...props
}) =>
    <Link
        {...props}
        className={className + " " + classNames.Link}
    />;
