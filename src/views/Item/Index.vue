<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                dense
                                v-model="item_list.filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-on="{ ...tooltip }"
                                data-unq="item-input-search"
                            >
                            </v-text-field>
                        </template>
                       <span>Search by name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="item_list.show_filter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="item_list.show_filter = !item_list.show_filter"
                        v-if="item_list.show_filter"
                        class="no-caps fs12"
                        data-unq="item-button-hide"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="item_list.show_filter = !item_list.show_filter"
                        v-else
                        class="no-caps fs12"
                        data-unq="item-button-show"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="item_list.show_filter">
                <v-col cols="12" md="3" class="-mb24">
                    <v-select
                        v-model="item_list.filter.status"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                        data-unq="item-select-status"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectUom
                        :norequired="true"
                        v-model="item_list.filter.uoms"
                        @selected="uomSelected"
                        :dense="true"
                        data-unq="item-select-uom"
                    ></SelectUom>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectItemClass
                        :norequired="true"
                        v-model="item_list.filter.class"
                        @selected="itemClassSelected"
                        :dense="true"
                        data-unq="item-select-itemClass"
                    ></SelectItemClass>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectProductTag
                        @selected="itemCategorySelected"
                        :dense="true"
                        data-unq="item-select-itemCategory"
                    ></SelectProductTag>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-data-table
                :headers="item_list.table_headers"
                :items="item_list.items"
                :loading="item_list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`item-label-code-${props.index}`">{{ props.item.code }}</td>
                        <td :data-unq="`item-label-description-${props.index}`">
                            {{ props.item.description }}<br>
                            <span class="text-black60">{{ props.item.uom.name }}</span>
                        </td>
                        <td :data-unq="`item-label-class-${props.index}`">{{ props.item.class.name }}</td>
                        <td :data-unq="`item-label-item_category-${props.index}`">
                            <div v-if="props.item.item_category && props.item.item_category.length > 1">
                                <v-tooltip color="black" top>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <span v-on="{ ...tooltip }"> {{ props.item.item_category[0].name }}... </span>
                                    </template>
                                    <span> 
                                        {{ props.item.item_category_name }} 
                                    </span>
                                </v-tooltip>
                            </div>
                            <div v-else>
                                {{ props.item.item_category_name }}
                            </div>
                        </td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    data-unq="item-lable-active-${props.index}"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 7">
                                <v-chip
                                    :color="statusMaster('archived')"
                                    data-unq="item-lable-archived-${props.index}"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }" 
                                        :data-unq="`item-button-actionMenu-${props.index}`"
                                    ><v-icon dark>more_vert</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'itm_rdd'" :to="`/catalog/item/detail/` + props.item.id" data-unq="item-button-detail">
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-privilege="'itm_upl_img'" v-if='props.item.status !== 2' >
                                        <hr>
                                    </div>
                                    <v-list-item 
                                        v-if='props.item.status !== 2' 
                                        v-privilege="'itm_upl_img'" 
                                        :to="{ name: 'ItemUpdate', params: { id: props.item.id } }" 
                                        :data-unq="`item-button-update-${props.index}`"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Update</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "ItemList",
        computed: {
            ...mapState({
                item_list: state => state.item.item_list,
                pagination: state => state.pagination.pagination,
            }),
            footerProps() {
                return {
                    'items-per-page-options':[10,15,20,25],
                    'page-text': `${(this.pagination.page-1)*this.pagination.rows_per_page+1}
                                    - ${Math.min(this.pagination.page*this.pagination.rows_per_page,this.pagination.total_items)} 
                                    of ${this.pagination.total_items}`,
                };
            },
        },
        created() {
            this.$store.commit("setItemCategoryFilter", null)
            this.$store.commit("setUomFilter", null)
            this.$store.commit("setClassFilter", null)
            this.$store.commit("setStatusFilter", 1)
            this.$store.commit("setSearchFilter", '')
            this.fetchItemList()
            this.$store.commit("resetPagination")
        },
        methods: {
            ...mapActions([
                "fetchItemList"
            ]),
            itemCategorySelected(d){
                this.$store.commit("setItemCategoryFilter", null)
                if (d) {
                    this.$store.commit("setItemCategoryFilter", d.id)
                }
                this.getPagination(1)
                this.fetchItemList()
            },
            uomSelected(d) {
                this.$store.commit("setUomFilter", null)
                if (d) {
                    this.$store.commit("setUomFilter", d.id)
                }
                this.getPagination(1)
                this.fetchItemList()
            },
            itemClassSelected(d) {
                this.$store.commit("setClassFilter", null)
                if (d) {
                    this.$store.commit("setClassFilter", d.id)
                }
                this.getPagination(1)
                this.fetchItemList()
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchItemList()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchItemList()
            },
        },
        watch:{
            'item_list.filter.search': {
                handler: function (val) {
                    this.$store.commit('setSearchFilter', val)
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchItemList()
                    }, 1000);
                },
                deep: true
            },
            'item_list.filter.status': {
                handler: function (val) {
                    if(val){
                        this.$store.commit('setStatusFilter', val)
                        this.fetchItemList()
                    }
                },
                deep: true
            },
        }
    }
</script>