import React, { Component } from 'react'
import axios from 'axios'

interface Uploader{
    size: number;
}

export default class FreeUploader extends Component<Uploader>{

    private size: number = this.props.size

    private formData: FormData = new FormData() 

    //上传文件
    fileChange( e ){
        //取得文件
        const [ file ] = e.target.files
        this.formData.append( 'file',file )

        axios.post('http://192.168.1.14:8080/upload/slice', this.formData, { headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }}).then(res => {
            console.log(res)
        }).catch()
    }
    render(){
        return (
            <div>
                <input type="file" onChange={ this.fileChange.bind(this) } />
            </div>
        )
    }
}
