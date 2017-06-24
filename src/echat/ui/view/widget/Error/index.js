let getConfiguration = require("neeco-client/api/getConfiguration")

let unknownError = "不明なエラーが発生しました。";

module.exports = (
  {
    error
  }
) => {
  return error instanceof DOMException ? (
      error.code == DOMException.NETWORK_ERR ? "ネットワークエラーが発生しました。"
        : unknownError
    )
    : error instanceof Response ? (
        error.status >= 500 ? "サーバーエラーが発生しました。"
          : error.status == 404 ? (
              error.url == getConfiguration().api.url + "/token" ? "学籍番号またはパスワードが間違っています。"
                : unknownError
            )
            : error.status == 403 ? "リソースへのアクセス権がありません。"
              : unknownError
      )
      : error instanceof TypeError ? "ネットワークエラーが発生しました。"
        : unknownError
};
