let Error    = require("echat/ui/view/Error")
let React    = require("react")
let Snackbar = require("react-material/ui/view/Snackbar")

let classNames = require("echat/ui/view/ErrorListener/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            errors: []
        })
    }

    render() {
        let {
                component = "div",
                Component = component,
                children,
                ...props
            }             = this.props;

        return (
            <Component
                className={classNames.Host}
            >
                {React.cloneElement(
                    children,
                    {
                        onError: e => this.setState({
                            errors: this.state.errors.concat({
                                error: e,
                                key  : Date.now()
                            })
                        })
                    }
                )}
                {this.state.errors.map(x =>
                    <Snackbar
                        key={x.key}
                        duration={3000}
                        onHidden={
                            () =>
                                this.setState({
                                    errors: this.state.errors.filter(y => y != x)
                                })
                        }
                        className={classNames.Snackbar}
                    >
                        <Error
                            error={x.error}
                        />
                    </Snackbar>
                )}
            </Component>
        )
    }
}