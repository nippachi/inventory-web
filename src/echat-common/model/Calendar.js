let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

let getSecond = (s) => {
    if (s != "24:00:00") {
        let date = new Date("January 01, 1970 " + s);
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
    } else {
        return 86400
    }
};

module.exports = class Calendar extends Model {
    constructor({
        id,
        startTime,
        endTime,
        accountId,
        dayOfTheWeek,
        activeFlag,
        updatedDate,
        createdDate,
        ...props
    }) {
        super(props);

        this.id           = id;
        this.startTime    = startTime;
        this.endTime      = endTime;
        this.accountId    = accountId;
        this.dayOfTheWeek = dayOfTheWeek;
        this.activeFlag   = activeFlag;
        this.updatedDate  = updatedDate;
        this.createdDate  = createdDate;
    }

    static toPostData(calendar) {
        let getTime = (s) => {
            if (s < 86400) {
                let date = new Date(0, 0, 0, 0, 0, 0);
                date.setSeconds(s);
                return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2)
            } else {
                return "24:00:00"
            }
        };
        return ({
            "start_time"     : getTime(calendar.startTime),
            "end_time"       : getTime(calendar.endTime),
            "account_id"     : calendar.accountId,
            "day_of_the_week": calendar.dayOfTheWeek,
            "active_flag"    : calendar.activeFlag,
        })
    }

    /**
     * find calendar
     * @return [Calendar]
     */
    static async find({
        token,
        tokenType,
        accountId
    }) {

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/calendars";

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

        let calendars = await response.json();

        return calendars.map(
            x => new Calendar({
                    api         : {
                        url      : url + "/" + x["id"],
                        token    : token,
                        tokenType: tokenType
                    },
                    id          : x["id"],
                    startTime   : getSecond(x["start_time"]),
                    endTime     : getSecond(x["end_time"]),
                    accountId   : x["account_id"],
                    dayOfTheWeek: x["day_of_the_week"],
                    activeFlag  : x["active_flag"],
                    updatedDate : x["updated_date"],
                    createdDate : x["created_date"]
                }
            ))
    }

    /**
     * find calendar
     * @return Calendar
     */
    static async findById({
        id,
        token,
        tokenType,
        accountId
    }) {
        let Message = require("echat-common/model/Message");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/calendars/" + id;

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

        let calendar = await response.json();

        return new Calendar({
                api         : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id          : calendar["id"],
                startTime   : getSecond(calendar["start_time"]),
                endTime     : getSecond(calendar["end_time"]),
                accountId   : calendar["account_id"],
                dayOfTheWeek: calendar["day_of_the_week"],
                activeFlag  : calendar["active_flag"],
                updatedDate : calendar["updated_date"],
                createdDate : calendar["created_date"]
            }
        );
    }

    /**
     * create calendar
     * @return Calendar
     */
    static async create({
        token,
        tokenType,
        accountId,
        calendar
    }) {
        let url = config["echat_api_host"] + "/accounts/" + accountId + "/calendars";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(calendar)),
                headers: {
                    "Authorization": tokenType + " " + token,
                    "Content-type" : "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Calendar({
                api         : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id          : x["id"],
                startTime   : getSecond(x["start_time"]),
                endTime     : getSecond(x["end_time"]),
                accountId   : x["account_id"],
                dayOfTheWeek: x["day_of_the_week"],
                activeFlag  : x["active_flag"],
                updatedDate : x["updated_date"],
                createdDate : x["created_date"]
            }
        )
    }
};