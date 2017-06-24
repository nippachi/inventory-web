let React    = require("react");
let ReactDOM = require("react-dom");
let Ripple   = require("react-material/ui/effect/Ripple");

let classNames = require("react-material/ui/view/Slider/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            width      : 0,
            array      : [],
            index      : undefined,
            onMouseMove: undefined,
            onMouseUp  : undefined
        })
    }

    componentDidMount() {
        let {
                min          = 0,
                max          = 1000,
                step         = 1,
                onChange,
                defaultValue = min,
            }                = this.props;

        let array = [];
        for (let i = min; i <= max; i += step)
            array.push(i)

        let self = ReactDOM.findDOMNode(this);

        this.setState({
            array: array,
            index: array.indexOf(defaultValue),
            width: array.indexOf(defaultValue) / array.length - 1,
        });

        self.addEventListener(
            "mousedown", (e) => {
                let updateWidth = (e) => {
                    e.preventDefault();

                    let {
                            min          = 0,
                            max          = 1000,
                            step         = 1,
                            onChange,
                            defaultValue = min,
                            disabled     = false
                        }                = this.props;

                    if (!disabled) {
                        let self   = ReactDOM.findDOMNode(this);
                        let border = self.children[0];

                        let p     = (e.pageX - border.getBoundingClientRect().left ) / border.clientWidth;
                        let ratio = p > 0 ? p < 1 ? p : 1 : 0;
                        let index = Math.round(((max - min) / step) * ratio);
                        if (this.state.index != index) {
                            onChange && onChange(array[index]);

                            this.setState({
                                width: index / (array.length - 1),
                                index
                            });
                        }
                    }
                };
                updateWidth(e);
                this.setState({
                        onMouseMove: updateWidth,
                        onMouseUp  : () => {
                            document.body.removeEventListener("mousemove", this.state.onMouseMove, false);
                            document.body.removeEventListener("mouseup", this.state.onMouseUp, false);
                            document.body.removeEventListener("mouseleave", this.state.onMouseUp, false);
                        }
                    },
                    () => {
                        document.body.addEventListener("mousemove", this.state.onMouseMove, false);
                        document.body.addEventListener("mouseup", this.state.onMouseUp, false);
                        document.body.addEventListener("mouseleave", this.state.onMouseUp, false);
                    }
                );
            },
            false
        );
    }

    componentWillUnmount() {
        document.body.removeEventListener("mousemove", this.state.onMouseMove, false);
        document.body.removeEventListener("mouseup", this.state.onMouseUp, false);
    }

    render() {

        let {
                min          = 0,
                max          = 1000,
                step         = 1,
                onChange,
                defaultValue = min,
                dotIsView    = false,
                className,
                disabled     = false,
                ...props
            }                = this.props;

        return (
            <div
                {...props}
                className={[
                    className,
                    classNames.Host,
                    this.state.width == 0 && classNames.None,
                    disabled && classNames.Disabled
                ].join(" ")}
            >
                <div
                    className={classNames.Border}
                >
                    {dotIsView && this.state.array.map(() => <div className={classNames.Dot}/>)}
                </div>
                <div
                    className={classNames.Circle}
                    style={{
                        left: (this.state.width * 100) + "%"
                    }}
                />
                <div
                    className={classNames.LeftBorder}
                    style={{
                        width: (this.state.width * 100) + "%"
                    }}
                />
                <div
                    className={classNames.RippleCircle}
                    style={{
                        left: (this.state.width * 100) + "%"
                    }}
                />
            </div>
        )
    }
};
