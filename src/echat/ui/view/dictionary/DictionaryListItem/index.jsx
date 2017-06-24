let React      = require("react");
let EditButton = require("echat/ui/view/common/EditButton");
let CheckBox   = require("echat/ui/view/common/CheckBox");
let TableData  = require("echat/ui/view/common/table/TableData");
let TableRow   = require("echat/ui/view/common/table/TableRow");
let Toggle     = require("echat/ui/view/common/Toggle");

const classNames = require("echat/ui/view/dictionary/DictionaryListItem/classNames");

module.exports = (
  {
    dictionary,
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
      classNames.DictionaryListItem
    ].join(" ")}
  >
    <TableData>
      <CheckBox
        onClick={onSelected}
        selected={selected}
      />
    </TableData>
    <TableData>
      <Toggle
        enabled={dictionary.activeFlag}
        onClick={onEnabled}
      />
    </TableData>
    <TableData>
      {dictionary.name}
    </TableData>
    <TableData>
      {dictionary.description}
    </TableData>
    <TableData
      className={classNames.DictionaryWording}
    >
      <pre>
      {dictionary.wording}
      </pre>
    </TableData>
    <TableData>
      <EditButton
        onClick={onEdited}
      />
    </TableData>
  </TableRow>;
