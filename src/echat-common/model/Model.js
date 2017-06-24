let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");

module.exports = class Model {
  constructor({
    api: {
      token,
      tokenType,
      url
    }
  }) {
    this.api = {
      token    : token,
      tokenType: tokenType,
      url      : url
    }
  }

  static toPostData(x) {
    return x
  }

  async update(x) {
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

    if (!response.ok)
      throw response;

    Object.assign(this, x);

    return response
  }

  async destroy() {
    let response = await fetch(
      this.api.url,
      {
        method : "DELETE",
        headers: {
          "Authorization": this.api.tokenType + " " + this.api.token,
        }
      }
    );

    if (!response.ok) {
      throw response
    }
  }

  async save() {
    this.update(this)
  }
};
