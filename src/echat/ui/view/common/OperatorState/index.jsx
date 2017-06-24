let React = require("react");

module.exports = (
  {
    operatorState,
    ...props
  }
) =>
  <span
    {...props}
  >
    {operatorState == 1 ? "受付中" : "退席中"}
  </span>;
