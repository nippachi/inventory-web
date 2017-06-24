let React = require("react");

const classNames = require("echat/ui/view/common/PageTitle/classNames");

module.exports = (
  {
    title,
    description,
    className,
    children,
    ...props
  }
) =>
  <div
    className={[
      className,
      classNames.PageHeader
    ].join(" ")}
    {...props}
  >
    <h1>
      {title}
    </h1>
    <p>
      {description}
    </p>
    {children}
  </div>;