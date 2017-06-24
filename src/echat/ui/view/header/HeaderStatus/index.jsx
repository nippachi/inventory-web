let React         = require("react");
let Button        = require("echat/ui/view/header/HeaderButton");
let OperatorState = require("echat/ui/view/common/OperatorState");
let Img           = require("echat/ui/view/common/Img");

const classNames = require("echat/ui/view/header/HeaderStatus/classNames");

module.exports = ({
  operator,
  ...props
}) =>
  <Button
    className={classNames.Host}
    {...props}
  >
    <div>
      <p className={classNames.Name}>
        {operator && operator.name}
      </p>
      <OperatorState
        operatorState={operator && operator.operatorState}
        className={classNames.State}
      />
    </div>
    <div
      className={classNames.presenceStatus}
    >
      <Img
        src={operator && operator.imageFilePath}
        className={classNames.OperatorImg}
      />
      <span
        className={classNames.statusIcon + " " +
        (operator && operator.operatorState == 1 ? classNames.OnLine : classNames.OffLine)
        }
      >
        <span/>
      </span>
    </div>
  </Button>;