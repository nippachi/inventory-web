let Avatar       = require("echat/ui/view/common/Avatar");
let CheckBox        = require("echat/ui/view/common/CheckBox");
let Toggle          = require("echat/ui/view/common/Toggle");
let TableData       = require("echat/ui/view/common/table/TableData");
let TableRow        = require("echat/ui/view/common/table/TableRow");
let React           = require("react");
let EditButton      = require("echat/ui/view/common/EditButton");

const classNames = require("echat/ui/view/setting/widgetSetting/WidgetListItem/classNames");

module.exports = (
  {
    widget,
    className,
    onEnabled,
    onSelected,
    onEdited,
    selected,
    ...props
  }
) =>
  <TableRow
    className={[className, classNames.WidgetListItem].join(" ")}
  >
    <TableData>
      <CheckBox
        onClick={onSelected}
        selected={selected}
      />
    </TableData>
    <TableData>
      <Toggle
        enabled={widget.activeFlag}
        onClick={onEnabled}
      />
    </TableData>
    <TableData>
      <Avatar
        className={classNames.WidgetImg}
        src={widget.imageFilePath}
      />
    </TableData>
    <TableData>
      {widget.name}
    </TableData>
    <TableData>
      {widget.title}
    </TableData>
    <TableData>
      {widget.subtitle}
    </TableData>
    <TableData>
      <EditButton
        onClick={onEdited}
      />
    </TableData>
  </TableRow>;
