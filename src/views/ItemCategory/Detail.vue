<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <div v-if="item_category_list.item_category_images.image_url && item_category_list.item_category_images.image_url !== ''" class="img-product ma-3">
                    <v-img
                        class="rounded-form"
                        height="180"
                        width="250"
                        :src="item_category_list.item_category_images.image_url"
                    ></v-img>
                </div>
            </v-row>
            <v-row>
                <v-col class="fs24 bold">
                    {{item_category_list.name}}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <div v-if="item_category_list.status === 1">
                        <v-btn
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                            data-unq="itemCategory-label-status-archive"
                        >
                            Active
                        </v-btn>
                    </div>
                    <div v-if="item_category_list.status === 7">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('archived')"
                            data-unq="itemCategory-label-status-unarchive"
                        >
                            Archived
                        </v-btn>
                    </div>
                    <v-menu offset-y >
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item
                                :to="{ name: 'ItemCategoryUpdate', params: { id_item: item_category_list.id }}"
                                data-unq="itemCategory-button-update"
                                v-privilege="'itm_ctg_upd'" 
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
                                @click="archiveItemCategory({id: item_category_list.id, status: item_category_list.status})"
                                v-if="item_category_list.status === 1"
                                data-unq="itemCategory-button-archive"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item 
                                v-privilege="'itm_ctg_urc'" 
                                @click="archiveItemCategory({id: item_category_list.id, status: item_category_list.status})"
                                v-else
                                data-unq="itemCategory-button-unarchive"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div>
                                <hr>
                            </div>
                            <v-list-item @click="seeHistory()" data-unq="itemCategory-button-history">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="-mb36">
                <v-col cols="12" md="6">
                    <DetailRowNew :name="'Code'" :value="item_category_list.code"/>
                </v-col>
                <v-col cols="12" md="6">
                    <DetailRowNew :name="'Region'" :value="item_category_list.region"/>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`" :sendData="confirm_data"/>
        <AuditLogNew :data-unq="`itemCategory-input-auditLog`" :data="data_audit_log"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "ItemCategoryDetail",
        computed: {
            ...mapState({
                item_category_list: state => state.itemcategory.detail_item_category.data,
                data_audit_log: state => state.itemcategory.detail_item_category.data_audit_log,
                confirm_data: state => state.itemcategory.item_category_update.confirm_data,
            }),
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res && this.$route.params.id != undefined) {
                    self.fetchDetailItemCategory({id: this.$route.params.id})
                }
            });
        },
        methods:{
            ...mapActions([
                "fetchDetailItemCategory",
                "archiveItemCategory"
            ]),
            //For geting history data
            seeHistory() {
                this.$store.commit('setAuditLogItemCategory', {})
                this.$store.commit('setAuditLogItemCategory', {
                    model: true,
                    id: this.$route.params.id,
                    type: "item_category"
                })
            },
        },
        created() {
            this.fetchDetailItemCategory({id: this.$route.params.id})
        },
    }
</script>