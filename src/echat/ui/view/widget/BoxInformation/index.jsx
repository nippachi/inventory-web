let React           = require("react");
let DurationTime    = require("echat/ui/view/common/DurationTime");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");

const classNames = require("echat/ui/view/widget/BoxInformation/classNames");

module.exports = ({
    className,
    label,
    value,
    timestamp,
    icon,
    iconColor,
    unit = "",
    ...props
}) =>
    <div
        {...props}
        className={[
            className,
            classNames.Host
        ].join(" ")}
    >
        <div
            className={classNames.Content}
        >
            <MaterialIcon
                className={classNames.Icon}
                style={iconColor && {
                    color: iconColor
                }}
            >
                {icon}
            </MaterialIcon>
            {timestamp ?
                <DurationTime
                    className={classNames.Value}
                    timestamp={timestamp}
                    unitProps={{className: classNames.Unit}}
                />
                : <span
                    className={classNames.Value}
                >
                  {value}
                    <span className={classNames.Unit}>{unit}</span>
            </span>}
        </div>
        <span
            className={classNames.Label}
        >
      {label}
    </span>
    </div>;
