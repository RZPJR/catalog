const state = {
	// Readlist Item Category
	item_category_list: {
		filter: {
			search: '',
			region_id : '',
			status:1,
		},
		isLoading: false,
		table_headers: [
			{
				text:'Code',
				width: "40%",
				class: 'grey--text text--darken-4',
				sortable: false,
			},
			{
				text:'Region',
				width: "50%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Status',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				width: "5%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
		],
		data:{
			name: '',
            region: '',
            region_id: null,
			region_arr: [],
			item_category_images: {
				image_url: ''
			},
			image_url: ''
		},
	},
	// Detail Item Category
    detail_item_category : {
		isLoading: false,
		data_audit_log: {},
		data:{
			name: '',
            region: '',
            region_id: null,
			region_arr: [],
			item_category_images: {
				image_url: ''
			},
			image_url: ''
		},
    },

	// Create Item Category
    create_item_category : {
		confirm_data:{},
		error:{},
        form: {
            name: '',
            region_id: [],
            image_url: '',
        },
    },
	// Update Item Category
    item_category_update : {
		confirm_data:{},
		error:{},
        form: {
            name: '',
            region_id: [],
            image_url: '',
        },
    },
};

export default state;
