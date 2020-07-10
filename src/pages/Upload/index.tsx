import React from 'react'
import { observer } from 'mobx-react'
import FreeUpload from './FreeUpload'


function Uploader(){
    const size: number = 2 * 1024 * 1024 //控制切片大小为2M
    return (
        <div>
            <FreeUpload size={size} />
        </div>
    )
}

export default observer(Uploader)