let React    = require("react");
let ReactDOM = require("react-dom");

let classNames = require("react-material/ui/view/IntervalSlider/classNames");

let getApproximationIndex = (array, n) => {
    let index = -1;
    let diff  = [];
    for (let i = 0; i < array.length; i++) {
        diff[i] = Math.abs(n - array[i]);
        index   = (diff[index] < diff[i]) ? index : i;
    }
    return index
};

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            lowWidth    : 0,
            highWidth   : 1,
            array       : [],
            onMouseMove : undefined,
            onMouseUp   : undefined,
            lowIndex    : 0,
            highIndex   : 1000,
            hoverCircle : undefined,
            selectCircle: undefined
        })
    }

    componentDidMount() {
        let {
                min           = 0,
                max           = 1000,
                step          = 1,
                onChange,
                defaultLow    = min,
                defaultHigh   = max,
            }                 = this.props;

        let array = [];
        for (let i = min; i <= max; i += step)
            array.push(i)

        let self = ReactDOM.findDOMNode(this);

        let lowIndex  = getApproximationIndex(array, defaultLow);
        let highIndex = getApproximationIndex(array, defaultHigh);

        this.setState({
            array    : array,
            lowIndex,
            highIndex,
            lowWidth : lowIndex / (array.length - 1),
            highWidth: highIndex / (array.length - 1),
        });

        self.addEventListener(
            "mouseover",
            (e) => {
                let self               = ReactDOM.findDOMNode(this);
                let intervalBorder     = self.children[3];
                let borderLeft         = self.children[0].getBoundingClientRect().left;
                let intervalBorderLeft = intervalBorder.getBoundingClientRect().left;

                !this.state.selectCircle && this.setState({
                    hoverCircle: e.pageX - borderLeft > intervalBorderLeft + intervalBorder.clientWidth / 2 - borderLeft ? "high" : "low"
                });
            },
            false
        );

        self.addEventListener(
            "mouseleave",
            (e) => this.setState({hoverCircle: undefined}),
            false
        );

        self.addEventListener(
            "mousedown",
            e => {
                let self               = ReactDOM.findDOMNode(this);
                let border             = self.children[0];
                let intervalBorder     = self.children[3];
                let borderLeft         = self.children[0].getBoundingClientRect().left;
                let intervalBorderLeft = intervalBorder.getBoundingClientRect().left;

                let selectCircle = e.pageX - borderLeft > intervalBorderLeft + intervalBorder.clientWidth / 2 - borderLeft ? "high" : "low"

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
                        let self           = ReactDOM.findDOMNode(this);
                        let border         = self.children[0];
                        let intervalBorder = self.children[3];

                        let p     = ( e.pageX - border.getBoundingClientRect().left ) / border.clientWidth;
                        let ratio = p > 0 ? p < 1 ? p : 1 : 0;
                        let index = Math.round(((max - min) / step) * ratio);

                        if (this.state.selectCircle == "low" && index < this.state.highIndex && this.state.lowIndex != index) {
                            onChange && onChange(array[index], array[this.state.highIndex]);
                            this.setState({
                                lowWidth: index / (array.length - 1),
                                lowIndex: index,

                            });
                        } else if (this.state.selectCircle == "high" && index > this.state.lowIndex && this.state.highIndex != index) {
                            onChange && onChange(array[this.state.lowIndex], array[index]);
                            this.setState({
                                highWidth: index / (array.length - 1),
                                highIndex: index,

                            });
                        }
                    }
                };

                updateWidth(e);

                this.setState({
                        selectCircle,
                        onMouseMove: updateWidth,
                        onMouseUp  : () => {
                            this.setState({
                                selectCircle: undefined
                            });
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

    componentWillReceiveProps(props) {
        let {
                min           = 0,
                max           = 1000,
                step          = 1,
                onChange,
                defaultLow    = min,
                defaultHigh   = max,
            }                 = props;

        let array = [];
        for (let i = min; i <= max; i += step)
            array.push(i)

        let lowIndex  = getApproximationIndex(array, defaultLow);
        let highIndex = getApproximationIndex(array, defaultHigh);

        this.setState({
            array    : array,
            lowIndex,
            highIndex,
            lowWidth : lowIndex / (array.length - 1),
            highWidth: highIndex / (array.length - 1),
        });
    }

    render() {

        let {
                min               = 0,
                max               = 1000,
                step              = 1,
                defaultLow        = min,
                defaultHigh       = max,
                onChange,
                dotIsView         = false,
                className,
                disabled          = false,
                lowTitle          = "",
                highTitle         = "",
                ...props
            }                     = this.props;

        return (
            <div
                {...props}
                className={[
                    className,
                    classNames.Host,
                    disabled && classNames.Disabled
                ].join(" ")}
            >
                <div
                    className={classNames.Border}
                >
                    {dotIsView && this.state.array.map((x) => <div key={x} className={classNames.Dot}/>)}
                </div>
                <div
                    className={[
                        classNames.Circle,
                        this.state.hoverCircle == "low" && classNames.CircleHover,
                        this.state.selectCircle == "low" && classNames.CircleSelect
                    ].join(" ")}
                    style={{
                        left: (this.state.lowWidth * 100) + "%"
                    }}
                    title={lowTitle}
                />
                <div
                    className={[
                        classNames.Circle,
                        this.state.hoverCircle == "high" && classNames.CircleHover,
                        this.state.selectCircle == "high" && classNames.CircleSelect
                    ].join(" ")}
                    style={{
                        left: (this.state.highWidth * 100) + "%"
                    }}
                    title={highTitle}
                />
                <div
                    className={classNames.IntervalBorder}
                    style={{
                        left : (this.state.lowWidth * 100) + "%",
                        width: ((this.state.highWidth - this.state.lowWidth) * 100) + "%"
                    }}
                />
                <div
                    className={[
                        classNames.RippleCircle,
                        this.state.hoverCircle == "low" && classNames.CircleHover,
                        this.state.selectCircle == "low" && classNames.CircleSelect
                    ].join(" ")}
                    style={{
                        left: (this.state.lowWidth * 100) + "%"
                    }}
                />
                <div
                    className={[
                        classNames.RippleCircle,
                        this.state.hoverCircle == "high" && classNames.CircleHover,
                        this.state.selectCircle == "high" && classNames.CircleSelect
                    ].join(" ")}
                    style={{
                        left: (this.state.highWidth * 100) + "%"
                    }}
                />
            </div>
        )
    }
};