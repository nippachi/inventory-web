let React        = require("react")
let ReactDOM     = require("react-dom")
let Shadow       = require("react-material/ui/effect/Shadow")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/ExpansionPanel/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            contentSize: undefined,
            labelWidth : undefined
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this)

        let contentRect = e.children[1].getBoundingClientRect()

        this.setState({
            contentSize: [
                contentRect.width,
                contentRect.height
            ],
            labelWidth: Array.from(e.parentElement.children)
                .map(x => x.children[0].children[0].getBoundingClientRect().width)
                .reduce((x, y) => Math.max(x, y))
        })
    }

    render() {
        let {
            children,
            className,
            disabled,
            hintText,
            labelText,
            location,
            selected,
            value,
            ...props
        } = this.props

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        disabled ? classNames.Disabled
                      :            undefined,
                        selected ? classNames.Selected
                      :            undefined
                    ].join(" ")
                }
                component="li"
                elevation="2"
                {...props}
            >
                <div>
                    <div
                        style={{
                            minWidth: this.state.labelWidth + "px"
                        }}
                    >
                        {labelText}
                    </div>
                    <div>
                        {
                            selected ? hintText
                          :            value
                        }
                    </div>
                    <MaterialIcon>
                        {disabled || (
                            selected ? "arrow_drop_up"
                          :            "arrow_drop_down"
                        )}
                    </MaterialIcon>
                </div>
                <div
                    children={(
                        selected               ? children
                      : this.state.contentSize ? undefined
                      :                          children
                    )}
                    style={{
                        height: !this.state.contentSize ? undefined
                              : selected                ? this.state.contentSize[1] + "px"
                              :                           "0",
                    }}
                />
            </Shadow>
        )
    }
}
