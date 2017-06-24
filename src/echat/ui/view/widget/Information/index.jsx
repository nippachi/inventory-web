let React       = require("react");
let Datum = require("echat/ui/view/widget/Datum")
let classNames  = require("echat/ui/view/widget/Information/classNames");

module.exports = ({
  visitor,
  messages = [],
  component = "div",
  Component = component,
  className,
  ...props
}) =>
  <Component
    className={
      [
        className,
        classNames.Host
      ].join(" ")
    }
    {...props}
  >
    <div>
      <Datum
        label="名前"
        value={visitor && visitor.name}
      />
      <Datum
        label="メールアドレス"
        value={visitor && visitor.email}
      />
    </div>
    <div>
      <Datum
        label="情報"
        value={visitor && visitor.information}
      />
      <div
        className={classNames.CountDatum}
      >
        <Datum
          label="訪問回数"
          value={(visitor && visitor.connect) && visitor.connect.length == 1 ? "初回訪問" :visitor.connect.length}
        />
        <Datum
          label="発言回数"
          value={messages && messages.length ? messages.length: "発言なし"}
        />
      </div>
    </div>
  </Component>;
