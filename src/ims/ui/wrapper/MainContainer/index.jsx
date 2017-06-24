let React             = require("react");
let ReactDOM          = require("react-dom");

let classNames = require("ims/ui/wrapper/MainContainer/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
        })
    }

    componentDidMount() {
    }

    render() {
        let {
                store,
                children,
                location,
                onLogOut
            } = this.props;

        return (
            <div
                className={classNames.Host}
            >
                    <main
                        className={classNames.Main}
                    >
                        {React.cloneElement(
                            children, {
                            }
                        )}
                    </main>
            </div>
        )
    }
};
