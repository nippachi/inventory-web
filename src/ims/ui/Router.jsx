let LoginPage                 = require("ims/ui/view/auth/LoginPage");
let HomePage                  = require("ims/ui/view/home/HomePage")
let AuthenticationManager     = require("ims/ui/wrapper/AuthenticationManager");
let MainContainer             = require("ims/ui/wrapper/MainContainer");
let React                     = require("react");
let {Router}                  = require("react-router");
let {Route}                   = require("react-router");
let {browserHistory}          = require("react-router");


let Root = props =>
        <AuthenticationManager
            {...props}
        />

module.exports = (props) =>
    <Router
        {... props}
        history={browserHistory}
    >
        <Route
            component={Root}
        >
            <Route
                component={MainContainer}
            >
                <Route
                    path="/"
                    component={HomePage}
                />
            </Route>
            <Route
                path="/login"
                component={LoginPage}
            />
        </Route>
    </Router>;
