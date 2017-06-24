let toFormData = require("ims-common/api/encoding/toFormData");
let sha3_512 = require('js-sha3').sha3_512;

module.exports = async({
  apiHost,
  email,
  password
}) => {
    console.log(password)
  let response = await fetch(
    apiHost + "/auth/tokens", {
      method : "GET",
      headers: {
        Authorization: "Basic " + window.btoa(email + ":" + sha3_512(password))
      }
    });

  if (!response.ok)
    throw response;

  let x = await response.json();

  return {tokenType: x["token_type"], token: x["access_token"], accountId: x["account_id"], operatorId: x["operator_id"]}
};

