let React  = require("react");
let classNames = require("echat/ui/view/widget/SpeakerImage/classNames");

module.exports = (
  {
    src,
    className,
    ...props
  }
) => <div
  className={
    [
      className,
      classNames.Host
    ].join(" ")
  }
>
  <span></span>
  <img
    src={src ? src : "https://2.bp.blogspot.com/-rIea5gHJLBM/WLjrFd0D2BI/AAAAAAABCSw/b8dLIk9cAn0um5oo0KZq756CxqP3PDYPACLcB/s400/keitai_mukashi.png"}
  />
</div>;