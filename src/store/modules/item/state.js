const state = {
    // Readlist Item
    item_list: {
		filter: {
			search: '',
			status: 1,
			item_category: null,
			uoms: null,
            class: null,
		},
		isLoading: false,
        show_filter: false,
		table_headers: [
			{
                text:'Code',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Name',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Class',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Item Category',
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
        items:[],
	},

    // Detail Item
    item_detail: {
        packable_value: false,
        packable_modal: false,
        data_auditlog: {},
    },

    // Update Item
    item_update: {
        confirm_data: {},
        uom: '',
        items: [],
        error: {},
        arrImg: [],
        nameImage: '',
        form: {
            item_category: [],
            max_day_delivery_date: null,
            exclude_archetype: [],
            order_channel_restriction: [],
            images: [],
            note: '',
        },
    }
};

export default state;
