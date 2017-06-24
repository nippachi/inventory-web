let Link         = require("echat/ui/view/common/Link");
let MaterialIcon = require("react-material/ui/view/MaterialIcon");
let List         = require("echat/ui/view/common/list/List");
let ListItem     = require("echat/ui/view/common/list/ListItem");
let React        = require("react");
let Button       = require("react-material/ui/view/Button");

const classNames = require("echat/ui/view/NavigationBar/classNames");

const styles = {
    unSelected    : {
        color          : "rgb(117, 117, 117)",
        borderLeftColor: "rgba(0,0,0,0)"
    },
    selected      : {
        fontWeight     : "bold",
        borderLeftColor: "#0078d7"
    },
    unSelectedIcon: {
        color: "#757575"
    },
    selectedIcon  : {
        color: "#4285f4"
    },
    selectedFont  : {
        color: "#0099FF"
    },
    unSelectedFont: {
        color: "black"
    }
};

let items = [
    {
        icon: "forum",
        path: "/chat",
        text: "チャット"
    },
    {
        icon: "assignment",
        path: "/dictionaries",
        text: "定型文"
    },
    /*
     {
     icon: "\uf02c",
     path: "/tag",
     text: "タグ"
     },
     {
     icon: "\uf0a1",
     path: "/trigger",
     text: "自動対応"
     },*/
    {
        icon: "account_circle",
        path: "/operator",
        text: "オペレーター"
    },
    {
        icon: "supervisor_account",
        path: "/management",
        text: "管理"
    },
    {
        icon : "settings",
        items: [
            {
                path: "/setting/widget",
                text: "ウィジェット"
            },
            {
                path: "/setting/account",
                text: "アカウント"
            },
            {
                path:"/setting/calendar",
                text: "営業時間"
            },
            {
                path:"/setting/notification",
                text: "通知"
            },
        ],
        text : "設定"
    }
];

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({selectedIndexes: []})
    }

    render() {
        let {
                location
            } = this.props;

        let toListItem = ({
            icon,
            items,
            path,
            index,
            dimension,
            text
        }) =>
            <ListItem
                className={classNames.NavigationBarListItem}
                key={index}
                list={items && (
                    <List
                        className={
                            this.state.selectedIndexes.includes(index) ? classNames.show
                                : classNames.hidden
                        }
                        style={
                            this.state.selectedIndexes.includes(index) ? {height: 52 * items.length + "px"}
                                : {height: "0"}
                        }
                    >
                        {Array.from(items.entries()).map(([i, v]) => toListItem({
                            index: index + i,
                            ...v
                        }))
                        }
                    </List>
                )}
            >
                <Link
                    className={classNames.NavigationBarLink}
                    to={path}
                    style={
                        new RegExp("^" + path).test(location.pathname) ? styles.selected
                            : styles.unSelected
                    }
                    onClick={items && ((e) => {
                        this.setState({
                            selectedIndexes: this.state.selectedIndexes.includes(index)
                                ? this.state.selectedIndexes.filter((x) => x != index)
                                : this.state.selectedIndexes.concat(index)
                        })
                    })}
                >
                    <MaterialIcon

                            className={classNames.NavigationBarIcon}
                        style={
                            new RegExp("^" + path).test(location.pathname) ? styles.selectedIcon
                                : styles.unSelectedIcon
                        }
                    >
                        {icon}
                    </MaterialIcon>
                    <span
                        className={classNames.NavigationBarText}
                        style={
                            new RegExp("^" + path).test(location.pathname) ? styles.selectedFont
                                : styles.unSelectedFont
                        }
                    >
                        {text}
                    </span>
                    {items && (
                        <MaterialIcon
                            className={classNames.NavigationBarIcon}
                        >
                            {"keyboard_arrow_down"}
                        </MaterialIcon>
                    )}
                </Link>
            </ListItem>;

        return (
            <nav
                className={classNames.NavigationBar + " " + this.props.className}
            >
                <div
                    className={classNames.TopSideList}
                >
                    <List
                        className={classNames.NavigationBarList}
                        value={location.pathname}
                    >
                        {Array.from(items.entries()).map(
                            ([i, v]) => toListItem(
                                {
                                    index: "" + i,
                                    ...v
                                }))}
                    </List>
                </div>
                <span className={classNames.Border}/>
                <List
                    className={classNames.BottomSideList}
                >
                    <ListItem
                        className={classNames.NavigationBarListItem}
                    >
                        <Link
                            className={classNames.NavigationBarLink}
                            to={"/history"}
                        >
                            <MaterialIcon
                                className={classNames.NavigationBarIcon}
                            >
                                {"settings_backup_restore"}
                            </MaterialIcon>
                            <span
                                className={classNames.NavigationBarText}
                            >
                                履歴
                            </span>
                        </Link>
                    </ListItem>
                    {/*<ListItem*/}
                    {/*className={classNames.NavigationBarListItem}*/}
                    {/*>*/}
                    {/*<Link*/}
                    {/*className={classNames.NavigationBarLink}*/}
                    {/*>*/}
                    {/*<FontAwesomeIcon*/}
                    {/*icon={"\uF080"}*/}
                    {/*className={classNames.NavigationBarIcon}*/}
                    {/*/>*/}
                    {/*<span*/}
                    {/*className={classNames.NavigationBarText}*/}
                    {/*>*/}
                    {/*レポート*/}
                    {/*</span>*/}
                    {/*</Link>*/}
                    {/*</ListItem>*/}
                </List>
            </nav>
        )
    }
};
