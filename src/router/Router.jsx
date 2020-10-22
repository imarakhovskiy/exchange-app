import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Main, Success, Submit } from 'pages/Exchange'
import {
  MAIN_EXCHANGE_ROUTE,
  EXCHANGE_SUBMIT_ROUTE,
  EXCHANGE_SUCCESS_ROUTE,
} from './constants'

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => <Redirect to={MAIN_EXCHANGE_ROUTE} />} />
      <Route exact path={MAIN_EXCHANGE_ROUTE}>
        <Main />
      </Route>
      <Route exact path={EXCHANGE_SUBMIT_ROUTE}>
        <Submit />
      </Route>
      <Route exact path={EXCHANGE_SUCCESS_ROUTE}>
        <Success />
      </Route>
    </Switch>
  </Router>
)
