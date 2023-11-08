const mutations = {
    // Readlist Item Category
    setItemCategoryList: function(state, payload) {
        state.item_category_list.data = payload;
        return state;
    },
    setPreloadItemCategoryList: function(state, payload) {
        state.item_category_list.isLoading = payload;
        return state;
    },
    setRegionCategoryList: function(state, payload) {
        state.item_category_list.filter.region_id = payload;
        return state;
    },
    setStatusCategoryList: function(state, payload) {
        state.item_category_list.filter.status = payload;
        return state;
    },
    setSearchCategoryList: function(state, payload) {
        state.item_category_list.filter.search = payload;
        return state;
    },

    //Detail Item Category
    setItemCategoryDetail: function(state, payload) {
        state.detail_item_category.data = payload;
        return state;
    },
    setPreloadItemCategoryDetail: function(state, payload) {
        state.detail_item_category.isLoading = payload;
        return state;
    },
    setAuditLogItemCategory: function(state, payload) {
        state.detail_item_category.data_audit_log = payload;
        return state;
    },

    //Create Item Category
    setConfirmItemCategoryCreate: function(state, payload) {
        state.create_item_category.confirm_data = payload;
        return state;
    },
    setFormItemCategoryCreate: function(state, payload) {
        state.create_item_category.form = payload;
        return state;
    },
    setRegionCategoryListCreate: function(state, payload) {
        state.create_item_category.form.region_id = payload;
        return state;
    },
    setErrorItemCategory: function(state, payload) {
        state.create_item_category.error = {};
        state.item_category_update.error = {};
        return state;
    },

    // Update Item
    setArrRegionUpdate: function(state, payload) {
        state.detail_item_category.data.region_arr = payload;
        state.detail_item_category.data.region_id = payload;
        return state;
    },
    setConfirmItemCategoryUpdate: function(state, payload) {
        state.item_category_update.confirm_data = payload;
        return state;
    },
    setFormItemCategoryUpdate: function(state, payload) {
        state.item_category_update.form = payload;
        return state;
    },
    setRegionCategoryListUpdate: function(state, payload) {
        state.item_category_update.form.region_id = payload;
        return state;
    },
    setImageCategoryListUpdate: function(state, payload) {
        state.item_category_update.form.image_url = payload;
        return state;
    },
    setArchiveCategoryListUpdate: function(state, payload) {
        state.item_category_update.confirm_data = payload;
        return state;
    },
};

export default mutations;
