let React          = require("react");
let BoxInformation = require("echat/ui/view/widget/BoxInformation");

const classNames = require("echat/ui/view/widget/RoomInformation/classNames");

module.exports = ({
    visitor,
    messages = [],
    className,
    ...props
}) => {
    let timestamp = !visitor ? undefined : visitor.connect.filter((x) => !x.disconnectedDate)[0];

    return(<div
        {...props}
        className={[
            className,
            classNames.Host
        ].join(" ")}
    >
        <BoxInformation
            label="訪問回数"
            value={
                !visitor ? undefined
                    : visitor.connect.length == 1 ? "初回"
                        : visitor.connect.length
            }
            unit={
                !visitor ? undefined
                    : visitor.connect.length == 1 ? ""
                        : "回"
            }
            iconColor={"#6D4C41"}
            icon={"transfer_within_a_station"}
        />
        <BoxInformation
            label="発言回数"
            value={messages && messages.length}
            unit="回"
            iconColor={"#0288D1"}
            icon={"forum"}
        />
        <BoxInformation
            label="滞在時間"
            timestamp={timestamp && timestamp.connectedDate}
            iconColor={"#F57C00"}
            icon={"timer"}
        />
    </div>)
};
