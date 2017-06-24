let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/NavigationDrawer/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            size: undefined
        })
    }

    componentDidMount() {
        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

    render() {
        let {
            className,
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
                        visible ? classNames.Visible
                      :           classNames.Hidden
                    ].join(" ")
                }
                component={"nav"}
                position="right"
                style={{
                    marginLeft: visible         ? 0
                              : this.state.size ? "-" + this.state.size[0] + "px"
                              :                   undefined,
                    ...style
                }}
            />
        )
    }
}
