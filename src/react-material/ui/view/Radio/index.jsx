let React = require("react");
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/Radio/classNames");

module.exports = ({
    enabled,
    className,
    ...props
}) =>
    <div
        {...props}
        className={[
            className,
            classNames.Host,
            enabled && classNames.Selected
        ].join(" ")}
    >
        <div/>
        <Ripple
            className={classNames.Ripple}
            fixed
        />
    </div>;
