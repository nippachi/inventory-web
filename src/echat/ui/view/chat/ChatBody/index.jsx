let React           = require("react");
let VisitorList     = require("echat/ui/view/chat/VisitorList");
let VisitorListItem = require("echat/ui/view/chat/VisitorListItem");


const classNames = require("echat/ui/view/chat/ChatBody/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            sortColumn: "messageCount",
            isAsc     : false,
        })
    }

    componentDidMount() {
    }


    render() {
        let {
                joinVisitor,
                visitors,
                selectedVisitorIds = [],
                ...props
            }                      = this.props;

        switch (this.state.sortColumn) {
            case "visitorId"   : visitors.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
                break;
            case "visitorCount": visitors.sort((a, b) => a.connect.length < b.connect.length ? -1 :a.connect.length > b.connect.length ? 1 : 0);
                break;
            case "messageCount": visitors.sort((a, b) => a.messages.length < b.messages.length ? -1:a.messages.length > b.messages.length ? 1:0);
                break;
        }

        !this.state.isAsc && visitors.reverse();

        return (
            <VisitorList
                className={classNames.Host}
                onVisitorIdColumnClick={() =>
                    this.setState({
                        sortColumn: "visitorId",
                        isAsc     : !this.state.isAsc
                    })}
                onVisitorCountColumnClick={()=>
                    this.setState({
                        sortColumn: "visitorCount",
                        isAsc     : !this.state.isAsc
                    })
                }
                onMessageCountColumnClick={()=>
                    this.setState({
                        sortColumn: "messageCount",
                        isAsc     : !this.state.isAsc
                    })
                }
                isAsc={this.state.isAsc}
                sortColumn={this.state.sortColumn}
                {...props}
            >
                {visitors && visitors.map(
                    (x) =>
                        <VisitorListItem
                            visitor={x}
                            messages={x.messages}
                            key={x.id}
                            onClick={() => joinVisitor && joinVisitor(x)}
                            selected={selectedVisitorIds.includes(x.id)}
                        />
                )}
            </VisitorList>
        )
    }
};


