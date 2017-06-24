let React = require("react")
let List  = require("react-material/ui/view/List")
let match = require("react-material/util/match")

let classNames = require("react-material/ui/view/TabBar/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            left : -1,
            width: 0
        })
    }

    render() {
        let {
            children,
            className,
            location,
            selectedIndex = Math.max(
                0,
                React.Children.toArray(children).findIndex(x => match({
                    location: location,
                    locationDescriptor: x.props.to
                }))
            ),
            ...props
        } = this.props

        return (
            <div
                {...props}
                className={[className, classNames.Host].join(" ")}
                ref={x => {
                    if (x && selectedIndex >= 0) {
                        let parentRect = x.getBoundingClientRect()
                        let rect = x
                            .children[0]
                            .children[selectedIndex]
                            .getBoundingClientRect()

                        if ((rect.left - parentRect.left) != this.state.left) {
                            this.setState({
                                left : rect.left - parentRect.left,
                                width: rect.width
                            })
                        }
                    }
                }}
            >
                <List>
                    {Array.from(React.Children.toArray(children).entries()).map(([i, x]) =>
                        React.cloneElement(
                            x,
                            {
                                selected: i == selectedIndex
                            }
                        )
                    )}
                </List>
                <div
                    className={classNames.Indicator}
                    style={{
                        left : this.state.left  + "px",
                        width: this.state.width + "px"
                    }}
                />
            </div>
        )
    }
}
