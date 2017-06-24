module.exports = () => {
  // PC 1
  // Android 2
  // Iphone 3
  // Tablet 4
  // other 5
  let u      = window.navigator.userAgent.toLowerCase()
  let mobile = {
    0      : (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
    || u.indexOf("iphone") != -1
    || u.indexOf("ipod") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
    || u.indexOf("blackberry") != -1,
    iPhone : (u.indexOf("iphone") != -1),
    Android: (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
  };
  let tablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
    || u.indexOf("ipad") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
    || u.indexOf("kindle") != -1
    || u.indexOf("silk") != -1
    || u.indexOf("playbook") != -1;
  let pc     = !mobile[0] && !tablet;

  return mobile.Android ? 2 : mobile.iPhone ? 3 : tablet ? 4 : pc ? 1 : 5
};