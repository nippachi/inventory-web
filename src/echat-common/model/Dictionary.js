let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Dictionary extends Model {
  constructor({
    id,
    name,
    wording,
    description,
    activeFlag,
    ...props
  }) {
    super(props);

    this.id          = id;
    this.name        = name;
    this.wording     = wording;
    this.description = description;
    this.activeFlag  = activeFlag
  }

  static toPostData(dictionary) {
    return ({
      "name"       : dictionary.name,
      "wording"    : dictionary.wording,
      "description": dictionary.description,
      "active_flag": dictionary.activeFlag
    })
  }

  /**
   * find dictionaries
   * @return {Array<Dictionary>}
   */
  static async find({
    token,
    tokenType,
    scope = "operator",
    accountId,
    operatorId,
    groupId,
    page,
    perPage
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/dictionaries")
        : scope == "group" ? (config["echat_api_host"] + "/groups/" + groupId + "/dictionaries")
          : (config["echat_api_host"] + "/accounts/" + accountId + "/operators/" + operatorId + "/dictionaries")
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

    let dictionaries = await response.json();

    return dictionaries.map(
      (x) =>
        new Dictionary(
          {
            api        : {
              token    : token,
              tokenType: tokenType,
              url      : url + "/" + x["id"]
            },
            id         : x["id"],
            name       : x["name"],
            wording    : x["wording"],
            description: x["description"],
            activeFlag : x["active_flag"]
          })
    )
  }

  /**
   * findById dictionary
   * @return Dictionary
   */
  static async findById({
    id,
    token,
    tokenType,
    scope = "operator",
    accountId,
    operatorId,
    groupId
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/dictionaries/" + id)
        : scope == "group" ? (config["echat_api_host"] + "/groups/" + groupId + "/dictionaries/" + id)
          : (config["echat_api_host"] + "/accounts/" + accountId + "/operators/" + operatorId + "/dictionaries/" + id)
    );

    let response = await fetch(
      url,
      {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token,
        }
      }
    );

    if (!response.ok)
      throw response;

    let x = await response.json();

    return new Dictionary(
      {
        api        : {
          token    : token,
          tokenType: tokenType,
          url      : url
        },
        id         : x["id"],
        name       : x["name"],
        wording    : x["wording"],
        description: x["description"],
        activeFlag : x["active_flag"]
      });
  }


  /**
   * create dictionary
   * @return {Dictionary}
   */
  static async create({
    scope = "operator",
    token,
    tokenType,
    dictionary,
    accountId,
    operatorId,
    groupId
  }) {
    let url = (
      scope == "account" ? (config["echat_api_host"] + "/accounts/" + accountId + "/dictionaries")
        : scope == "group" ? (config["echat_api_host"] + "/groups/" + groupId + "/dictionaries")
          : (config["echat_api_host"] + "/accounts/" + accountId + "/operators/" + operatorId + "/dictionaries")
    );

    let response = await fetch(
      url,
      {
        method : "POST",
        body   : JSON.stringify(this.toPostData(dictionary)),
        headers: {
          "Authorization": tokenType + " " + token,
          "Content-type" : "application/json"
        }
      }
    );

    if (!response.ok)
      throw response;

    let x = await response.json();

    return (
      new Dictionary(
        {
          api        : {
            token    : token,
            tokenType: tokenType,
            url      : url + "/" + x["id"]
          },
          id         : x["id"],
          name       : x["name"],
          wording    : x["wording"],
          description: x["description"],
          activeFlag : x["active_flag"]
        })
    )
  }
};
