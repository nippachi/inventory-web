let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Connect extends Model {
    constructor({
        id,
        connectedDate,
        disconnectedDate,
        ...props
    }) {
        super(props);

        this.id               = id;
        this.connectedDate    = connectedDate;
        this.disconnectedDate = disconnectedDate;
    }

    static toPostData(connect) {
        return ({
            "connected_date"   : connect.connectedDate,
            "disconnected_date": connect.disconnectedDate
        })
    }

    /**
     * find connect
     * @return Connect
     */
    static async find({
        token,
        tokenType,
        accountId,
        visitorId,
    }) {
        let Message = require("echat-common/model/Message");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/connects";

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

        let connects = await response.json();

        return connects.map(
            x => new Connect({
                    api              : {
                        url      : url,
                        token    : token,
                        tokenType: tokenType
                    },
                    id               : x["id"],
                    connected_date   : x["connected_date"],
                    disconnected_date: x["disconnected_date"]
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

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/connects/" + id;

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

        return new Connect({
                api              : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id               : x["id"],
                connected_date   : x["connected_date"],
                disconnected_date: x["disconnected_date"]
            }
        )
    }

    /**
     * create connect
     * @return Connect
     */
    static async create({
        token,
        tokenType,
        accountId,
        visitorId,
        connect
    }) {
        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" + visitorId + "/connects";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(connect)),
                headers: {
                    "Authorization": tokenType + " " + token,
                    "Content-type" : "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Connect({
                api              : {
                    url      : url,
                    token    : x["access_token"],
                    tokenType: x["token_type"]
                },
                id               : x["id"],
                connected_date   : x["connected_date"],
                disconnected_date: x["disconnected_date"]
            }
        )
    }
};