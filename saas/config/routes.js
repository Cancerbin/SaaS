export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/user/login',
            name: 'login',
            component: './User/Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SaasLayout',
        routes: [
          {
            path: '/nav',
            name: 'nav',
            component: './NavigationHome',
          }
        ]
      }
    ]
  }
]
