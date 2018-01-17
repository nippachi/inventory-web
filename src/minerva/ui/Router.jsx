import LoginPage                 from "minerva/ui/view/auth/LoginPage"
let HomePage                  = require("minerva/ui/view/home/HomePage")
import AuthenticationManager     from "minerva/ui/wrapper/AuthenticationManager"
import MainContainer             from "minerva/ui/wrapper/MainContainer"
import React                     from "react"
import {Router}                  from "react-router"
import {Route}                   from "react-router"
import {browserHistory}          from "react-router"


let Root = props =>
        <AuthenticationManager
            {...props}
        />

export default (props) =>
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
