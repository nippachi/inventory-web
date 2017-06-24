let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");
let sha3_512   = require('js-sha3').sha3_512;

module.exports = class Operator extends Model {

  constructor({
    id,
    accountId,
    authority,
    operatorState,
    email,
    name,
    password,
    displayName,
    imageFilePath,
    ...props
  }) {
    super(props);

    this.id            = id;
    this.accountId     = accountId;
    this.authority     = authority;
    this.operatorState = operatorState;
    this.email         = email;
    this.name          = name;
    this.password      = password;
    this.displayName   = displayName;
    this.imageFilePath = imageFilePath;
  }

  static toPostData(operator) {
    return ({
      "accountId"     : operator.accountId,
      "authority"     : operator.authority,
      "operator_state": operator.operatorState,
      "email"         : operator.email,
      "name"          : operator.name,
      "password"      : operator.password ? sha3_512(operator.password) : undefined,
      "display_name"  : operator.displayName,
    })
  }


  async update({image, ...x}) {

    if (Array.from(Object.keys(x)).length > 0) {
      let response = await fetch(
        this.api.url,
        {
          method : "PUT",
          body   : JSON.stringify(this.constructor.toPostData(x)),
          headers: {
            "Authorization": this.api.tokenType + " " + this.api.token,
            "Content-type" : "application/json"
          }
        }
      );

      if (!response.ok) {
        throw response;
      }

      Object.assign(this, x);
    }

    if (image) {
      let response = await fetch(
        this.api.url + "/image", {
          method : "POST",
          body   : toFormData({"upfile": image}),
          headers: {
            "Authorization": this.api.tokenType + " " + this.api.token,
          }
        }
      );

      if (!response.ok) {
        throw response;
      }
      Object.assign(this, await response.json());
    }
  }

  static async find({
    token,
    tokenType,
    scope = "account",
    groupId,
    accountId,
    page,
    perPage,
    query
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/operators")
        : scope == "group" ? (config["echat_api_host"] + "/accounts/" + accountId + "/groups/" + groupId + "/operators")
          : (config["echat_api_host"] + "/accounts/" + accountId + "/operators")
    );

    let response = await fetch(
      url + "?" + toURIQuery(
        {
          "page"   : page,
          "perPage": perPage
        }),
      {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token,
        }
      }
    );

    if (!response.ok)
      throw response;

    let operators = await response.json();

    return operators.map((x) =>
        new Operator({
            api            : {
              token    : token,
              tokenType: tokenType,
              url      : url + "/" + x["id"]
            },
            "id"           : x["id"],
            "accountId"    : x["account_id"],
            "authority"    : x["authority"],
            "operatorState": x["operator_state"],
            "email"        : x["email"],
            "name"         : x["name"],
            "displayName"  : x["display_name"],
            "imageFilePath": x["image_file_path"]
          }
        )
    )
  }


  static async findById({
    token,
    tokenType,
    scope = "account",
    groupId,
    accountId,
    id
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/operators")
        : scope == "group" ? (config["echat_api_host"] + "/accounts/" + accountId + "/groups/" + groupId + "/operators")
          : (config["echat_api_host"] + "/accounts/" + accountId + "/operators")
    );

    let response = await fetch(
      url + "/" + id,
      {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token,
        }
      }
    );

    if (!response.ok)
      throw response;

    let operator = await response.json();

    return new Operator({
      api          : {
        token    : token,
        tokenType: tokenType,
        url      : url + "/" + operator["id"]
      },
      id           : operator["id"],
      accountId    : operator["account_id"],
      authority    : operator["authority"],
      operatorState: operator["operator_state"],
      email        : operator["email"],
      name         : operator["name"],
      displayName  : operator["display_name"],
      imageFilePath: operator["image_file_path"],
    })
  }

  static async create({
    token,
    tokenType,
    scope = "account",
    groupId,
    accountId,
    operator: {
      image,
      ...operator
    }
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/operators")
        : scope == "group" ? (config["echat_api_host"] + "/groups/" + groupId + "/operators")
          : (config["echat_api_host"] + "/operators")
    );

    let response = await fetch(
      url, {
        method : "POST",
        body   : JSON.stringify(this.toPostData(operator)),
        headers: {
          "Authorization": tokenType + " " + token,
          "Content-type" : "application/json"
        }
      }
    );

    if (!response.ok)
      throw response;

    let x = await response.json();

    let value = new Operator({
      api          : {
        token    : token,
        tokenType: tokenType,
        url      : url + "/" + x["id"]
      },
      id           : x["id"],
      accountId    : x["account_id"],
      authority    : x["authority"],
      operatorState: x["operator_state"],
      email        : x["email"],
      name         : x["name"],
      displayName  : x["display_name"]
    });

    if (image) {
      let response = await fetch(
        url + "/" + value.id + "/image", {
          method : "POST",
          body   : toFormData({"upfile": image}),
          headers: {
            "Authorization": tokenType + " " + token,
          }
        }
      );

      if (!response.ok) {
        throw response;
      }

      let x = await response.json();

      Object.assign(
        value, {
          imageFilePath: x["image_file_path"]
        })
    }

    return value;
  }
};
