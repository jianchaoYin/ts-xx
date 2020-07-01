import React from 'react'
import ReactDom from 'react-dom'
import './index.scss'
import App from '@/components/container/shared/App'
import sw from './sw'

import { configure } from 'mobx'  //引入mobx中的configure函数

configure({ enforceActions: true })  //全局注册mobx中的confgure为true来保证state必须通过action改变
sw()

const render = (Component: React.ComponentType)=>{
    ReactDom.render(<Component/>,document.getElementById('app'))
}

render(App)