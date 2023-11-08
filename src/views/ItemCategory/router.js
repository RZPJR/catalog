export default [
    {
        path: '/catalog/item-category',
        name: 'ItemCategoryList',
        component: () => import("./Index.vue"),
        meta: {
            title: 'Item Category List'
        }
    },
    {
        path: '/catalog/item-category/detail/:id',
        name: 'ItemCategoryDetail',
        component: () => import("./Detail"),
        meta: {
            title: 'Detail Item Category',
            breadcrumbs: [
                {
                    text: 'Item Category List',
                    to: '/catalog/item-category'
                },
                {
                    text: 'Detail Item Category',
                },
            ],
        },
    },
    {
        path: '/catalog/item-category/update/:id',
        name: 'ItemCategoryUpdate',
        component: () => import("./Update"),
        meta: {
            title: 'Update Item Category',
            breadcrumbs: [
                {
                    text: 'Item Category List',
                    to: '/catalog/item-category'
                },
                {
                    text: 'Item Category Detail',
                    to: '/catalog/item-category/detail/:id'
                },
                {
                    text: 'Update Item Category',
                },
            ],
        }
    },
    {
        path: '/catalog/item-category/create',
        name: 'ItemCategoryCreate',
        component: () => import("./Create"),
        meta: {
            title: 'Create Item Category',
            breadcrumbs: [
                {
                    text: 'Item Category List',
                    to: '/catalog/item-category'
                },
                {
                    text: 'Create Item Category',
                },
            ],
        },
        props: true,
    },
]