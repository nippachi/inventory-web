let React        = require("react");
let Button       = require("react-material/ui/view/Button");
let Dialog       = require("react-material/ui/view/Dialog");
let DialogHeader = require("react-material/ui/view/DialogHeader");
let DialogBody   = require("react-material/ui/view/DialogBody");
let DialogFooter = require("react-material/ui/view/DialogFooter");

module.exports = (
  {
    visible,
    autoComplete = "off",
    title,
    onSubmit,
    onCancel,
    className,
    children,
    ...props
  }
) =>
  <Dialog
    visible={visible}
    component="form"
    onSubmit={(e) =>
    onSubmit && onSubmit(e)
    }
  >
    <DialogHeader>
      <h2>{title} 編集</h2>
    </DialogHeader>
    <DialogBody>
      {children}
    </DialogBody>
    <DialogFooter>
      <Button
        type="flat"
        onClick={() => {
          onCancel && onCancel()
        }}
      >
        キャンセル
      </Button>
      <Button
        component="button"
        type="flat"
      >
        登録
      </Button>
    </DialogFooter>
  </Dialog>;
