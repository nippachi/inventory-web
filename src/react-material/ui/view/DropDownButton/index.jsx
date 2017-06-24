let React = require("react")
let Menu  = require("react-material/ui/view/Menu")

let classNames = require("react-material/ui/view/DropDownButton/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            children
        } = this.props

        this.setState({
            opened       : false,
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected)
        })
    }

    componentWillReceiveProps({
        children
    }) {
        this.setState({
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected)
        })
    }

    render() {
        let {
            children,
            className,
            onChange,
            ...props
        } = this.props

        return (
            <div
                {...props}
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.opened ? classNames.Opend
                      :                     classNames.Closed
                    ].join(" ")
                }
            >
                <div
                    onClick={(e) => {
                        this.setState({
                            opened: true
                        })
                    }}
                >
                    {React.Children.toArray(children)[this.state.selectedIndex].props.children}
                </div>
                <Menu
                    onCancel={() => {
                        this.setState({
                            opened: false
                        })
                    }}
                    visible={this.state.opened}
                >
                    {React.Children.toArray(children).map(x =>
                        React.cloneElement(
                            x,
                            {
                                onClick: (e) => {
                                    x.props.onClick && x.props.onClick()

                                    this.setState({
                                        opened: false
                                    })

                                    if (!x.props.selected)
                                        onChange && onChange()
                                }
                            }
                        )
                    )}
                </Menu>
            </div>
        )
    }
}
