let config     = require("echat-common/config");
let toURIQuery = require("echat-common/api/encoding/toURIQuery");
let toFormData = require("echat-common/api/encoding/toFormData");
let Model      = require("echat-common/model/Model");

module.exports = class Widget extends Model {

  constructor({
    id,
    name,
    imageFilePath,
    place,
    mainColor,
    userMessageColor,
    userBalloonColor,
    operatorMessageColor,
    operatorBalloonColor,
    titleColor,
    subtitleColor,
    descriptionColor,
    title,
    subtitle,
    description,
    waitingTitle,
    waitingDescription,
    offlineTitle,
    offlineDescription,
    mainFlag,
    activeFlag,
    ...props
  }) {
    super(props);

    this.id                   = id;
    this.name                 = name;
    this.imageFilePath        = imageFilePath;
    this.place                = place;
    this.mainColor            = mainColor;
    this.userMessageColor     = userMessageColor;
    this.userBalloonColor     = userBalloonColor;
    this.operatorMessageColor = operatorMessageColor;
    this.operatorBalloonColor = operatorBalloonColor;
    this.titleColor           = titleColor;
    this.subtitleColor        = subtitleColor;
    this.descriptionColor     = descriptionColor;
    this.title                = title;
    this.subtitle             = subtitle;
    this.description          = description;
    this.waitingTitle         = waitingTitle;
    this.waitingDescription   = waitingDescription;
    this.offlineTitle         = offlineTitle;
    this.offlineDescription   = offlineDescription;
    this.mainFlag             = mainFlag;
    this.activeFlag           = activeFlag
  }


  static toPostData(widget) {
    return ({
      id                    : widget.id,
      name                  : widget.name,
      image_file_path       : widget.imageFilePath,
      place                 : widget.place,
      main_color            : widget.mainColor,
      user_message_color    : widget.userMessageColor,
      user_balloon_color    : widget.userBalloonColor,
      operator_message_color: widget.operatorMessageColor,
      operator_balloon_color: widget.operatorBalloonColor,
      title_color           : widget.titleColor,
      subtitle_color        : widget.subtitleColor,
      description_color     : widget.descriptionColor,
      title                 : widget.title,
      subtitle              : widget.subtitle,
      description           : widget.description,
      waiting_title         : widget.waitingTitle,
      waiting_description   : widget.waitingDescription,
      offline_title         : widget.offlineTitle,
      offline_description   : widget.offlineDescription,
      main_flag             : widget.mainFlag,
      active_flag           : widget.activeFlag
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
            "Authorization": this.api.tokenType + " " + this.api.token,
            "Content-type" : "application/json"
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
            "Authorization": this.api.tokenType + " " + this.api.token,
          }
        }
      );

      if (!response.ok) {
        throw response;
      }
      Object.assign(this, await response.json());
    }
  }


  /**
   * find widgets
   * @return {Array<Widget>}
   * @return Widget
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
      config["echat_api_host"] + "/accounts/" + accountId + "/widgets"
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
    let widgets = await response.json();

    return widgets.map(
      (x) =>
        new Widget(
          {
            api: {
              token    : token,
              tokenType: tokenType,
              url      : url + "/" + x["id"]
            },

            id                  : x["id"],
            name                : x["name"],
            imageFilePath       : x["image_file_path"],
            place               : x["place"],
            mainColor           : x["main_color"],
            userMessageColor    : x["user_message_color"],
            userBalloonColor    : x["user_balloon_color"],
            operatorMessageColor: x["operator_message_color"],
            operatorBalloonColor: x["operator_balloon_color"],
            titleColor          : x["title_color"],
            subtitleColor       : x["subtitle_color"],
            descriptionColor    : x["description_color"],
            title               : x["title"],
            subtitle            : x["subtitle"],
            description         : x["description"],
            waitingTitle        : x["waiting_title"],
            waitingDescription  : x["waiting_description"],
            offlineTitle        : x["offline_title"],
            offlineDescription  : x["offline_description"],
            mainFlag            : x["main_flag"],
            activeFlag          : x["active_flag"]
          }
        )
    )
  }


  /**
   * find widgets
   * @return {Array<Widget>}
   * @return Widget
   */
  static async findById({
    token,
    tokenType,
    accountId,
    id
  }) {
    let url = (
      config["echat_api_host"] + "/accounts/" + accountId + "/widgets/" + id
    );

    let response = await fetch(
      url, {
        method : "GET",
        headers: {
          "Authorization": tokenType + " " + token,
        }
      }
    );

    if (!response.ok)
      throw response;
    let widgets = await response.json();

    return new Widget(
      {
        api: {
          token    : token,
          tokenType: tokenType,
          url      : url + "/" + widgets["id"]
        },
        id                  : widgets["id"],
        name                : widgets["name"],
        imageFilePath       : widgets["image_file_path"],
        place               : widgets["place"],
        mainColor           : widgets["main_color"],
        userMessageColor    : widgets["user_message_color"],
        userBalloonColor    : widgets["user_balloon_color"],
        operatorMessageColor: widgets["operator_message_color"],
        operatorBalloonColor: widgets["operator_balloon_color"],
        titleColor          : widgets["title_color"],
        subtitleColor       : widgets["subtitle_color"],
        descriptionColor    : widgets["description_color"],
        title               : widgets["title"],
        subtitle            : widgets["subtitle"],
        description         : widgets["description"],
        waitingTitle        : widgets["waiting_title"],
        waitingDescription  : widgets["waiting_description"],
        offlineTitle        : widgets["offline_title"],
        offlineDescription  : widgets["offline_description"],
        mainFlag            : widgets["main_flag"],
        activeFlag          : widgets["active_flag"]
      }
    )
  }

  /**
   * create widget
   * @return {Widget}
   */
  static async create({
    token,
    tokenType,
    accountId,
    widget: {
      image,
      ...widget
    }
  }) {
    let url = ((config["echat_api_host"] + "/accounts/" + accountId + "/widgets"));

    let response = await fetch(
      url,
      {
        method : "POST",
        body   : JSON.stringify(this.toPostData(widget)),
        headers: {
          "Authorization": tokenType + " " + token,
          "Content-type" : "application/json"
        }
      }
    );

    if (!response.ok)
      throw response;

    let x = await response.json();

    let value = new Widget(
      {
        api: {
          token    : token,
          tokenType: tokenType,
          url      : url + "/" + x["id"]
        },

        id                  : x["id"],
        name                : x["name"],
        place               : x["place"],
        mainColor           : x["main_color"],
        userMessageColor    : x["user_message_color"],
        userBalloonColor    : x["user_balloon_color"],
        operatorMessageColor: x["operator_mmessage_color"],
        operatorBalloonColor: x["operator_balloon_color"],
        titleColor          : x["title_color"],
        subtitleColor       : x["subtitle_color"],
        descriptionColor    : x["description_color"],
        title               : x["title"],
        subtitle            : x["subtitle"],
        description         : x["description"],
        waitingTitle        : x["waiting_title"],
        waitingDescription  : x["waiting_description"],
        offlineTitle        : x["offline_title"],
        offlineDescription  : x["offline_description"],
        mainFlag            : x["main_flag"],
        activeFlag          : x["active_flag"]
      });

    if (image) {
      let response = await fetch(
        url + "/" + value.id + "/image",
        {
          method : "POST",
          body   : toFormData({"upfile": image}),
          headers: {
            "Authorization": tokenType + " " + token,
          }
        }
      );
      if (!response.ok) {
        throw response;
      }
      let x = await response.json();
      Object.assign(
        value, {
          imageFilePath: x["image_file_path"]
        })
    }
    return value;
  }
};