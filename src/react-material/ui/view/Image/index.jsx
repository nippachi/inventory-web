let React = require("react")

let classNames = require("react-material/ui/view/Image/classNames")

module.exports = ({
    className,
    height,
    src,
    width,
    ...props
}) => 
    <div
        className={[className, classNames.Host].join(" ")}
        style={{
            backgroundImage: "url(" + src + ")",
            height         : height + "px",
            width          : width + "px"
        }}
    >
        <img
            {...props}
            height={height}
            src={src}
            width={width}
        />
    </div>
