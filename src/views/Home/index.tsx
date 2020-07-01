import React from 'react'
import { observer } from 'mobx-react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import styles from './index.scss'
import MenuList from './menu/index'
import { Layout } from 'antd'
import { menu, asyncComponents } from './menu'
import Error from '@/components/common/Error'

const {  Sider, Content } = Layout

function Home(){

    return (
        <div className={ styles.home }>
            <Layout style={{height:'100%'}}>
                <Sider width={140} style={{height:'100%'}}>     
                    <MenuList />
                </Sider>
                <Content className={styles.content}>
                    <Router>
                        <Switch>
                            {
                                menu.map( p =>
                                    <Route key={p.id} exact={p.exact} path={p.path} 
                                    component={ asyncComponents[p.component] }>
                                    </Route> )
                            }
                            <Route component={Error}></Route>
                        </Switch>
                    </Router>
                </Content>
            </Layout>
        </div>
    )
}

export default observer(Home)