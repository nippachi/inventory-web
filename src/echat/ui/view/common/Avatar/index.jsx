let React        = require("react");
let Img          = require("echat/ui/view/common/Img");

const classNames = require("echat/ui/view/common/Avatar/classNames");

module.exports = (
  {
    children,
    className,
    onClick,
    editable = false,
    component = "div",
    Component = component,
    src,
    ...props
  }
) =>
  <Component
    onClick={() =>
    onClick && onClick()
    }
    className={[
      className,
      classNames.Avatar,
      editable && classNames.Editable
    ].join(" ")}
    {...props}
  >
    <Img
      src={src}
      className={classNames.Image}
    />
    {children}
    {editable &&
      <div
        className={classNames.EditText}
      >
        変更
      </div>
    }
  </Component>;
