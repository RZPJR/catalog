<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectItemClass
                            :norequired="true"
                            v-model="items.class"
                            :item_classes="items.class"
                            :dense="true"
                            data-unq="item-select-itemClass"
                            disabled
                        ></SelectItemClass>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="code"
                            v-model="items.code"
                            outlined
                            dense
                            disabled
                            data-unq="item-input-itemCode"
                        >
                            <template v-slot:label>
                                Item Code
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="item_name"
                            v-model="items.description"
                            outlined
                            dense
                            disabled
                            data-unq="item-input-itemName"
                        >
                            <template v-slot:label>
                                Item Name
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectUom
                            :norequired="true"
                            :uom="items.uom"
                            v-model="items.uom"
                            :dense="true"
                            data-unq="item-select-uom"
                            disabled
                        ></SelectUom>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="weigth"
                            v-model="items.unit_weight_conversion"
                            outlined
                            dense
                            disabled
                            data-unq="item-input-weigth"
                        >
                            <template v-slot:label>
                                Weigth
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-start">
            <div class="fs16 bold">
                Catalog
            </div>
            <div class="mt36">
                <v-row>
                    <v-col cols="12" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <MultiSelectItemCategory
                                        v-model="items.item_category"
                                        @selected="itemCategorySelected"
                                        :norequired="true"
                                        :dense="true"
                                        :item_categories="items.item_category"
                                        data-unq="item-select-multiItemCategory"
                                        :attribute="5"
                                    />
                                </div>
                            </template>
                            <span>Item classification in mobile application</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-text-field
                            name="max_delivery_date"
                            v-model="items.max_day_delivery_date"
                            outlined
                            dense
                            data-unq="item-input-maxDeliveryDate"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>
                                Maximum Delivery Date
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <MultiSelectArcheType
                                        v-model="items.exclude_archetypes"
                                        @selected="archeTypeSelected"
                                        :archeType="items.exclude_archetypes"
                                        :norequired="true"
                                        :dense="true"
                                        :disbled="false"
                                        data-unq="item-select-excludeArchetype"
                                    />
                                </div>
                            </template>
                            <span>This item will not showing on customer apps</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <SelectOrderChannel
                            name="order_channel_restriction"
                            @selected="restrictChannelSelected"
                            v-model="items.order_channel_restrictions"
                            :label="'Order Channel Restriction'"
                            :dense="true"
                            :norequired="true"
                            :attribute="'order_channel'"
                            :table="'sales_order'"
                            :order_channels="items.order_channel_restrictions"
                            data-unq="item-select-orderChannelRestriction"
                        ></SelectOrderChannel>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-textarea
                                        name="description"
                                        v-model="items.note"
                                        :counter="500"
                                        maxlength="500"
                                        outlined
                                        label="Description"
                                        dense
                                        data-unq="item-input-description"
                                    />
                                </div>
                            </template>
                            <span>Item description shown in mobile application</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-row>
                            <UploadImageMultiple
                                :name="items.description"
                                :data="items.item_images"
                                :error="item_update.error.images"
                                :title="null"
                                class="ma-3"
                                data-unq="item-upload-multiImage"
                                max_img="3"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-start">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                            data-unq="item-button-cancel"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            data-unq="item-button-update"
                        >
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`item-input-confirmDialog`" :sendData="item_update.confirm_data" />
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "UpdateItem",
        data: {
            return: {
                arrImgs: []
            }
        },
        computed: {
            ...mapState({
                items: state => state.item.item_list.items,
                item_update: state => state.item.item_update,
            }),
        },
        created() {
            this.fetchDetailItem({id: this.$route.params.id})
            this.item_update.confirm_data.model = false
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchDetailItem({id: this.$route.params.id})
                }
            });
            this.$root.$on("event_error", function (err) {
                self.item_update.error = err;
            });
            this.$root.$on("event_multipleImage", function (url) {
                let arr = []
                this.$store.commit('setImagesUpdate', [])
                if (url) {
                    url.forEach(e => {
                        arr.push(e.image_url)
                    });
                    this.$store.commit('setImagesUpdate', arr)
                }
            });
        },
        methods: {
            ...mapActions([
                'fetchDetailItem',
                'fetchItemUpdate'
            ]),
            confirmButton() {
                this.$store.commit('setMaximumDeliveryDateUpdate', this.items.max_day_delivery_date)
                this.$store.commit('setDescriptionUpdate', this.items.note)
                this.item_update.confirm_data = {
                    model : true,
                    title : "Update Item",
                    text : "Are you sure want to Update this Item?",
                    urlApi : '/catalog/v1/item/'+ this.$route.params.id,
                    nextPage: "/catalog/item/detail/" + this.$route.params.id,
                    data :  this.item_update.form
                }
            },
            archeTypeSelected(d) {
                let arr = []
                this.$store.commit('setExcludeArchetypeUpdate', [])
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit('setExcludeArchetypeUpdate', arr)
                }
            },
            itemCategorySelected(d) {
                let arr = []
                this.$store.commit('setItemCategoryUpdate', [])
                if (d) {
                    d.forEach(e => {
                        arr.push(parseInt(e.id))
                    });
                    this.$store.commit('setItemCategoryUpdate', arr)
                }
            },
            restrictChannelSelected(d) {
                let arr = []
                this.$store.commit('setOrderChannelRestrictionUpdate', [])
                if (d) {
                    d.forEach(e => {
                        arr.push(parseInt(e.value_int))
                    });
                    this.$store.commit('setOrderChannelRestrictionUpdate', arr)
                }
            },
        },
    };
</script>
