export default [
  {
    path: '/',
    component: '../layouts/SaasLayouts',
    routes: [
      {
        path: '/',
        routes: [
          {
            icon: 'MailFilled',
            path: '/archives',
            name: 'archives',
            title: '档案管理',
            component: './Navigation',
            routes: [
              {
                icon: '',
                path: '/archives/commodity',
                name: 'archives.commodity',
                title: '商品管理',
                routes: [
                  {
                    path: '/archives/commodity/category',
                    name: 'archives.commodity.category',
                    title: '商品类别',
                    component: './Welcome'
                  }
                ]
              }
            ]
          },
          {
            path: '/purchase',
            name: 'purchase',
            title: '采购管理',
            component: './Navigation',
            routes: [
              {
                path: '/purchase/supplier',
                name: 'purchase.supplier',
                title: '供应商维护',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    path: '/purchase/supplier/area',
                    name: 'purchase.supplier.area',
                    title: '供应商区域',
                    component: './404'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
