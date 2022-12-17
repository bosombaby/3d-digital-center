const menus = [
    {
        index:'1',
        name: 'dashboard',
        title: '首页',
        icon:'house',
    },
    {
        index:'2',
        name: 'modelCenter',
        title: '资源中心',
        icon:'house',
    },
    {
        index:'3',
        name: 'buildModel',
        title: '三维开发',
        icon:'house',
    },
    {
        index:'4',
        name: 'manageInfo',
        title: '信息管理',
        icon:'house',
        children: [
            {
                index:'4-1',
                name: 'userInfo',
                title: '用户信息',
                icon: 'house',
            },
            {
                index:'4-2',
                name: 'modelInfo',
                title: '模型信息',
                icon:'house',
            }
        ]
    },
    {
        index:'5',
        name: 'personal',
        title: '个人中心',
        icon:'house',
    }
]

export default menus