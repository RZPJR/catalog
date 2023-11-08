<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <div class="mt24">
                <v-row class="mt24">
                    <v-col cols="12" md="6" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-text-field
                                    name="name"
                                    v-model="item_category_update.form.name"
                                    required
                                    outlined
                                    dense
                                    :error-messages="item_category_update.error.name"
                                    v-on="{ ...tooltip}"
                                    data-unq="itemCategory-input-name"
                                >
                                    <template v-slot:label>
                                        Name<span class="text-red">*</span>
                                    </template>
                                </v-text-field>
                            </template>
                            <span>Name will be shown as category name in mobile application</span>
                        </v-tooltip>
                    </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                    <div v-on="{ ...tooltip}">
                                        <MultiSelectArea 
                                            v-model="item_category_update.form.region_id"
                                            @selected="areaSelected"
                                            :area="form.region_arr"
                                            :dense="true"
                                            :error="item_category_update.error.region_id"
                                            data-unq="itemCategory-select-multiArea"
                                        ></MultiSelectArea>
                                    </div>
                                </template>
                                <span>Tag will be shown in selected region</span>
                            </v-tooltip>
                        </v-col>
                    <v-col cols="12" class="-mt30">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip}">
                                    <UploadImage 
                                        :minWidth="250"
                                        :minHeight="250"
                                        :maxSize="300"
                                        :forImgName="item_category_update.form.name"
                                        :errorMsg="item_category_update.error.image_url"
                                        :type="'item_category'"
                                        :extention="'jpeg'"
                                        :accept="'image/jpeg,image/jpg'"
                                        :imageFromUpdate="item_category_update.form.image_url"
                                        data-unq="itemCategory-upload-image"
                                    ></UploadImage>
                                </div>
                            </template>
                            <span>Image will be shown as category icon in our mobile application</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box">
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
                            data-unq="itemCategory-button-cancel"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            data-unq="itemCategory-button-update"
                        >
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`" :sendData="confirm_data"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "ItemCategoryUpdate",
        data()  {
            return {
                confirm_data: {},
            }
        },
        computed: {
            ...mapState({
                form: state => state.itemcategory.detail_item_category.data,
                item_category_update: state => state.itemcategory.item_category_update,
                image_url: state => state.itemcategory.item_category_update.form.image_url
            })
        },
        created() {
            this.fetchDetailItemCategory({id: this.$route.params.id})
        },
        mounted () {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res && this.$route.params.id != undefined) {
                    self.fetchDetailItemCategory({id: this.$route.params.id})
                }
            });
            this.$root.$on('event_error', function (err) {
                self.item_category_update.error = err
            });
            this.$root.$on('event_uploadImage', function (image) {
                self.item_category_update.form.image_url = image
                self.$store.commit("setImageCategoryListUpdate", image)
            });
        },
        methods: {
            ...mapActions([
                'fetchDetailItemCategory',
                'fetchItemCategoryUpdate'
            ]),
            confirmButton() {
                this.confirm_data = {
                    model: true,
                    title: "Update Item Category",
                    text: "Are you sure want to Update this Item Category?",
                    urlApi: "/catalog/v1/item_category/"+ this.$route.params.id,
                    nextPage: "/catalog/item-category/detail/" + this.$route.params.id,
                    data: this.item_category_update.form
                }
            },
            areaSelected(d) { // for select area and set id
                let arr = []
                this.$store.commit('setRegionCategoryListUpdate', [])
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit('setRegionCategoryListUpdate', arr)
                }
            },
        },
    }
</script>
