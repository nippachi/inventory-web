let React                     = require("react");
let ChatHistoryExpansionPanel = require("echat/ui/view/history/ChatHistoryExpansionPanel");
let ChatHistoryInformation    = require("echat/ui/view/history/ChatHistoryInformation");
let ExpansionPanelList        = require("react-material/ui/view/ExpansionPanelList");
let Visitor                   = require("echat-common/model/Visitor");
let MaterialIcon              = require("react-material/ui/view/MaterialIcon");
let OperatorMessage           = require("echat/ui/view/widget/OperatorMessage");
let VisitorMessage            = require("echat/ui/view/widget/VisitorMessage");
let Shadow                      = require("react-material/ui/effect/Shadow");

const classNames = require("echat/ui/view/history/ChatHistoryBody/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            visitors                : [],
            selectedVisitor         : undefined,
            selectedIndex           : undefined,
            editImageDialogIsVisible: false
        })
    }

    componentDidMount() {
        (async() => {
            this.setState({
                visitors: await this.props.operateApi(
                    a => Visitor.find({
                        ...a,
                    })
                )
            })
        })()
    }


    componentDidUpdate() {
        let content = this.refs.content;
        if (content)
            content.children[0].scrollTop = content.children[0].scrollHeight;
    }

    render() {
        let {
                operateApi,
                ...props
            } = this.props;

        return (
            <div
                {...props}
                className={classNames.Host}
            >
                <ExpansionPanelList
                    selectedIndex={this.state.selectedIndex}
                    onSelect={({index}) => this.setState({selectedIndex: index})}
                >
                    {this.state.visitors && this.state.visitors.map(x =>
                        <ChatHistoryExpansionPanel
                            key={x.id}
                            labelText={x.name}
                            visitor={x}
                            onClick={async() => {
                                this.setState({
                                    selectedVisitor: await this.props.operateApi(
                                        a => Visitor.findById({
                                            ...a,
                                            id: x.id
                                        })
                                    )
                                })
                            }}
                        >
                            <div
                                className={classNames.Content}
                                ref="content"
                            >
                                <Shadow
                                    elevation="4"
                                >
                                    {
                                        this.state.selectedVisitor && this.state.selectedVisitor.messages.length ? this.state.selectedVisitor.messages.map(
                                                (y) => !y.operatorId ?
                                                    <VisitorMessage
                                                        key={y.id}
                                                        word={y.message}
                                                        timestamp={y.createdDate}
                                                        balloonColor="#DDD"
                                                        messageColor="Black"
                                                    /> :
                                                    <OperatorMessage
                                                        key={y.id}
                                                        word={y.message}
                                                        timestamp={y.createdDate}
                                                        balloonColor="#DDD"
                                                        messageColor="Black"
                                                    />
                                            )
                                            : <div
                                                className={classNames.NoneMessage}
                                            >
                                                <MaterialIcon >chat_bubble_outline</MaterialIcon>
                                                <div>会話記録はありません。</div>
                                            </div>
                                    }
                                </Shadow>
                                <Shadow
                                    elevation="4"
                                >
                                    <ChatHistoryInformation
                                        visitor={x}
                                    />
                                </Shadow>
                            </div>
                        </ChatHistoryExpansionPanel>
                    )}
                </ExpansionPanelList>
            </div>
        )
    }
};