let React    = require("react")
let ReactDOM = require("react-dom")
let Root     = require("react-material/ui/control/Root")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Dialog/classNames")

module.exports = props =>
  <Root>
    <Dialog
      {...props}
    />
  </Root>

let Dialog = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        onClick: e => {
          if (!ReactDOM.findDOMNode(this).contains(e.target))
            this.props.onCancel && this.props.onCancel()
        },
        size   : undefined
      })
  }

  componentDidMount() {
    let {
          visible
        } = this.props

    if (visible)
      setTimeout(
        () => window.addEventListener("click", this.state.onClick, false),
        1
      )

    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

    this.setState(
      {
        size: [
          rect.width,
          rect.height
        ]
      })
  }

  componentWillReceiveProps(
    {
      visible
    }
  ) {
    if (this.props.visible != visible) {
      if (visible)
        setTimeout(
          () => window.addEventListener("click", this.state.onClick, false),
          1
        )
      else
        window.removeEventListener("click", this.state.onClick, false)
    }
  }

  componentWillUnmount() {
    if (this.props.visible)
      window.removeEventListener("click", this.state.onClick, false)
  }

  render() {
    let {
          children,
          className,
          component = "div",
          onCancel,
          style,
          visible,
          ...props
        }           = this.props

    return (
      <Shadow
        component={component}
        children={(
          visible ? children
            : this.state.size ? undefined
              : children
        )}
        className={
          [
            className,
            classNames.Host,
            this.state.visible ? classNames.Visible
              : this.state.size ? classNames.Hidden
                : undefined
          ].join(" ")
        }
        elevation={24}
        style={{
          left     : this.state.size ? "calc(50vw - " + this.state.size[0] + "px / 2)"
            : undefined,
          width    : this.state.size ? this.state.size[0] + "px"
            : undefined,
          height   : this.state.size ? this.state.size[1] + "px"
            : undefined,
          transform: (
            this.state.size && visible ? (
                "translateY("
                + (window.innerHeight / 2 - this.state.size[1] / 2)
                + "px)"
              )
              : "translateY(100vh)"
          ),
          ...style
        }}
        {...props}
      />
    )
  }
}
