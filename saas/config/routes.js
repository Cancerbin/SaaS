export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/SaasLayouts',
        routes: [
          {
            path: '/nav',
            component: './Navigation',
          }
        ]
      }
    ]
  }
]
