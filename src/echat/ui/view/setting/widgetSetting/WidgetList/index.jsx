let CheckBox    = require("echat/ui/view/common/CheckBox");
let Table       = require("echat/ui/view/common/table/Table");
let TableBody   = require("echat/ui/view/common/table/TableBody");
let TableHead   = require("echat/ui/view/common/table/TableHead");
let TableHeader = require("echat/ui/view/common/table/TableHeader");
let TableRow    = require("echat/ui/view/common/table/TableRow");
let React       = require("react");

const classNames = require("echat/ui/view/setting/widgetSetting/WidgetList/classNames");

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
      className={[className, classNames.WidgetList].join(" ")}
    >
      <TableHead>
        <TableRow
          className={classNames.WidgetListItem}
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
            画像
          </TableHeader>
          <TableHeader>
            名称
          </TableHeader>
          <TableHeader>
            ウィジェットタイトル
          </TableHeader>
          <TableHeader>
            サブタイトル
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
