let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")
let match  = require("react-material/util/match")
let {Link} = require("react-router")

let classNames = require("react-material/ui/view/ListItem/classNames")

module.exports = ({
    className,
    children,
    location,
    onListItemClick,
    to,
    selected = location && match({
        location          : location,
        locationDescriptor: to
    }),
    ...props
}) =>
    <li
        {...props}
        className={
            [
                className,
                classNames.Host,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
    >
        <Ripple
            children={
                React.Children.toArray(children).map(x => 
                    typeof(x) == "string" ? x
                  : typeof(x) == "number" ? x
                  :                         React.cloneElement(
                        x,
                        {
                            selected: selected,
                        }
                    )
                )
            }
            className={classNames.Link}
            component={Link}
            onClick={onListItemClick}
            to={to}
        />
    </li>
