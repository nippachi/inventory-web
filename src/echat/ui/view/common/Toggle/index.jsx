let React        = require("react");
const classNames = require("echat/ui/view/common/Toggle/classNames");

module.exports = ({
    enabled,
    ...props
}) =>
    <div
        {...props}
        className={[
            classNames.Toggle,
            enabled ? classNames.Enabled : classNames.Disabled
        ].join(" ")}
    >
        <span
            className={classNames.Slider}
        >
            <span
                className={classNames.Circle}
                style={{filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.3)"}}
            />
        </span>
    </div>;
