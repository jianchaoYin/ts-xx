import { AuthStore as AuthStoreModel } from './index'

export as namespace IAuthStore

export interface AuthStore extends AuthStoreModel {}


export interface UseInfo{
    msg: string;
    token: string;
}