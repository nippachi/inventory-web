let React  = require("react");
let Ripple = require("react-material/ui/effect/Ripple");

const classNames = require("echat/ui/view/common/list/ListItem/classNames");

module.exports = ({
    className,
    list,
    disabled = false,
    children,
    ...props
}) =>
    <li
        className={classNames.ListItem}
        children={!disabled && children}
    >
        {
            !disabled && <Ripple
                className={
                    [
                        className,
                        classNames.Link
                    ].join(" ")
                }
                children={children}
                {...props}
            />
        }
        {list}

    </li>;
