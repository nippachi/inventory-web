let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Transition extends Model {
    constructor({
        id,
        url,
        ...props
    }) {
        super(props);

        this.id  = id;
        this.url = url;
    }

    static toPostData(transition) {
        return ({
            "url": transition.url
        })
    }

    /**
     * find transition
     * @return Transition
     */
    static async find({
        token,
        tokenType,
        accountId,
        visitorId,
    }) {
        let Message = require("echat-common/model/Message");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/transitions";

        let response = await fetch(
            url, {
                method : "GET",
                headers: {
                    "Authorization": tokenType + " " + token
                }
            }
        );

        if (!response.ok)
            throw response;

        let transitions = await response.json();

        return transitions.map(
            x => new Transition({
                api: {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id : x["id"],
                url: x["url"]
            }
        ))
    }

    static async findById({
        id,
        token,
        tokenType,
        accountId,
        visitorId,
    }) {
        let Message = require("echat-common/model/Message");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/transitions/" + id;

        let response = await fetch(
            url, {
                method : "GET",
                headers: {
                    "Authorization": tokenType + " " + token
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Transition({
                api: {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id : x["id"],
                url: x["url"]
            }
        )
    }

    /**
     * create transition
     * @return Transition
     */
    static async create({
        token,
        tokenType,
        accountId,
        visitorId,
        transition
    }) {
        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/transitions";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(transition)),
                headers: {
                    "Authorization": tokenType + " " + token,
                    "Content-type" : "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Transition({
                api: {
                    url      : url,
                    token    : x["access_token"],
                    tokenType: x["token_type"]
                },
                id : x["id"],
                url: x["url"]
            }
        )
    }
};