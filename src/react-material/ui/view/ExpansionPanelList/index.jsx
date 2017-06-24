let React = require("react")
let List  = require("react-material/ui/view/List")

module.exports = ({
    children,
    onSelect,
    selectedIndex,
    ...props
}) =>
    <List
        {...props}
    >
        {
            Array.from(React.Children.toArray(children).entries()).map(([i, x]) => 
                React.cloneElement(
                    x,
                    {
                        onClick : e => {
                            x.props.onClick && x.props.onClick(e)

                            if (onSelect && e.currentTarget.children[0].contains(e.target))
                                onSelect({
                                    index: selectedIndex === i ? undefined
                                         :                       i
                                })
                        },
                        selected: i === selectedIndex && !x.props.disabled
                    }
                )
            )
        }
    </List>
