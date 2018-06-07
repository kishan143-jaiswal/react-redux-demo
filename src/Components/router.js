import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../History'
import Login from './loginform'
import Registration from '../Components/registeration'
import UserList from '../Components/userlist'
import EditUser from '../Components/edituser'

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/userlist" component={UserList} />
                    <Route exact path="/edituser" component={EditUser} />
                   
                </div>
            </Router>
        )
    }
}

export default Routers;