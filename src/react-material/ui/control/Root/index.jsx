let React                    = require("react");
let {render}                 = require("react-dom");
let {unmountComponentAtNode} = require("react-dom");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState(
            {
                element: undefined
            })
    }

    componentDidMount() {
        let element = document.createElement("div");
        document.body.appendChild(element);

        this.setState(
            {
                element: element
            })
    }

    componentWillUnmount() {
        if (this.state.element) {
            unmountComponentAtNode(this.state.element);
            document.body.removeChild(this.state.element)
        }
    }

    render() {
        let {
                component = "div",
                Component = component,
                ...props
            }             = this.props;

        this.state.element && setTimeout(
            () => render(
                <Component
                    {...props}
                />,
                this.state.element
            ),
            0
        );

        return null
    }
};