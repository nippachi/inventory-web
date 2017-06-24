let React         = require("react");
let Button        = require("react-material/ui/view/Button");
let Popup         = require("react-material/ui/view/Popup");
let Shadow        = require("react-material/ui/effect/Shadow");
let IconToggle    = require("react-material/ui/view/IconToggle");
let Avatar        = require("echat/ui/view/common/Avatar");
let HeaderStatus  = require("echat/ui/view/header/HeaderStatus");
let Link          = require("echat/ui/view/common/Link");
let MaterialIcon  = require("react-material/ui/view/MaterialIcon");
let OperatorState = require("echat/ui/view/common/OperatorState");
let Option        = require("echat/ui/view/common/select/Option");
let SelectBox     = require("echat/ui/view/common/select/SelectBox");
let SelectButton  = require("echat/ui/view/common/select/Button");

let classNames = require("echat/ui/view/header/Header/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState(
            {
                headerPopupIsVisible    : false,
                statusSelectBoxIsVisible: false,
            })
    }

    componentDidMount() {
    }

    render() {

        let {
                onNavigationButtonClick,
                operateApi,
                operator,
                onLogOut
            } = this.props;

        return (
            <Shadow
                elevation={5}
            >
                <header
                    className={classNames.Header}
                >
                    <div
                        className={classNames.LeftSide}
                    >
                        <IconToggle
                            className={classNames.IconContainer}
                            onClick={() => {
                                onNavigationButtonClick && onNavigationButtonClick()
                            }}
                        >
                            <MaterialIcon
                                className={classNames.DehazeIcon}
                            >
                                {"dehaze"}
                            </MaterialIcon>
                        </IconToggle>
                        <div
                            className={classNames.AppBarLogo}
                        />
                    </div>
                    <div
                        className={classNames.RightSide}
                    >
                        {/*<HeaderButton*/}
                        {/*href=""*/}
                        {/*icon={'\uF0F3'}*/}
                        {/*>*/}
                        {/*お知らせ*/}
                        {/*</HeaderButton>*/}
                        <HeaderStatus
                            onClick={() => {
                                this.setState(
                                    {
                                        headerPopupIsVisible: true
                                    })
                            }}
                            operator={operator}
                        />
                        <Popup
                            visible={this.state.headerPopupIsVisible}
                            onCancel={(e) => this.setState({headerPopupIsVisible: false})}
                            className={classNames.Popup}
                        >
                            <div
                                className={classNames.Profile}
                            >
                                <Avatar
                                    component={Link}
                                    to="/operator?tab_index=0"
                                    editable={true}
                                    src={operator && operator.imageFilePath}
                                />
                                <div>
                                    <span
                                        className={classNames.ProfileName}
                                    >
                                        {operator && operator.name}
                                    </span>
                                    <span>
                                        {operator && operator.displayName}
                                     </span>
                                    <span>
                                        {operator && operator.email}
                                     </span>
                                    <div
                                        style={{
                                            position: "relative",
                                            maxWidth: "max-content"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display   : "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <SelectButton
                                                onClick={() => {
                                                    this.setState({statusSelectBoxIsVisible: true})
                                                }}
                                            >
                                                <OperatorState
                                                    operatorState={operator && operator.operatorState}
                                                />
                                            </SelectButton>
                                            <Button
                                                onClick={() => {
                                                    onLogOut()
                                                }}
                                            >
                                                ログアウト
                                            </Button>
                                        </div>
                                        <SelectBox
                                            visible={this.state.statusSelectBoxIsVisible}
                                            onCancel={(e) =>
                                                this.setState(
                                                    {
                                                        statusSelectBoxIsVisible: false
                                                    })
                                            }
                                            className={classNames.SelectBox}
                                        >
                                            <Option
                                                className={classNames.StateSelectItem}
                                                onClick={async() => {
                                                    operateApi(() => operator.update({operatorState: 1}))
                                                }}
                                            >
                                                受付中
                                            </Option>
                                            <Option
                                                className={classNames.StateSelectItem}
                                                onClick={async() => {
                                                    operateApi(() => operator.update({operatorState: 2}))
                                                }}
                                            >
                                                退席中
                                            </Option>
                                        </SelectBox>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </div>
                </header>
            </Shadow>);
    }
};