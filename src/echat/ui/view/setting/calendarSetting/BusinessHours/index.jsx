let React          = require("react");
let Toggle         = require("echat/ui/view/common/Toggle");
let IntervalSlider = require("react-material/ui/view/IntervalSlider");
let TextField      = require("react-material/ui/view/form/TextField");

const classNames = require("echat/ui/view/setting/calendarSetting/BusinessHours/classNames");

module.exports = ({
    calendar,
    onUpdate,
    className,
    ...props
}) =>
    <div
        {...props}
        className={[
            className,
            classNames.Host,
        ].join(" ")}
    >
        <div
            className={classNames.DayOfTheWeek}
        >
            {
                calendar ?
                    calendar.dayOfTheWeek == 1 ? "月曜日"
                        : calendar.dayOfTheWeek == 2 ? "火曜日"
                            : calendar.dayOfTheWeek == 3 ? "水曜日"
                                : calendar.dayOfTheWeek == 4 ? "木曜日"
                                    : calendar.dayOfTheWeek == 5 ? "金曜日"
                                        : calendar.dayOfTheWeek == 6 ? "土曜日"
                                            : calendar.dayOfTheWeek == 7 ? "日曜日"
                                                : "不明"
                    : ""
            }
        </div>
        <Toggle
            enabled={
                calendar.activeFlag
            }
            onClick={() => {
                calendar.activeFlag = !calendar.activeFlag;
                onUpdate(calendar)
            }}
        />
        <div
            className={classNames.BusinessHours}
        >
            <div
                className={classNames.Time}
            >
                <TextField
                    type={"number"}
                    min={-1}
                    max={24}
                    value={ ("0" + parseInt(calendar.startTime / 3600)).slice(-2)}
                    onChange={(e) => {
                        let currentHour = calendar.startTime % 3600;
                        let hour        = e.target.value < 24 && e.target.value >= 0 ? e.target.value * 3600
                            : e.target.value.slice(-2) * 3600;
                        let time        = currentHour + hour;

                        if (calendar.endTime > time && time >= 0 && time <= 86400) {
                            calendar.startTime = time;
                            onUpdate(calendar)
                        }
                    }}
                    disabled={ !calendar.activeFlag}
                />:
                <TextField
                    type={"number"}
                    min={-1}
                    max={60}
                    value={ ("0" + parseInt(calendar.startTime % 3600 / 60)).slice(-2)}
                    onChange={(e) => {
                        let currentMinute = calendar.startTime - parseInt(calendar.startTime % 3600);
                        let minute        = e.target.value < 60 && e.target.value >= 0 ? e.target.value * 60
                            : e.target.value.slice(-2) * 60;
                        let time          = currentMinute + minute;

                        if (calendar.endTime > time && time >= 0 && time <= 86400) {
                            calendar.startTime = time;
                            onUpdate(calendar)
                        }
                    }}
                    disabled={ !calendar.activeFlag}
                />
            </div>
            <IntervalSlider
                min={0}
                max={86400}
                step={600}
                onChange={(x, y) => {
                    calendar.startTime = x;
                    calendar.endTime   = y;
                    onUpdate(calendar)

                }}
                dotIsView={false}
                defaultLow={ calendar.startTime}
                defaultHigh={ calendar.endTime}
                disabled={ !calendar.activeFlag}
                lowTitle={
                    parseInt(calendar.startTime / 3600) + ":" + ("0" + parseInt(calendar.startTime % 3600 / 60)).slice(-2)
                }
                highTitle={
                    parseInt(calendar.endTime / 3600) + ":" + ("0" + parseInt(calendar.endTime % 3600 / 60)).slice(-2)
                }
            />
            <div
                className={classNames.Time}
            >
                <TextField
                    type={"number"}
                    min={-1}
                    max={24}
                    value={ ("0" + parseInt(calendar.endTime / 3600)).slice(-2)}
                    onChange={(e) => {
                        let currentHour = calendar.endTime % 3600;
                        let hour        = e.target.value < 24 && e.target.value >= 0 ? e.target.value * 3600 : e.target.value.slice(-2) * 3600;
                        let time        = currentHour + hour;
                        if (calendar.startTime < time && time >= 0 && time <= 86400) {
                            calendar.endTime = time;
                            onUpdate(calendar)
                        }
                    }}
                    disabled={ !calendar.activeFlag}
                />:
                <TextField
                    type={"number"}
                    min={-1}
                    max={60}
                    value={ ("0" + parseInt(calendar.endTime % 3600 / 60)).slice(-2)}
                    onChange={(e) => {
                        let currentMinute = calendar.endTime - parseInt(calendar.endTime % 3600);
                        let minute        = e.target.value < 60 && e.target.value >= 0 ? e.target.value * 60 : e.target.value.slice(-2) * 60;
                        let time          = currentMinute + minute;
                        if (calendar.startTime < time && time >= 0 && time <= 86400) {
                            calendar.endTime = time;
                            onUpdate(calendar)
                        }
                    }}
                    disabled={ !calendar.activeFlag}
                />
            </div>
        </div>
    </div>