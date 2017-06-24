let React    = require("react")
let ListItem = require("react-material/ui/view/ListItem")

let classNames = require("react-material/ui/view/Tab/classNames")

module.exports = ({
    className,
    selected,
    ...props
}) =>
    <ListItem
        className={[
            className,
            classNames.Host,
            selected ? classNames.Selected
          :            undefined
        ].join(" ")}
        {...props}
    />
