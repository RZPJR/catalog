<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <div class="img-product ma-2" v-for="(item, idx) in items.item_images" :key="idx">
                    <v-img
                        class="rounded-form"
                        height="180"
                        width="250"
                        :src="item.imgUrl"
                    ></v-img>
                </div>
            </v-row>
            <v-row>
                <v-col cols="12" md="9" class="fs25 bold">
                    {{items.description}}
                </v-col>
                <v-col cols="12" md="3" class="d-flex justify-end align-end">
                    <v-btn
                        v-if="items.status==1"
                        elevation="0"
                        rounded
                        depressed
                        small
                        class="no-caps mb4"
                        :color="statusMaster('active')"
                        data-unq="item-label-active"
                    >Active</v-btn>
                    <v-btn
                        v-else
                        elevation="0"
                        rounded
                        depressed
                        small
                        class="no-caps mb4"
                        :color="statusMaster('archived')"
                        data-unq="item-button-archived"
                    >Archived</v-btn>
                    <v-menu offset-y >
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                v-if="items.status !== 2"
                                v-privilege="'itm_upl_img'" 
                                :to="`/catalog/item/update/${items.id}`"
                                data-unq="item-button-update"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <hr/>
                            <v-list-item 
                                @click="seeHistory()" 
                                data-unq="item-button-history"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Class'" :value="items.class.name"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Code'" :value="items.code"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'UOM'" :value="items.uom.name"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Weight'" :value="items.unit_weight_conversion"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt20">
                        <v-row>
                            <v-col >
                                <div class="text-black60">Packable :</div>
                            </v-col>
                            <v-col>
                                <div class="d-flex justify-end -mt20">
                                    <v-switch
                                        data-unq="item-toogle-packable"
                                        v-model="item_detail.packable_value"
                                        color="#50ABA3"
                                        inset
                                        @click="packable()"
                                    ></v-switch>
                                </div>
                            </v-col>
                        </v-row>
                        <v-divider/>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-start">
            <div class="fs16 bold">
                Catalog
            </div>
            <div class="mt48">
                <v-row>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Item Category'" :value="items.item_category_name"  :align="true"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Description'" :value="items.note" :align="true"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Max Day Delivery Date'" :value="items.max_day_delivery_date"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Exclude Archetype'" :value="items.exclude_archetype_name"  :align="true"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Order Channel Restriction'" :value="items.order_channel_restriction_name"  :align="true"/>
                    </v-col>
                </v-row>
            </div>
        </div>
        <v-dialog
            v-model="item_detail.packable_modal"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Packable</span>
                </v-card-title>
                <v-card-text>
                    <span v-if="items.packable == true" class="fs16 mt-1">Are you sure to set this product as unpackable item ?</span>
                    <span v-else class="fs16 mt-1">Are you sure to set this product as packable item ?</span>
                </v-card-text>
                <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                    <v-btn
                        @click="packableNo()"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">No</span>
                    </v-btn>
                    <v-btn
                        @click="packableYes()"
                        class="main-btn white--text"
                        depressed
                        color="#50ABA3"
                    >Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <AuditLogNew :data="item_detail.data_auditlog"/>
    </v-container>
</template>
<script>
    import Vue from "vue";
    import http from "../../services/http";
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "ItemDetail",
        computed: {
            ...mapState({
                items: state => state.item.item_list.items,
                item_detail: state => state.item.item_detail,
            }),
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchDetailItem({id: this.$route.params.id})
                }
            });
        },
        methods:{
            ...mapActions([
                "fetchDetailItem",
            ]),
            packable(){
                if(this.item_detail.packable_value == true){
                    this.item_detail.packable_modal = true
                }else{
                    this.item_detail.packable_modal = true
                }
            },
            packableNo(){
                this.item_detail.packable_modal = false
                this.fetchDetailItem({id: this.$route.params.id})
            },
            packableYes(){
                let packable_value = true
                if(this.items.packable == true){
                    packable_value = false
                }
                http.put("/item/packable/"+ this.$route.params.id, {
                    packable: packable_value
                }).then(response => {
                    Vue.$toast.open({
                        position: 'top-right',
                        message: 'Data has been saved successfully',
                        type: 'success',
                    });
                    this.fetchDetailItem({id: this.$route.params.id})
                });
                this.item_detail.packable_modal = false
            },
            seeHistory() {
                this.item_detail.data_auditlog = {
                    model : true,
                    id: this.$route.params.id,
                    type: "item"
                }
            },
        },
        created() {
            this.fetchDetailItem({id: this.$route.params.id})
        },
    }
</script>