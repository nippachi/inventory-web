let React       = require("react");
let CheckBox    = require("echat/ui/view/common/CheckBox");
let Table       = require("echat/ui/view/common/table/Table");
let TableBody   = require("echat/ui/view/common/table/TableBody");
let TableHead   = require("echat/ui/view/common/table/TableHead");
let TableHeader = require("echat/ui/view/common/table/TableHeader");
let TableRow    = require("echat/ui/view/common/table/TableRow");

const classNames = require("echat/ui/view/dictionary/DictionaryList/classNames");

module.exports = (
  {
    children,
    className,
    onAllSelected,
    ...props
  }
) =>
  <div
    className={classNames.ListWrap}
  >
    <Table
      className={[className, classNames.DictionaryList].join(" ")}
    >
      <TableHead>
        <TableRow
          className={classNames.DictionaryListItem}
        >
          <TableHeader>
            <CheckBox
              selected={
                React.Children.toArray(children).length > 0
                && React.Children.toArray(children).every((x) => x.props.selected)
              }
              onClick={onAllSelected}
            />
          </TableHeader>
          <TableHeader>
            状態
          </TableHeader>
          <TableHeader>
            名称
          </TableHeader>
          <TableHeader>
            説明
          </TableHeader>
          <TableHeader>
            定型文
          </TableHeader>
          <TableHeader>
            編集
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {children}
      </TableBody>
    </Table>
  </div>;
