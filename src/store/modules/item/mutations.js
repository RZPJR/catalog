const mutations = {
    // List Item
    setItemList: function(state, payload) {
        state.item_list.items = payload;
        return state;
    },
    setPreloadItemList: function(state, payload) {
        state.item_list.isLoading = payload;
        return state;
    },
    setItemCategoryFilter: function(state, payload) {
        state.item_list.filter.item_category = payload;
        return state;
    },
    setUomFilter: function(state, payload) {
        state.item_list.filter.uoms = payload;
        return state;
    },
    setClassFilter: function(state, payload) {
        state.item_list.filter.class = payload;
        return state;
    },
    setStatusFilter: function(state, payload) {
        state.item_list.filter.status = payload;
        return state;
    },
    setSearchFilter: function(state, payload) {
        state.item_list.filter.search = payload;
        return state;
    },

    // Detail Item
    setPackable: function(state, payload) {
        state.item_detail.packable_value = payload;
        return state;
    },


    // Update Item
    setConfirmItemUpdate: function(state, payload) {
        state.item_update.confirm_data = payload;
        return state;
    },
    setFormItemUpdate: function(state, payload) {
        state.item_update.form = payload;
        return state;
    },
    setItemCategoryUpdate: function(state, payload) {
        state.item_update.form.item_category = payload;
        return state;
    },
    setMaximumDeliveryDateUpdate: function(state, payload) {
        state.item_update.form.max_day_delivery_date = parseInt(payload);
        return state;
    },
    setExcludeArchetypeUpdate: function(state, payload) {
        state.item_update.form.exclude_archetype = payload;
        return state;
    },
    setOrderChannelRestrictionUpdate: function(state, payload) {
        state.item_update.form.order_channel_restriction = payload;
        return state;
    },
    setImagesUpdate: function(state, payload) {
        state.item_update.form.images = payload;
        return state;
    },
    setDescriptionUpdate: function(state, payload) {
        state.item_update.form.note = payload;
        return state;
    },
};

export default mutations;
