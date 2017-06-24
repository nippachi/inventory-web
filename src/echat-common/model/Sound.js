let config     = require("echat-common/config");
let toFormData = require("echat-common/api/encoding/toFormData");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let Model      = require("echat-common/model/Model");

module.exports = class Sound extends Model {
    constructor({
        id,
        title,
        description,
        soundFilePath,
        length,
        ...props
    }) {
        super(props);

        this.id            = id;
        this.title         = title;
        this.description   = description;
        this.soundFilePath = soundFilePath;
        this.length        = length;
    }

    static toPostData(sound) {
        return ({
            "title"          : sound.title,
            "visit_sound"    : sound.visitSound,
            "sound_file_path": sound.soundFilePath,
            "length"         : sound.length
        })
    }

    /**
     * find sound
     * @return [Sound]
     */
    static async find({
        token,
        tokenType,
        accountId
    }) {

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/sounds";

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

        let sounds = await response.json();

        return sounds.map(
            x => new Sound({
                    api          : {
                        url      : url,
                        token    : token,
                        tokenType: tokenType
                    },
                    id           : x["id"],
                    title        : x["title"],
                    description  : x["description"],
                    soundFilePath: x["sound_file_path"],
                    length       : x["length"]
                }
            ))
    }

    /**
     * find sound
     * @return Sound
     */
    static async findById({
        id,
        token,
        tokenType,
        accountId
    }) {
        let Message = require("echat-common/model/Message");

        let url = config["echat_api_host"] + "/accounts/" + accountId + "/sounds/" + id;

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

        let sound = await response.json();

        return new Sound({
                api          : {
                    url      : url + "/" + sound["id"],
                    token    : token,
                    tokenType: tokenType
                },
                id           : sound["id"],
                title        : sound["title"],
                description  : sound["description"],
                soundFilePath: sound["sound_file_path"],
                length       : sound["length"]
            }
        )
    }

    /**
     * create sound
     * @return Sound
     */
    static async create({
        token,
        tokenType,
        accountId,
        sound
    }) {
        let url = config["echat_api_host"] + "/accounts/" + accountId + "/sounds";

        let response = await fetch(
            url, {
                method : "POST",
                body   : JSON.stringify(this.toPostData(sound)),
                headers: {
                    "Authorization": tokenType + " " + token,
                    "Content-type" : "application/json"
                }
            }
        );

        if (!response.ok)
            throw response;

        let x = await response.json();

        return new Sound({
                api          : {
                    url      : url,
                    token    : token,
                    tokenType: tokenType
                },
                id           : x["id"],
                title        : x["title"],
                description  : x["description"],
                soundFilePath: x["sound_file_path"],
                length       : x["length"]
            }
        )
    }
};