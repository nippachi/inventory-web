let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/Button/classNames")

let types = {
  fab   : {
    className: classNames.FAB
  },
  flat  : {
    className: classNames.Flat
  },
  raised: {
    className: classNames.Raised
  }
};

module.exports = (
  {
    className,
    component = "span",
    dense,
    disabled,
    type = "flat",
    ...props
  }
) =>
  <Ripple
    {...props}
    className={
      [
        component == "button" ? classNames.Button : undefined,
        className,
        classNames.Host,
        disabled ? classNames.Disabled
          : undefined,
        dense ? classNames.Dense
          : "",
        types[type].className
      ].join(" ")
    }
    component={component}
    disabled={disabled}
    fixed={type == "fab"}
  />;
