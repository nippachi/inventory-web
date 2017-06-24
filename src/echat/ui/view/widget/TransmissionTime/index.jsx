let React = require("react");
let classNames = require("echat/ui/view/widget/TransmissionTime/classNames");

module.exports = (
  {
    timestamp,
    className,
    ...props
  }
) =>
  <p
    className={
      [
        className,
        classNames.Host
      ].join(" ")
    }
  >
    {
      (() => {
        let d     = new Date(timestamp * 1000);
        let today = new Date();

        let year  = d.getYear();
        let month = d.getMonth() + 1;
        let day   = d.getDate();
        let hour  = ( d.getHours() < 10 ) ? '0' + d.getHours() : d.getHours();
        let min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();

        let result = month + '/' + day + ' ' + hour + ':' + min;

        if (today.getYear() == d.getYear() && today.getMonth() == d.getMonth() && today.getDate() == d.getDate() ) {
          result =  hour + ':' + min;
        }
        return result;
      })()
    }
  </p>;
