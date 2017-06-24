let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");
module.exports = class Account extends Model {
  constructor(
    {
      id,
      plan,
      email,
      address,
      imageFilePath,
      demoPageUrl,
      maxOperator,
      ...props
    }
  ) {
    super(props);

    this.id            = id;
    this.plan          = plan;
    this.email         = email;
    this.address       = address;
    this.imageFilePath = imageFilePath;
    this.demoPageUrl   = demoPageUrl;
    this.maxOperator   = maxOperator
  }

  static toPostData(account) {
    return ({
      "plan"       : account.plan,
      "email"      : account.email,
      "address"    : account.address,
      "image"      : account.image,
      "demoPageUrl": account.demoPageUrl,
      "maxOperator": account.maxOperator
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
            "Authorization"  : this.api.tokenType + " " + this.api.token,
            "Content-type": "application/json"
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
        this.api.url + "/image",
        {
          method : "POST",
          body   : toFormData({"upfile": image}),
          headers: {
            "Authorization"  : this.api.tokenType + " " + this.api.token,
          }
        }
      );

      if (!response.ok) {
        throw response;
      }
      Object.assign(this, await response.json());
    }
  }

  static async findById({
      token,
      tokenType,
      accountId,
      query
    }
  ) {
    let url = config["echat_api_host"] + "/accounts/" + accountId;

    let response = await fetch(
      url,
      {
        method : "GET",
        headers: {
          "Authorization"  : tokenType + " " + token,
        }
      }
    );
    if (!response.ok) {
      throw response
    }
    let x = await response.json();
    return new Account(
      {
        api          : {
          token: token,
          tokenType : tokenType,
          url  : url
        },
        id           : x["id"],
        plan         : x["plan"],
        email        : x["email"],
        address      : x["address"],
        imageFilePath: x["imageFilePath"],
        demoPageUrl  : x["demoPageUrl"],
        maxOperator  : x["maxOperator"]
      }
    )
  }

  static async create(
    {
      token,
      tokenType,
      accountId,
      account:{
        image,
        ...account
      }
    }
  ) {
    let url      = config["echat_api_host"] + "/accounts/" + accountId;
    let response = await fetch(
      url,
      {
        method : "POST",
        body   : JSON.stringify(this.toPostData(account)),
        headers: {
          "Authorization"  : tokenType + " " + token,
          "Content-type": "application/json"
        }
      }
    );
    if (!response.ok) {
      throw response
    }

    if (image) {
      let response = await fetch(
        this.api.url + "/image",
        {
          method : "POST",
          body   : toFormData({"upfile": image}),
          headers: {
            "Authorization"  : this.api.tokenType + " " + this.api.token,
          }
        }
      );

      if (!response.ok) {
        throw response;
      }
      Object.assign(this, await response.json());

    }

    let x = await response.json();
    return (
      new Account(
        {
          api          : {
            token: token,
            tokenType: tokenType,
            url  : url
          },
          id           : x["id"],
          plan         : x["plan"],
          email        : x["email"],
          address      : x["address"],
          imageFilePath: x["imageFilePath"],
          demoPageUrl  : x["demoPageUrl"],
          maxOperator  : x["maxOperator"]
        })
    )
  }
};
