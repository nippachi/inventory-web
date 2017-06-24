let React        = require("react");
let TableData    = require("echat/ui/view/common/table/TableData");
let TableRow     = require("echat/ui/view/common/table/TableRow");
let DurationTime = require("echat/ui/view/common/DurationTime");
let Ripple       = require("react-material/ui/effect/Ripple");

const classNames = require("echat/ui/view/chat/VisitorListItem/classNames");

module.exports = ({
    visitor,
    messages = [],
    className,
    selected = false,
    style,
    ...props,
}) => {
    let timeStamp      = !visitor ? undefined : visitor.connect.filter((x) => !x.disconnectedDate)[0];
    let lastTransition = !visitor ? undefined : visitor.transition.slice(-1)[0];

    return (
        <Ripple
            Component={TableRow}
            className={[
                className,
                classNames.VisitorListItem,
            ].join(" ")}
            style={{
                borderLeftColor: selected ? "#00f" : undefined,
                ...style
            }}
            {...props}
        >
            <TableData>
                {visitor && visitor.name}
            </TableData>
            <TableData>
                {visitor && visitor.information}
            </TableData>
            <DurationTime
                component={TableData}
                timestamp={timeStamp && timeStamp.connectedDate}
            >
            </DurationTime>
            <TableData>
                {lastTransition && lastTransition.url}
            </TableData>
            <TableData>
                {messages && messages.length != 0 ? messages[messages.length - 1].message : "発言なし"}
            </TableData>
            <TableData>
                {(visitor && visitor.connect) && visitor.connect.length}
            </TableData>
            <TableData>
                {messages && messages.length}
            </TableData>
        </Ripple>
    );
};
