import React, { Component } from 'react'
import loadable from '@loadable/component'
import { HashRouter, Router, Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import Provider from './Provider'
import styles from './index.scss'
import * as store from '@/store/index'
import PageLoading  from '@/components/common/PageLoading'
import Error from '@/components/common/Error'

const AppWrapper = ({ children }: {children?:React.ReactNode }) => <div className={styles.appWrapper}>{children}</div>

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory,store.routerStore)

const loadableOptions = { fallback: <PageLoading /> }
const Login = loadable(() => import(/* webapckChunkName:"Login" */'@/views/Login'),loadableOptions)
const Home = loadable(() => import(/*webpackChunkName:"Home" */'@/views/Home'),loadableOptions)

export default class App extends Component{
    render(){
        return (
            <Provider>
                <AppWrapper>
                    <Router history={history}>
                        <HashRouter>
                            <Switch>
                                <Route exact path="/login" component={ Login }></Route>
                                <Route path="/" component={ Home }></Route>
                                <Route component={ Error }></Route>
                            </Switch>
                        </HashRouter>
                    </Router>
                </AppWrapper>
            </Provider>
        )
    }
}