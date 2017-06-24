let React = require("react");

module.exports = ({
    timestamp,
    className,
    unitProps,
    component = "div",
    Component = component,
    isDiff = false,
    ...props
}) => {
    let d    = new Date(timestamp * 1000);
    let diff;
    if (isDiff) {
        diff = d
    } else {
        let today = new Date();
        diff = today.getTime() - d.getTime();
    }


    let second = Math.floor(diff / 1000);
    let minute = Math.floor(diff / (1000 * 60));
    let hour   = Math.floor(diff / (1000 * 60 * 60));
    let day    = Math.floor(diff / (1000 * 60 * 60 * 24));


    let duration = day ? [day, "日間"]
        : hour ? [hour, "時間"]
            : minute ? [minute, "分間"]
                : second ? [second, "秒間"]
                    : ["", ""];

    return (<Component
        className={className}
    >
        {
            duration[0]
        }
        <span
            {...unitProps}
        >
            {duration[1]}
        </span>
    </Component>);
}