let config     = require("echat-common/config");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class WidgetCondition extends Model {

    constructor({
        id,
        type,
        url,
        matchConditions,
        visitCount,
        device,
        ...props
    }) {
        super(props);

        this.id              = id;
        this.name            = name;
        this.type            = type;
        this.url             = url;
        this.matchConditions = matchConditions;
        this.visitCount      = visitCount;
        this.device          = device;
    }

    static toPostData(WidgetCondition) {
        return ({
            id              : WidgetCondition.id,
            name            : WidgetCondition.name,
            type            : WidgetCondition.type,
            url             : WidgetCondition.url,
            match_conditions: WidgetCondition.matchConditions,
            visit_count     : WidgetCondition.visitCount,
            device          : WidgetCondition.device
        })
    }

    /**
     * find WidgetConditions
     * @return {Array<WidgetCondition>}
     * @return WidgetCondition
     */
    static async find({
        token,
        tokenType,
        accountId,
        page,
        perPage,
        query
    }) {
        let url = (
            config["echat_api_host"] + "/accounts/" + accountId + "/widget_conditions"
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
        let WidgetConditions = await response.json();

        return WidgetConditions.map(
            (x) =>
                new WidgetCondition(
                    {
                        api            : {
                            token    : token,
                            tokenType: tokenType,
                            url      : url + "/" + x["id"]
                        },
                        id             : x["id"],
                        name           : x["name"],
                        type           : x["type"],
                        url            : x["url"],
                        matchConditions: x["match_conditions"],
                        visitCount     : x["visit_count"],
                        device         : x["device"]
                    }
                )
        )
    }

    /**
     * create WidgetCondition
     * @return {WidgetCondition}
     */
    static async create({
        token,
        tokenType,
        accountId,
        WidgetCondition
    }) {
        let url = ((config["echat_api_host"] + "/accounts/" + accountId + "/widget_conditions"));

        let response = await fetch(
            url,
            {
                method : "POST",
                body   : JSON.stringify(this.toPostData(WidgetCondition)),
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
            new WidgetCondition(
                {
                    api            : {
                        token    : token,
                        tokenType: tokenType,
                        url      : url + "/" + x["id"]
                    },
                    id             : x["id"],
                    name           : x["name"],
                    type           : x["type"],
                    url            : x["url"],
                    matchConditions: x["match_conditions"],
                    visitCount     : x["visit_count"],
                    device         : x["device"]
                }
            )
        )
    }
};