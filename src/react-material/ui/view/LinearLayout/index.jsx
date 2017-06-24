let React = require("react")

let classNames = require("react-material/ui/view/LinearLayout/classNames")

module.exports = ({
    className,
    component = "div",
    Compoenent = component,
    orientation = "vertical",
    ...props
}) =>
    <Compoenent
        className={[
            className,
            classNames.Host,
            orientation == "vertical" ? classNames.Vertical
          :                             classNames.Horizontal
        ].join(" ")}
        {...props}
    />
