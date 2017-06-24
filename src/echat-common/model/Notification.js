let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Notification extends Model {
    constructor({
        id,
        hostname,
        visitSound,
        firstMessageSound,
        messageSound,
        activeFlag,
        defaultFlag,
        accountId,
        ...props
    }) {
        super(props);

        this.id                = id;
        this.accountId         = accountId;
        this.hostname          = hostname;
        this.visitSound        = visitSound;
        this.firstMessageSound = firstMessageSound;
        this.messageSound      = messageSound;
        this.activeFlag        = activeFlag;
        this.defaultFlag       = defaultFlag;
    }

    static toPostData(notification) {
        return ({
            "hostname"           : notification.hostname,
            "visit_sound"        : notification.visitSound,
            "first_message_sound": notification.firstMessageSound,
            "message_sound"      : notification.messageSound,
            "active_flag"        : notification.activeFlag,
            "default_flag"       : notification.defaultFlag,
            "account_id"         : notification.accountId
        })
    }

    /**
     * find notification
     * @return [Notification]
     */
    static async find({
        token,
        tokenType,
        accountId
    }) {

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/notifications";

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

        let notifications = await response.json();

        return notifications.map(
            x => new Notification({
                    api              : {
                        url      : url + "/" + x["id"],
                        token    : token,
                        tokenType: tokenType
                    },
                    id               : x["id"],
                    hostname         : x["hostname"],
                    visitSound       : x["visit_sound"],
                    firstMessageSound: x["first_message_sound"],
                    messageSound     : x["message_sound"],
                    activeFlag       : x["active_flag"],
                    defaultFlag      : x["default_flag"],
                    accountId        : x["account_id"]
                }
            ))
    }

    /**
     * find notification
     * @return Notification
     */
    static async findById({
        id,
        token,
        tokenType,
        accountId
    }) {

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/notifications/" + id;

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

        let notification = await response.json();

        return new Notification({
                api              : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id               : notification["id"],
                hostname         : notification["hostname"],
                visitSound       : notification["visit_sound"],
                firstMessageSound: notification["first_message_sound"],
                messageSound     : notification["message_sound"],
                activeFlag       : notification["active_flag"],
                defaultFlag      : notification["default_flag"],
                accountId        : notification["account_id"]
            }
        )
    }

    /**
     * create notification
     * @return Notification
     */
    static async create({
        token,
        tokenType,
        accountId,
        notification
    }) {
        let url = config["echat_api_host"] + "/accounts/" + accountId + "/notifications";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(notification)),
                headers: {
                    "Authorization": tokenType + " " + token,
                    "Content-type" : "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Notification({
                api              : {
                    url      : url + "/" + x["id"],
                    token    : token,
                    tokenType: tokenType
                },
                id               : x["id"],
                hostname         : x["hostname"],
                visitSound       : x["visit_sound"],
                firstMessageSound: x["first_message_sound"],
                messageSound     : x["message_sound"],
                activeFlag       : x["active_flag"],
                defaultFlag      : x["default_flag"],
                accountId        : x["account_id"]
            }
        )
    }
};