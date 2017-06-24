let Avatar       = require("echat/ui/view/common/Avatar");
let CheckBox     = require("echat/ui/view/common/CheckBox");
let TableData    = require("echat/ui/view/common/table/TableData");
let TableRow     = require("echat/ui/view/common/table/TableRow");
let React        = require("react");

const classNames = require("echat/ui/view/management/OperatorListItem/classNames");

module.exports   = (
  {
    operator,
    className,
    onEnabled,
    onSelected,
    onEdited,
    selected,
    ...props
  }
) =>
  <TableRow
    className={[
      className,
      classNames.OperatorListItem
    ].join(" ")}
  >
    <TableData>
      <CheckBox
        onClick={onSelected}
        selected={selected}
      />
    </TableData>
    <TableData>
      <Avatar
        className={classNames.OperatorImage}
        src={operator.imageFilePath}
      />
    </TableData>
    <TableData>
      {operator.name}
    </TableData>
    <TableData>
      {operator.displayName}
    </TableData>
    <TableData>
      {operator.email}
    </TableData>
  </TableRow>;
