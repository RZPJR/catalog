import http from "../../../services/http";
import Pagination from "../pagination";

const actions = {
    // Readlist Item 
    fetchItemList: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadItemList", true)
        commit("setItemList", [])
        try {
            let search = state.item_list.filter.search
            let status = state.item_list.filter.status === 999 ? '' : state.item_list.filter.status
            let item_category_id = state.item_list.filter.item_category
            let uom_id = state.item_list.filter.uoms
            let item_class_id = state.item_list.filter.class
            let pagination = Pagination.state.pagination
            const response = await http.get('/item',{params: {
                page: pagination.page,
                per_page : pagination.rows_per_page,
                search: search,
                status: status,
                item_category_id: item_category_id,
                uom_id: uom_id,
                class_id: item_class_id
            }});
            if(response.data.data && response.data.data !== null){
                commit("setItemList", response.data.data)
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit("setPreloadItemList", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadItemList", false)
        }
    },

    // Detail Item
    fetchDetailItem: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadItemList", true)
        commit("setItemList", [])
        commit('setFormItemUpdate', {
            form: {
                item_category: [],
                max_day_delivery_date: null,
                exclude_archetype: [],
                order_channel_restriction: [],
                images: [],
                note: '',
            }
        }); 
        try {
            const response = await http.get('/item/'+ payload.id);
            if(response.data.data && response.data.data !== null){
                let items = response.data.data;
                let itemsImage = response.data.data.item_images;
                let arrImg = []
                let imgUrl = []
                if (itemsImage) {
                    for (let i = 0; i < itemsImage.length; i++) {
                        arrImg.push({
                            image: true,
                            imageError: "",
                            imgUrl: itemsImage[i].image_url,
                            nameFile: itemsImage[i].image_url,
                        });
                        imgUrl.push(itemsImage[i].image_url);
                    }
                }
                items.item_images = arrImg
                commit("setItemList", items)
                commit("setImagesUpdate", imgUrl)
                if(items.packable == true){
                    commit("setPackable", true)
                }else{
                    commit("setPackable", false)
                }
                
                // Set Item Category
                let item_category = []
                items.item_category.forEach(e => {
                    item_category.push(e.id)
                });
                commit("setItemCategoryUpdate", item_category)

                // Set Exclude Archetype
                let exclude_archetype = []
                items.exclude_archetypes.forEach(e => {
                    exclude_archetype.push(e.id)
                });
                commit("setExcludeArchetypeUpdate", exclude_archetype)

                // Set Order Channel Restriction
                let order_channel_restriction = []
                items.order_channel_restrictions.forEach(e => {
                    order_channel_restriction.push(e.value_int)
                });
                commit("setOrderChannelRestrictionUpdate", order_channel_restriction)
            }
            commit("setPreloadItemList", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadItemList", false)
        }
    },

    // Update Item
    fetchItemUpdate: async ({ commit, state, dispatch }, payload) => {
        commit('setConfirmItemUpdate', {});
        commit('setFormItemUpdate', {
            form: {
                item_category: [],
                max_day_delivery_date: null,
                exclude_archetype: [],
                order_channel_restriction: [],
                images: [],
                note: '',
            }
        }); 
    },
};

export default actions;
