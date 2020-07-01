import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'


function PageLoading(){
    return (
        <div>
            <Spin 
             indicator={ <LoadingOutlined spin /> }>

            </Spin>
        </div>
    )
}

export default PageLoading