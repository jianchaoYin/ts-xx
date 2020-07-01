import { observable } from 'mobx'
import { StoreExt } from '@/utils/reactExt'
import { userinfo } from './syncUserInfo'


export class AuthStore extends StoreExt{
    
    @observable
    userInfo: IAuthStore.UseInfo = userinfo

} 

export default new AuthStore()