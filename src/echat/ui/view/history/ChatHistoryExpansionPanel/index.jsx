let React        = require("react")
let ReactDOM     = require("react-dom")
let Shadow       = require("react-material/ui/effect/Shadow")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("echat/ui/view/history/ChatHistoryExpansionPanel/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            contentSize: undefined,
            labelWidth : undefined
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this);

        let contentRect = e.children[1].getBoundingClientRect();

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
            visitor,
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
                elevation={selected ? "0" : "2"}
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
                    <div
                        className={classNames.VisitorInformation}
                    >
                        <div>ドメイン: {visitor.locationHost}</div>
                        <div>最終ページ: {visitor.locationPathname}</div>
                        {/*<div>発言数: {visitor.messages.length}</div>*/}
                        {/*<div>訪問数: {visitor.connect.length}</div>*/}
                    </div>
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
