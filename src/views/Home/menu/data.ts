

export const menuList: menuList[] = [
    {
        label:'文件上传',
        value:'01'
    },
    {
        label:'象棋游戏',
        value:'02'
    },
    {
        label:'其他模块',
        value:'03',
        children:[{
            label:'模块一',
            value:'03-01'
        },{
            label:'模块二',
            value:'03-02'
        }]
    }
]