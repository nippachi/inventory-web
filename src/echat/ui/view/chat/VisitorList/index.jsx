let React        = require("react");
let Table        = require("echat/ui/view/common/table/Table");
let TableBody    = require("echat/ui/view/common/table/TableBody");
let TableHead    = require("echat/ui/view/common/table/TableHead");
let TableHeader  = require("echat/ui/view/common/table/TableHeader");
let TableRow     = require("echat/ui/view/common/table/TableRow");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");

const classNames = require("echat/ui/view/chat/VisitorList/classNames");

module.exports = ({
    onVisitorIdColumnClick,
    onVisitorCountColumnClick,
    onMessageCountColumnClick,
    sortColumn,
    isAsc,
    children,
    className,
    ...props
}) =>
    <div
        className={classNames.ListWrap}
    >
        <Table
            className={[className, classNames.VisitorList].join(" ")}
        >
            <TableHead>
                <TableRow
                    className={classNames.VisitorListItem}
                >
                    <TableHeader
                        onClick={onVisitorIdColumnClick}
                    >
                        訪問者
                        <MaterialIcon
                            className={sortColumn == "visitorId" ? classNames.Visible : classNames.Hidden}
                        >
                            {isAsc ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                        </MaterialIcon>
                    </TableHeader>
                    <TableHeader>
                        情報
                    </TableHeader>
                    <TableHeader>
                        滞在時間
                    </TableHeader>
                    <TableHeader>
                        滞在ページ
                    </TableHeader>
                    <TableHeader>
                        最終発言
                    </TableHeader>
                    <TableHeader
                        onClick={onVisitorCountColumnClick}
                    >
                        訪問数
                        <MaterialIcon
                            className={sortColumn == "visitorCount" ? classNames.Visible : classNames.Hidden}
                        >
                            {isAsc ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                        </MaterialIcon>
                    </TableHeader>
                    <TableHeader
                        onClick={onMessageCountColumnClick}
                    >
                        発言数
                        <MaterialIcon
                            className={sortColumn == "messageCount" ? classNames.Visible : classNames.Hidden}
                        >
                            {isAsc ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                        </MaterialIcon>
                    </TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    </div>
