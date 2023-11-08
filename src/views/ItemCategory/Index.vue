<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                dense
                                v-model="item_category_list.filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-on="{ ...tooltip }"
                                data-unq="itemCategory-input-search"
                            ></v-text-field>
                        </template>
                    <span>Search by code, name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="show_filter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-if="show_filter"
                        class="no-caps fs12"
                        data-unq="itemCategory-button-hide"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-else
                        class="no-caps fs12"
                        data-unq="itemCategory-button-show"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="show_filter">
                <v-col cols="12" md="3">
                    <v-select
                        v-model="item_category_list.filter.status"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                        data-unq="itemCategory-select-status"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea 
                        :data-unq="`itemCategory-filter-region`"
                        @selected="areaSelected"
                        :dense="true"
                        :norequired="true"
                        :aux_data="2"
                    ></SelectArea>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <router-link :to="{ name: 'ItemCategoryCreate' }" class="routerLink" v-privilege="'itm_ctg_crt'">
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="no-caps bold white--text"
                            data-unq="itemCategory-button-create"
                        >
                            <span class="text-white bold">
                                Create Item Category
                            </span>
                        </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="item_category_list.table_headers"
                :items="item_category_list.data"
                :loading="item_category_list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`itemCategory-value-code-${props.index}`">
                            {{ props.item.code }}
                            <br>
                            <span class="text-black60" :data-unq="`itemCategory-value-name-${props.index}`">{{ props.item.name }}</span>
                        </td>
                        <td :data-unq="`itemCategory-value-region-${props.index}`">{{ props.item.region }}</td>
                        <td>
                            <div v-if="props.item.status === 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    :data-unq="`itemCategory-value-statusActive-${props.index}`"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-else>
                                <v-chip
                                    :color="statusMaster('archived')"
                                    :data-unq="`itemCategory-value-statusArchive-${props.index}`"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                        :data-unq="`itemCategory-button-actionButton-${props.index}`"
                                    ><v-icon dark>more_vert</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :to="`/catalog/item-category/detail/${props.item.id}`" 
                                        v-privilege="'itm_ctg_rdd'"
                                        :data-unq="`itemCategory-button-detail-${props.index}`"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div>
                                        <hr>
                                    </div>
                                    <v-list-item
                                        :to="`/catalog/item-category/update/${props.item.id}`"
                                        v-privilege="'itm_ctg_upd'"
                                        :data-unq="`itemCategory-button-update-${props.index}`"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Update</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-privilege="'itm_ctg_arc'">
                                        <hr>
                                    </div>
                                    <v-list-item 
                                        v-privilege="'itm_ctg_arc'" 
                                        @click="archiveItemCategory({id: props.item.id, status: props.item.status})"
                                        v-if="props.item.status === 1"
                                        :data-unq="`itemCategory-button-archive-${props.index}`"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        v-privilege="'itm_ctg_urc'" 
                                        @click="archiveItemCategory({id: props.item.id, status: props.item.status})"
                                        v-else
                                        :data-unq="`itemCategory-button-unarchive-${props.index}`"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Unarchive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`" :sendData="confirm_data"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: "ItemCategoryList",
        data() {
            return {
                statusDialog: false,
                show_filter : false
            }
        },
        computed: {
            ...mapState({
                item_category_list: state => state.itemcategory.item_category_list,
                confirm_data: state => state.itemcategory.item_category_update.confirm_data,
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
            this.$store.commit("setRegionCategoryList", '')
            this.$store.commit("setStatusCategoryList", 1)
            this.$store.commit("setSearchCategoryList", '')
            this.fetchItemCategoryList()
            this.$store.commit("resetPagination")
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchItemCategoryList()
                }
            });
        },
        methods: {
            ...mapActions([
                "fetchItemCategoryList",
                "archiveItemCategory"
            ]),
            // For Archive & Unarchive Item Category
            changeStatus(val,id) {
                if (val=='1') {
                    this.confirm_data = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Archive this Item Category",
                        title : "Archive",
                        text : "Are you sure want to Archive this Item Category? This category will be hidden in Mobile Apps",
                        urlApi : '/catalog/v1/item_category/archive/'+id,
                        data : {}
                    }
                } else {
                    this.confirm_data = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Unarchive this Item Category",
                        title : "Unarchive",
                        text : "Are you sure want to Unarchive this Item Category? This tag will be shown in Mobile Apps",
                        urlApi : '/catalog/v1/item_category/unarchive/'+id,
                        data : {}
                    }
                }
            },
            //For Filter by Region/Area
            areaSelected(d){
                this.$store.commit("setRegionCategoryList", "")
                if(d){
                    this.$store.commit("setRegionCategoryList", d.id)
                }
                this.getPagination(1)
                this.fetchItemCategoryList()
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchItemCategoryList()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchItemCategoryList()
            },
        },
        watch: {
            'item_category_list.filter.search': { // to filter by search box
                handler: function (val) {
                    this.$store.commit('setSearchCategoryList', val)
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchItemCategoryList()
                    }, 1000);
                },
                deep: true
            },
            'item_category_list.filter.status': {
                handler: function (val) {
                    if(val){
                        this.$store.commit('setStatusCategoryList', val)
                        this.fetchItemCategoryList()
                    }
                },
                deep: true
            },
        },
    }
</script>
