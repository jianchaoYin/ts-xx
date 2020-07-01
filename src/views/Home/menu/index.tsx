import React,{ Component } from 'react'
import { Menu } from 'antd'
import { menuList } from './data'
import { menu } from '../menu'
import { RootConsumer } from '@/components/container/shared/App/Provider'
import styles from './index.scss'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import { routerStore } from '@/store'

const { SubMenu } = Menu

interface IProp{
    routerStore: RouterStore
}

@observer
class ML extends Component<IProp>{

    @computed
    get loaclPath(){
        return this.props.routerStore.location.pathname
    }

    private goto({ key }:{ key: string }){
        const { history } = this.props.routerStore
        const selectMenu = menu.find( item => String(item.id) === key )
        if(selectMenu&&selectMenu.path!==this.loaclPath){
            history.push(selectMenu.path)
        }
    }   
    getList(menuTree: menuList[]){
        return menuTree.map( item => {
            if(item.children){
                return (
                    <SubMenu key={item.value} title={
                        <span>{item.label}</span>
                    }>
                        { this.getList(item.children) }
                    </SubMenu>
                )
            }

        return (<Menu.Item key={ item.value }>{ item.label }</Menu.Item>) 
        })
    }
    render() {
        return (
            <div className={styles.menuList}>
                <Menu defaultSelectedKeys={['01']} theme='dark' style={{ height:'100%' }} mode="inline"
                onClick={this.goto.bind(this) }>
                    { this.getList(menuList) }
                </Menu>   
            </div>
        )
    }
}

function MenuList(){
    return(
        <RootConsumer>
            { ({ routerStore }) => (
                <ML routerStore={routerStore} />
             ) } 
        </RootConsumer>
    )
}

export default MenuList