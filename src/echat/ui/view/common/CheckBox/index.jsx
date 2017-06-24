let React = require("react");

const classNames = require("echat/ui/view/common/CheckBox/classNames");

module.exports = (
  {
    className,
    selected,
    ...props
  }
) =>
  <div
    {...props}
    className={
      [
        className,
        classNames.CheckBox,
        (
          selected ? classNames.Selected
            : undefined
        )
      ].join(" ")
    }
  >
    <span
      className={classNames.CheckBackGround}
    >
      <span
        className={classNames.CheckIcon}
      />
    </span>
  </div>;

