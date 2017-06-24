let React = require("react");

let classNames = require("react-material/ui/effect/Ripple/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            ripples: []
        })
    }

    render() {
        let {
            children,
            className,
            component = "div",
            Component = component,
            fixed,
            onClick,
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                className={[className, classNames.Host].join(" ")}
                onClick={e => {
                    onClick && onClick(e);
                    
                    let rect = e.currentTarget.getBoundingClientRect();

                    if (fixed) {
                        let radius = Math.min(rect.width, rect.height) / 2;

                        this.setState({
                            ripples: this.state.ripples.concat({
                                id      : e.timeStamp,
                                opacity : 1,
                                position: [
                                    rect.width  / 2 - radius,
                                    rect.height / 2 - radius
                                ],
                                radius  : radius
                            })
                        })
                    } else {
                        let radius = Math.max(rect.width, rect.height);

                        this.setState({
                            ripples: this.state.ripples.concat({
                                id      : e.timeStamp,
                                opacity : 1,
                                position: [
                                    e.clientX - rect.left - radius,
                                    e.clientY - rect.top  - radius
                                ],
                                radius  : radius
                            })
                        })
                    }
                }}
            >
                {children}
                {this.state.ripples.map(({id, position, opacity, radius}) =>
                    <span
                        className={classNames.Ripple}
                        key={id}
                        onAnimationEnd={() => {
                            this.setState({
                                ripples: this.state.ripples.filter(x => x.id != id)
                            })
                        }}
                        style={{
                            left  : position[0] + "px",
                            top   : position[1] + "px",
                            width : radius * 2  + "px",
                            height: radius * 2  + "px"
                        }}
                    />
                )}
            </Component>
        )
    }
};
