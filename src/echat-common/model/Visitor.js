let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Visitor extends Model {
    constructor({
        id,
        accountId,
        company,
        email,
        information,
        name,
        phone,
        connect,
        transition,
        fileTransferFlag,
        lastMessage,
        banInformation,
        bannedDate,
        bannedFlag,
        bannedOperatorId,
        locationHost,
        locationHostname,
        locationPort,
        locationPathname,
        navigatorAppCodeName,
        navigatorAppName,
        navigatorAppVersion,
        navigatorLanguage,
        navigatorPlatform,
        navigatorUserAgent,
        documentReferrer,
        documentDomain,
        screenWidth,
        screenHeight,
        screenColorDepth,
        messages,
        createdDate,
        ...props
    }) {
        super(props);

        this.id                   = id;
        this.accountId            = accountId;
        this.bannedDate           = bannedDate;
        this.bannedFlag           = bannedFlag;
        this.bannedOperatorId     = bannedOperatorId;
        this.company              = company;
        this.email                = email;
        this.information          = information;
        this.name                 = name;
        this.phone                = phone;
        this.connect              = connect;
        this.transition           = transition;
        this.fileTransferFlag     = fileTransferFlag;
        this.lastMessage          = lastMessage;
        this.banInformation       = banInformation;
        this.locationHost         = locationHost;
        this.locationHostname     = locationHostname;
        this.locationPort         = locationPort;
        this.locationPathname     = locationPathname;
        this.navigatorAppCodeName = navigatorAppCodeName;
        this.navigatorAppName     = navigatorAppName;
        this.navigatorAppVersion  = navigatorAppVersion;
        this.navigatorLanguage    = navigatorLanguage;
        this.navigatorPlatform    = navigatorPlatform;
        this.navigatorUserAgent   = navigatorUserAgent;
        this.documentReferrer     = documentReferrer;
        this.documentDomain       = documentDomain;
        this.screenWidth          = screenWidth;
        this.screenHeight         = screenHeight;
        this.screenColorDepth     = screenColorDepth;
        this.messages             = messages;
        this.createdDate          = createdDate
    }

    static toPostData(visitor) {
        return ({
            "account_id"             : visitor.accountId,
            "ban_information"        : visitor.banInformation,
            "company"                : visitor.company,
            "email"                  : visitor.email,
            "information"            : visitor.information,
            "name"                   : visitor.name,
            "phone"                  : visitor.phone,
            "connect"                : visitor.connect,
            "transition"             : visitor.transition,
            "file_transfer_flag"     : visitor.fileTransferFlag,
            "last_message"           : visitor.lastMessage,
            "banned_date"            : visitor.bannedDate,
            "banned_flag"            : visitor.bannedFlag,
            "banned_operator_id"     : visitor.bannedOperatorId,
            "location_host"          : visitor.locationHost,
            "location_hostname"      : visitor.locationHostname,
            "location_port"          : parseInt(visitor.locationPort),
            "location_pathname"      : visitor.locationPathname,
            "navigator_app_code_name": visitor.navigatorAppCodeName,
            "navigator_app_name"     : visitor.navigatorAppName,
            "navigator_app_version"  : visitor.navigatorAppVersion,
            "navigator_language"     : visitor.navigatorLanguage,
            "navigator_platform"     : visitor.navigatorPlatform,
            "navigator_user_agent"   : visitor.navigatorUserAgent,
            "document_referrer"      : visitor.documentReferrer,
            "document_domain"        : visitor.documentDomain,
            "screen_width"           : visitor.screenWidth,
            "screen_height"          : visitor.screenHeight,
            "screen_color_depth"     : visitor.screenColorDepth,
            "created_date"           : visitor.createdDate
        })
    }

    /**
     * find visitors
     * @return Visitors
     */
    static async find({
        token,
        tokenType,
        accountId,
        connecting = false
    }) {
        let Connect    = require("echat-common/model/Connect");
        let Message    = require("echat-common/model/Message");
        let Transition = require("echat-common/model/Transition.js");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors";

        let response = await fetch(
            url + (connecting ? "/connecting" : ""),
            {
                method : "GET",
                headers: {
                    "Authorization": tokenType + " " + token
                }
            }
        );

        if (!response.ok)
            throw response;

        let visitors = await response.json();

        return visitors.map(
            x => new Visitor(
                {
                    api                 : {
                        url      : url + "/" + x["id"],
                        token    : token,
                        tokenType: tokenType
                    },
                    id                  : x["id"],
                    accountId           : x["account_id"],
                    company             : x["company"],
                    email               : x["email"],
                    information         : x["information"],
                    name                : x["name"],
                    phone               : x["phone"],
                    connect             : (x["connect"] || []).map(
                        (y) => new Connect({
                            id              : y["id"],
                            connectedDate   : y["connected_date"],
                            disconnectedDate: y["disconnected_date"],
                            api             : {
                                url      : url + "/" + x["id"] + "/connect",
                                token    : token,
                                tokenType: tokenType
                            }
                        })
                    ),
                    transition          : (x["transition"] || []).map(
                        (y) => new Transition({
                            createdDate: y["created_date"],
                            url        : y["url"],
                            connectId  : y["connect_id"],
                            api        : {
                                url      : url + "/" + x["id"] + "/transition",
                                token    : token,
                                tokenType: tokenType
                            }
                        })
                    ),
                    lastMessage         : x["last_message"] && new Message({
                        id         : x["last_message"]["id"],
                        visitorId  : x["last_message"]["visitor_id"],
                        operatorId : x["last_message"]["operator_id"],
                        message    : x["last_message"]["message"],
                        createdDate: x["last_message"]["created_date"],
                        api        : {
                            url      : url + "/" + x["id"] + "/messages/" + x["last_message"]["id"],
                            token    : token,
                            tokenType: tokenType
                        }
                    }),
                    fileTransferFlag    : x["file_transfer_flag"],
                    banInformation      : x["ban_information"],
                    bannedDate          : x["banned_date"],
                    bannedFlag          : x["banned_flag"],
                    bannedOperatorId    : x["banned_operator_id"],
                    locationHost        : x["location_host"],
                    locationHostname    : x["location_hostname"],
                    locationPort        : x["location_port"],
                    locationPathname    : x["location_pathname"],
                    navigatorAppCodeName: x["navigator_app_code_name"],
                    navigatorAppName    : x["navigator_app_name"],
                    navigatorAppVersion : x["navigator_app_version"],
                    navigatorLanguage   : x["navigator_language"],
                    navigatorPlatform   : x["navigator_platform"],
                    navigatorUserAgent  : x["navigator_user_agent"],
                    documentReferrer    : x["document_referrer"],
                    documentDomain      : x["document_domain"],
                    screenWidth         : x["screen_width"],
                    screenHeight        : x["screen_height"],
                    screenColorDepth    : x["screen_color_depth"],
                    messages            : x["messages"] ? x["messages"].map(
                            (y) => new Message({
                                id         : y["id"],
                                visitorId  : y["visitor_id"],
                                operatorId : y["operator_id"],
                                message    : y["message"],
                                createdDate: y["created_date"],
                                api        : {
                                    url      : url + "/messages",
                                    token    : token,
                                    tokenType: tokenType
                                }
                            })
                        ) : [],
                    createdDate         : x["created_date"]
                }
            )
        )
    }


    /**
     * findById visitor
     * @return Visitor
     */
    static async findById({
        token,
        tokenType,
        accountId,
        id,
        connecting = false
    }) {
        let Connect    = require("echat-common/model/Connect");
        let Message    = require("echat-common/model/Message");
        let Transition = require("echat-common/model/Transition.js");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors/" +  id ;

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

        let visitors = await response.json();

        return new Visitor({
                api                 : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id                  : visitors["id"],
                accountId           : visitors["account_id"],
                company             : visitors["company"],
                email               : visitors["email"],
                information         : visitors["information"],
                name                : visitors["name"],
                phone               : visitors["phone"],
                connect             : (visitors["visitor_connect"] || []).map(
                    (y) => new Connect({
                        id              : y["id"],
                        connectedDate   : y["connected_date"],
                        disconnectedDate: y["disconnected_date"],
                        api             : {
                            url      : url + "/connect",
                            token    : token,
                            tokenType: tokenType
                        }
                    })
                ),
                transition          : (visitors["transition"] || []).map(
                    (y) => new Transition({
                        createdDate: y["created_date"],
                        url        : y["url"],
                        connectId  : y["connect_id"],
                        api        : {
                            url      : url + "/transition",
                            token    : token,
                            tokenType: tokenType
                        }
                    })
                ),
                lastMessage         : visitors["last_message"] && new Message({
                    id         : visitors["last_message"]["id"],
                    visitorId  : visitors["last_message"]["visitor_id"],
                    operatorId : visitors["last_message"]["operator_id"],
                    message    : visitors["last_message"]["message"],
                    createdDate: visitors["last_message"]["created_date"],
                    api        : {
                        url      : url + "/messages/" + visitors["last_message"]["id"],
                        token    : token,
                        tokenType: tokenType
                    }
                }),
                fileTransferFlag    : visitors["file_transfer_flag"],
                banInformation      : visitors["ban_information"],
                bannedDate          : visitors["banned_date"],
                bannedFlag          : visitors["banned_flag"],
                bannedOperatorId    : visitors["banned_operator_id"],
                locationHost        : visitors["location_host"],
                locationHostname    : visitors["location_hostname"],
                locationPort        : visitors["location_port"],
                locationPathname    : visitors["location_pathname"],
                navigatorAppCodeName: visitors["navigator_app_code_name"],
                navigatorAppName    : visitors["navigator_app_name"],
                navigatorAppVersion : visitors["navigator_app_version"],
                navigatorLanguage   : visitors["navigator_language"],
                navigatorPlatform   : visitors["navigator_platform"],
                navigatorUserAgent  : visitors["navigator_user_agent"],
                documentReferrer    : visitors["document_referrer"],
                documentDomain      : visitors["document_domain"],
                screenWidth         : visitors["screen_width"],
                screenHeight        : visitors["screen_height"],
                screenColorDepth    : visitors["screen_color_depth"],
                messages            : (visitors["messages"] || []).map(
                    (x) => new Message({
                        id         : x["id"],
                        visitorId  : x["visitor_id"],
                        operatorId : x["operator_id"],
                        message    : x["message"],
                        createdDate: x["created_date"],
                        api        : {
                            url      : url + "/messages",
                            token    : token,
                            tokenType: tokenType
                        }
                    })
                ),
                createdDate         : visitors["created_date"]
            }
        )
    }

    /**
     * create visitor
     * @return Visitor
     */
    static async create({
        accountId,
        visitor
    }) {
        let Connect    = require("echat-common/model/Connect");
        let Message    = require("echat-common/model/Message");
        let Transition = require("echat-common/model/Transition.js");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/visitors";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(visitor)),
                headers: {
                    "Content-type": "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();
        console.log(x);

        return new Visitor(
            {
                api                 : {
                    url      : url + "/" + x["id"],
                    token    : x["access_token"],
                    tokenType: x["token_type"]
                },
                id                  : x["id"],
                accountId           : x["account_id"],
                company             : x["company"],
                email               : x["email"],
                information         : x["information"],
                name                : x["name"],
                phone               : x["phone"],
                connect             : (x["connect"] || []).map(
                    (y) => new Connect({
                        id              : y["id"],
                        connectedDate   : y["connected_date"],
                        disconnectedDate: y["disconnected_date"],
                        api             : {
                            url      : url + "/" + x["id"] + "/connect",
                            token    : token,
                            tokenType: tokenType
                        }
                    })
                ),
                transition          : (x["transition"] || []).map(
                    (y) => new Transition({
                        createdDate: y["created_date"],
                        url        : y["url"],
                        connectId  : y["connect_id"],
                        api        : {
                            url      : url + "/" + x["id"] + "/transition",
                            token    : token,
                            tokenType: tokenType
                        }
                    })
                ),
                lastMessage         : x["last_message"] && new Message({
                    id         : x["last_message"]["id"],
                    visitorId  : x["last_message"]["visitor_id"],
                    operatorId : x["last_message"]["operator_id"],
                    message    : x["last_message"]["message"],
                    createdDate: x["last_message"]["created_date"],
                    api        : {
                        url      : url + "/" + x["id"] + "/messages/" + x["last_message"]["id"],
                        token    : token,
                        tokenType: tokenType
                    }
                }),
                fileTransferFlag    : x["file_transfer_flag"],
                banInformation      : x["ban_information"],
                bannedDate          : x["banned_date"],
                bannedFlag          : x["banned_flag"],
                bannedOperatorId    : x["banned_operator_id"],
                locationHost        : x["location_host"],
                locationHostname    : x["location_hostname"],
                locationPort        : x["location_port"],
                locationPathname    : x["location_pathname"],
                navigatorAppCodeName: x["navigator_app_code_name"],
                navigatorAppName    : x["navigator_app_name"],
                navigatorAppVersion : x["navigator_app_version"],
                navigatorLanguage   : x["navigator_language"],
                navigatorPlatform   : x["navigator_platform"],
                navigatorUserAgent  : x["navigator_user_agent"],
                documentReferrer    : x["document_referrer"],
                documentDomain      : x["document_domain"],
                screenWidth         : x["screen_width"],
                screenHeight        : x["screen_height"],
                screenColorDepth    : x["screen_color_depth"],
                messages            : x["messages"] ? x["messages"].map(
                        (x) => new Message({
                            id         : x["id"],
                            visitorId  : x["visitor_id"],
                            operatorId : x["operator_id"],
                            message    : x["message"],
                            createdDate: x["created_date"],
                            api        : {
                                url      : url + "/" + x["id"],
                                token    : x["access_token"],
                                tokenType: x["token_type"]
                            }
                        })
                    ) : [],
                createdDate         : x["created_date"],
            }
        )
    }
};