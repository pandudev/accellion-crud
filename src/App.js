import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Chart from './pages/chart'
import User from './pages/User'

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path='/crud' exact component={User}/>
                <Route path='/chart' exact component={Chart}/>
                <Redirect to='/chart'/>
            </Switch>
        </Router>
    )
}

export default App
