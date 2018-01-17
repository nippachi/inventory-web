import React             from "react"
import ReactDOM          from "react-dom"

import classNames from "minerva/ui/wrapper/MainContainer/classNames"

export default class extends React.Component {
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
