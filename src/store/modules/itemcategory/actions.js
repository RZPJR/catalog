import http from "../../../services/http";
import Pagination from "../pagination";

const actions = {
    // Readlist Item Category
    fetchItemCategoryList: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadItemCategoryList", true)
        commit("setItemCategoryList", [])
        try {
            let search = state.item_category_list.filter.search
            let status = state.item_category_list.filter.status === 999 ? '' : state.item_category_list.filter.status
            let region_id = ''
            let pagination = Pagination.state.pagination
            if(state.item_category_list.filter.region_id){
                region_id = state.item_category_list.filter.region_id
            }
            const response = await http.get('/item_category',{params: {
                page: pagination.page,
                per_page : pagination.rows_per_page,
                search: search,
                status: status,
                region_id : region_id,
                order_by: '-id',
            }});
            if(response.data.data && response.data.data !== null){
                commit("setItemCategoryList", response.data.data)
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit("setPreloadItemCategoryList", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadItemCategoryList", false)
        }
    },

    // Detail Item Category
    fetchDetailItemCategory: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadItemCategoryDetail", true)
        commit('setErrorItemCategory', {});
        commit("setItemCategoryDetail", []);
        commit('setFormItemCategoryUpdate', {
            name: '',
            region_id: null,
            image_url: '',
        }); 
        try {
            const response = await http.get('/item_category/'+payload.id,{params: {
                per_page: 100,
            }});

            let arr = []
            if(response.data.data && response.data.data !== null){
                if (response.data.data.region_id.includes(",")) {
                    arr = response.data.data.region_id.split(',')
                } else {
                    arr.push(response.data.data.region_id)
                }
                commit("setItemCategoryDetail", response.data.data)
                commit("setFormItemCategoryUpdate", {
                    name: response.data.data.name,
                    region_id: arr,
                    image_url: response.data.data.item_category_images.image_url,
                })
                commit("setArrRegionUpdate", arr)
            }
            commit("setPreloadItemCategoryDetail", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadItemCategoryDetail", false)
        }
    },

    // Create Item Category
    fetchItemCategoryCreate: async ({ commit, state, dispatch }, payload) => {
        commit('setConfirmItemCategoryCreate', {});
        commit('setErrorItemCategory', {});
        commit('setFormItemCategoryCreate', {
            name: '',
            region_id: null,
            image_url: '',
        }); 
    },

    // Update Item Category
    fetchItemCategoryUpdate: async ({ commit, state, dispatch }, payload) => {
        commit('setConfirmItemCategoryUpdate', {});
        commit('setFormItemCategoryUpdate', {
            name: '',
            region_id: null,
            image_url: '',
        }); 
    },

    // Archive or Unarchive Item Category
    archiveItemCategory: async ({ commit, state, dispatch }, payload) => {
        commit('setArchiveCategoryListUpdate', {});
        if(payload.status == 1){
            commit('setArchiveCategoryListUpdate', {
                model : true,
                status : true,
                statusMsg : "Success to Archive this Item Category",
                title : "Archive",
                text : "Are you sure want to Archive this Item Category? This category will be hidden in Mobile Apps",
                urlApi : '/catalog/v1/item_category/archive/'+payload.id,
                data : {}
            }); 
        }else{
            commit('setArchiveCategoryListUpdate', {
                model : true,
                status : true,
                statusMsg : "Success to Unarchive this Item Category",
                title : "Unarchive",
                text : "Are you sure want to Unarchive this Item Category? This tag will be shown in Mobile Apps",
                urlApi : '/catalog/v1/item_category/unarchive/'+payload.id,
                data : {}
            }); 
        }
    },
};

export default actions;
