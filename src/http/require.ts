import axios,{ AxiosRequestConfig as _AxiosRequestConfig, Method } from 'axios'
import { message } from 'antd'
import qs from 'qs'

export interface AxiosRequestConfig extends _AxiosRequestConfig{
    startTime?: Date;
}

interface HttpRequest{
    get?:( url: string, data: object, baesUrl?: string ) => Promise<any>,
    post?:( url: string, data: object, baesUrl?: string ) => Promise<any>,
    put?:( url: string, data: object, baesUrl?: string ) => Promise<any>,
    delete?:( url: string, data: object, baesUrl?: string ) => Promise<any>
}

const resFormat = res => res.response|| res.data|| {}

let authTime: NodeJS.Timer = null

const http: HttpRequest = {}

const method: Method[] = ['get','post','put','delete']

//主体方法
method.forEach( v => {
    http[v] = ( url: string,data: object, baesUrl?: string ) => {
        //baseUrl为http地址:如192.138.1.14:8080/
        const axiosConfig: AxiosRequestConfig = {
            method:v,
            url,
        }
        const instance = axios.create()
        instance.interceptors.request.use( cfg => {
            //加入ts前缀时间戳
            cfg.params = { ...cfg.params, ts: Date.now()/1000 }
            return cfg
        },error => Promise.reject(error))

        instance.interceptors.response.use( res => {
            //判断返回的data类型为数组还是对象,取得返回值
            //NaN函数判断是否为数组,若是返回false,否则为true
            const rdata = 
            typeof res.data == 'object' && !isNaN(res.data.length)?res.data[0]:res.data

            return resFormat(rdata)

        },error => {
            if([401,402,403].includes(error.respone.status)){
                message.destroy()
                message.error('用户未认证,请重新登录!')
                clearTimeout(authTime)
                authTime = setTimeout(()=>{
                    location.replace('/#/login')
                },300)
                return
            }
            return Promise.reject({
                msg:error.response.statusText || error.message || 'Network error',
                config:error.config
            })
        } )
        if(v === 'get'){
            axiosConfig.params = data
        }else if( data instanceof FormData ){
            axiosConfig.data = data
        }else{
            axiosConfig.data = qs.stringify(data)
        }
        axiosConfig.startTime = new Date()
        return instance.request(axiosConfig).then(res=>res).catch(err=>{
            message.destroy()
            message.error(err.response||err.msg||err.stack||'未知错误')
            return Promise.reject(err.response||err.msg||err.stack||'未知错误')
        })
    }
})
export default http