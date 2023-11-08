export default [
    {
        path: '/catalog/item',
        name: 'ItemList',
        component: () => import("./Index.vue"),
        meta: {
            title: 'Item List'
        }
    },
    {
        path: '/catalog/item/detail/:id',
        name: 'ItemDetail',
        component: () => import("./Detail"),
        meta: {
            title: 'Item Detail',
            breadcrumbs: [
                {
                    text: 'Item List',
                    to: '/catalog/item'
                },
                {
                    text: 'Item Detail',
                },
            ],
        }
    },
    {
        path: '/catalog/item/update/:id',
        name: 'ItemUpdate',
        component: () => import("./Update"),
        meta: {
            title: 'Update Item',
            breadcrumbs: [
                {
                    text: 'Item List',
                    to: '/catalog/item'
                },
                {
                    text: 'Item Detail',
                    to: '/catalog/item/detail/:id'
                },
                {
                    text: 'Update Item',
                },
            ],
        }
    },
]