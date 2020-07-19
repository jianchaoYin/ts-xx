import React from 'react'
import { ComponentExt } from '@/utils/reactExt'

interface Uploader{
    size: number;
}

export default class FreeUploader extends ComponentExt<Uploader>{

    private size: number = this.props.size

    //创造切片
    createFileSlice(file: File){
        const files: Blob[] = []
        let index: number = 0
        while( index < file.size ){
            files.push(file.slice(index,index+this.size))
            index+= this.size
        }
        return files
    }

    //上传文件
    async fileChange( e ){
        //取得文件
        const [ file ] = e.target.files
        //取得切片
        const files = this.createFileSlice(file)
        //封装切片
        const fileRequest =  files.map((item: Blob,index: number) => {
            const fm = new FormData()
            fm.append('chunk',item)
            fm.append('index',String(index))
            fm.append('name',file.name)
            fm.append('size',file.size)
            fm.append('uuid','test')
            return { fm }
        }).map(({ fm })=>{
            return new Promise(async(resolve) =>{
                const res = await this.api.upload.uploadFile(fm)
                resolve(res)
            })
        })
        //上传切片
        await Promise.all(fileRequest)
        //上传结束
        await this.api.upload.uploadFileAll({ name:file.name, uuid: 'test',size:file.size })

    }
    render(){
        return (
            <div>
                <input type="file" onChange={ this.fileChange.bind(this) } />
            </div>
        )
    }
}
