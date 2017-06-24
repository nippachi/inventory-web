let React = require("react");
const classNames = require("echat/ui/view/setting/notificationSetting/SoundPanel/classNames");

module.exports = ({
    label,
    soundTitle,
    onClick
}) =>
    <div
        className={classNames.Host}
        onClick={() => onClick && onClick()}
    >
        <div>
            {label}
        </div>
        <div>
            {soundTitle ? soundTitle : "通知なし"}
        </div>
    </div>;