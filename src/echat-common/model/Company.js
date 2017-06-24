let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Company extends Model {
  constructor({
    id,
    companyName,
    zipCode,
    address,
    phone,
    stuffPhone,
    email,
    ...props
  }) {
    super(props);

    this.id          = id;
    this.companyName = companyName;
    this.zipCode     = zipCode;
    this.address     = address;
    this.phone       = phone;
    this.stuffPhone  = stuffPhone;
    this.email       = email
  }

  static toPostData(company) {
    return ({
      "company_name": company.companyName,
      "zip_code"    : company.zipCode,
      "address"    : company.address,
      "phone"      : company.phone,
      "stuff_phone" : company.stuffPhone,
      "email"      : company.email
    })
  }

  static async find({
    accountId,
    token,
    tokenType,
    query
  }) {
    let url = config["echat_api_host"] + "/accounts/" + accountId + "/company";

    let response = await fetch(
      url,
      {
        method : "GET",
        headers: {
          "Authorization"  : tokenType + " " + token,
        }
      }
    );

    if (!response.ok)
      throw response;

    let x = await response.json();

    return (
      new Company(
        {
          api        : {
            token: token,
            tokenType: tokenType,
            url  : url
          },
          id         : x["id"],
          companyName: x["company_name"],
          zipCode    : x["zip_code"],
          address    : x["address"],
          phone      : x["phone"],
          stuffPhone : x["stuff_phone"],
          email      : x["email"]
        })
    )
  }

  static async create({
    token,
    tokenType,
    accountId,
    company
  }) {
    let url      = config["echat_api_host"] + "/accounts/" + accountId + "/company";
    let response = await fetch(
      url,
      {
        method : "POST",
        body   : JSON.stringify(this.toPostData(company)),
        headers: {
          "Authorization"  : tokenType + " " + token,
          "Content-type": "application/json"
        }
      }
    );
    if (!response.ok) {
      throw response
    }
    let x = await response.json();
    return (
      new Company(
        {
          api        : {
            token: token,
            tokenType: tokenType,
            url  : url
          },
          id         : x["id"],
          companyName: x["company_name"],
          zipCode    : x["zip_code"],
          address    : x["address"],
          phone      : x["phone"],
          stuffPhone : x["stuff_phone"],
          email      : x["email"]
        })
    )
  }
};
