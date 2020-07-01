import React, { useState } from 'react'
import { observer } from 'mobx-react'  //包裹组件转为响应式组件
import styles from './index.scss'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { formCheck, Layout, tailLayout, userInfo } from './data'
import { routerStore } from '@/store/index'

const FormItem = Form.Item

function Login(){
    // const {  } from 
    const [ loading, setLoading ] = useState(false)

    async function submit(values){
        setLoading(true)
        console.log(values)
        for(let item of userInfo){
            if(values.username == item.username&&values.password == item.password){
                routerStore.replace('/')
                setLoading(false)
                return
            }
        }
        message.error('用户名或密码错误!')
        setLoading(false)
    }

    return (
        <div className={ styles.login }>
            <div className={ styles.box }>
                <h3>登录</h3>
                <Form {...Layout} onFinish={submit}>
                    <FormItem label="用户名" name="username" rules={formCheck.username}>
                        <Input />
                    </FormItem>
                    <FormItem label="密码" name="password" rules={formCheck.password}>
                        <Input.Password /> 
                    </FormItem>
                    <FormItem name="remember" valuePropName="checked" {...tailLayout.remember}>
                        <Checkbox>记住密码</Checkbox>
                    </FormItem>
                    <FormItem {...tailLayout.button}>
                        <Button type="primary" htmlType="submit" loading={loading}>登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    )
}

export default observer(Login)