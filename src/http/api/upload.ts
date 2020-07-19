import http from '../require'

import { upload as api } from '../constant'

export default {
    async uploadFile( data: object, url: string = api.file ): Promise<any>{
        return await http.post(url,data)
    },
    async uploadFileAll( data: object, url: string = api.fileAll ): Promise<any>{
        return await http.get(url,data)
    }
}