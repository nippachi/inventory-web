let CheckBox    = require("echat/ui/view/common/CheckBox");
let Table       = require("echat/ui/view/common/table/Table");
let TableBody   = require("echat/ui/view/common/table/TableBody");
let TableHead   = require("echat/ui/view/common/table/TableHead");
let TableHeader = require("echat/ui/view/common/table/TableHeader");
let TableRow    = require("echat/ui/view/common/table/TableRow");
let React       = require("react");

const classNames = require("echat/ui/view/management/OperatorList/classNames");

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
      className={[className, classNames.OperatorList].join(" ")}
    >
      <TableHead>
        <TableRow
          className={classNames.OperatorListItem}
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
          <TableHeader
            style={{
              textAlign: "center"
            }}
          >
            画像
          </TableHeader>
          <TableHeader>
            名前
          </TableHeader>
          <TableHeader>
            表示名
          </TableHeader>
          <TableHeader>
            メールアドレス
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {children}
      </TableBody>
    </Table>
  </div>;

