import { observable } from 'mobx'

import { StoreExt } from '@/utils/reactExt'

export default class UserStroe extends StoreExt {
    @observable 
    user: IUserStore.IUser[]=[]
}