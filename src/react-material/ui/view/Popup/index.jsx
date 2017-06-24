let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Popup/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onClick: e => {
                if (!ReactDOM.findDOMNode(this).contains(e.target))
                    this.props.onCancel && this.props.onCancel()
            },
            size: undefined
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

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

  componentWillReceiveProps({
    visible
  }) {
    if (visible != this.props.visible) {
      if (visible) {
        let element = ReactDOM.findDOMNode(this);
        element.style.width = "auto";
        element.style.height = "auto";

        let rect = element.getBoundingClientRect();

        element.style.width = 0;
        element.style.height = 0;
        element.getBoundingClientRect();

        this.setState({
          size: [
            rect.width,
            rect.height
          ]
        });

        setTimeout(
          () => window.addEventListener("click", this.state.onClick, false),
          1
        )
      } else {
        window.removeEventListener("click", this.state.onClick, false)
      }
    }
  }

    componentWillUnmount() {
        if (this.props.visible)
            window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        let {
            className,
            elevation = 8,
            onCancel,
            style,
            visible,
            ...props
        } = this.props

        return (
            <Shadow
                {...props}
                className={
                    [
                        className,
                        classNames.Host,
                        visible         ? classNames.Visible
                      : this.state.size ? classNames.Hidden
                      :                   undefined
                    ].join(" ")
                }
                elevation={elevation}
                style={{
                    width : !this.state.size ? undefined
                          : visible          ? this.state.size[0] + "px"
                          :                    undefined,
                    height: !this.state.size ? undefined
                          : visible          ? this.state.size[1] + "px"
                          :                    undefined,
                    ...style
                }}
            />
        )
    }
}
