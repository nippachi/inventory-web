let ErrorListener             = require("echat/ui/view/ErrorListener")
let LoginPage                 = require("echat/ui/view/auth/LoginPage");
let Chat                      = require("echat/ui/view/chat/ChatPage");
let DictionaryPage            = require("echat/ui/view/dictionary/DictionaryPage");
let OperatorPage              = require("echat/ui/view/operator/OperatorPage");
let TopPage                   = require("echat/ui/view/TopPage");
let ManagementPage            = require("echat/ui/view/management/ManagementPage");
let NotificationSettingPage   = require("echat/ui/view/setting/notificationSetting/NotificationSettingPage");
let AccountSettingPage        = require("echat/ui/view/setting/accountSetting/AccountSettingPage");
let WidgetSettingsPage        = require("echat/ui/view/setting/widgetSetting/WidgetSettingPage");
let CalendarSettingPage              = require("echat/ui/view/setting/calendarSetting/CalendarSettingPage");
let AuthenticationManager     = require("echat/ui/wrapper/AuthenticationManager");
let MainContainer             = require("echat/ui/wrapper/MainContainer");
let MonitoringSocketManager   = require("echat/ui/wrapper/MonitoringSocketManager");
let NotificationClientManager = require("echat/ui/wrapper/NotificationClientManager");
let HistoryPage               = require("echat/ui/view/history/HistoryPage");
let React                     = require("react");
let {Router}                  = require("react-router");
let {Route}                   = require("react-router");
let {browserHistory}          = require("react-router");


let Root = props =>
    <ErrorListener
        {...props}
    >
        <AuthenticationManager
            {...props}
        />
    </ErrorListener>;

let SocketManager = props =>
    <MonitoringSocketManager
        {...props}
    >
        <NotificationClientManager
            {...props}
        />
    </MonitoringSocketManager>;

module.exports = (props) =>
    <Router
        {... props}
        history={browserHistory}
    >
        <Route
            component={Root}
        >
            <Route
                component={SocketManager}
            >
                <Route
                    component={MainContainer}
                >
                    {/*<Route*/}
                    {/*path="/"*/}
                    {/*component={TopPage}*/}
                    {/*/>*/}
                    <Route
                        path="/"
                        component={Chat}
                    />
                    <Route
                        path="/chat"
                        component={Chat}
                    />
                    <Route
                        path="/dictionaries"
                        component={DictionaryPage}
                    />
                    <Route
                        path="/operator"
                        component={OperatorPage}
                    />
                    <Route
                        path="/management"
                        component={ManagementPage}
                    />
                    <Route
                        path="/setting/account"
                        component={AccountSettingPage}
                    />
                    <Route
                        path="/setting/widget"
                        component={WidgetSettingsPage}
                    />
                    <Route
                        path="/setting/notification"
                        component={NotificationSettingPage}
                    />
                    <Route
                        path="/setting/calendar"
                        component={CalendarSettingPage}
                    />
                    <Route
                        path="/history"
                        component={HistoryPage}
                    />
                </Route>
            </Route>
            <Route
                path="/login"
                component={LoginPage}
            />
        </Route>
    </Router>;
