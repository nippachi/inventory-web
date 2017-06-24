let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Message extends Model {
  constructor({
    id,
    visitorId,
    operatorId,
    message,
    createdDate,
    ...props
  }) {
    super(props);

    this.id          = id;
    this.visitorId   = visitorId;
    this.operatorId  = operatorId;
    this.message     = message;
    this.createdDate = createdDate;
  }

  static toPostData(message) {
    return ({
      "visitor_id" : message.visitorId,
      "operator_id": message.operatorId,
      "message"    : message.message
    })
  }

  static async find({
    token,
    tokenType,
    accountId,
    visitorId
  }) {
    let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/messages";

    let response = await fetch(
      url,
      {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token
        }
      }
    );

    if (!response.ok) {
      throw response
    }

    let messages = await response.json();

    return messages.map(
      (x) => new Message(
        {
          api        : {
            token    : token,
            tokenType: tokenType,
            url      : url
          },
          id         : x["id"],
          visitorId  : x["visitor_id"],
          operatorId : x["operator_id"],
          message    : x["message"],
          createdDate: x["created_date"]
        }
      )
    )
  }


  static async findById({
    token,
    tokenType,
    accountId,
    visitorId,
    id
  }) {
    let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/messages/" + id;

    let response = await fetch(
      url,
      {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token
        }
      }
    );

    if (!response.ok) {
      throw response
    }

    let x = await response.json();

    return new Message({
        api        : {
          token    : token,
          tokenType: tokenType,
          url      : url
        },
        id         : x["id"],
        visitorId  : x["visitor_id"],
        operatorId : x["operator_id"],
        message    : x["message"],
        createdDate: x["created_date"]
      }
    )
  }

  static async create({
    token,
    tokenType,
    accountId,
    visitorId,
    message
  }) {
    let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/messages";

    let response = await fetch(
      url,
      {
        method : "POST",
        body   : JSON.stringify(this.toPostData(message)),
        headers: {
          "Authorization": tokenType + " " + token,
          "Content-type" : "application/json"
        }
      }
    );

    if (!response.ok) {
      throw response
    }

    let x = await response.json();
    return new Message({
      api        : {
        token    : token,
        tokenType: tokenType,
        url      : url
      },
      id         : x["id"],
      visitorId  : x["visitor_id"],
      operatorId : x["operator_id"],
      message    : x["message"],
      createdDate: x["created_date"]
    })
  }
};
