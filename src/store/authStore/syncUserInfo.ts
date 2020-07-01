import { LOCALSTORAGE_KEYS } from '@/constant/index'

export const initUserInfo = ( () => {
    const userinfo = localStorage.getItem(LOCALSTORAGE_KEYS.USERINFO)
    const _userinfo: IAuthStore.UseInfo = userinfo? JSON.parse(userinfo) : {}
    return _userinfo
})()

export let userinfo: IAuthStore.UseInfo = initUserInfo