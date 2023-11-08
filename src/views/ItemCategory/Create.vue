<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-text-field
                                    name="itemcategory_name"
                                    v-model="form.name"
                                    required
                                    outlined
                                    dense
                                    :error-messages="itemCategoryCreate.error.name"
                                    v-on="{ ...tooltip}"
                                    data-unq="itemCategory-input-name"
                                >
                                    <template v-slot:label>
                                        Name<span class="text-red">*</span>
                                    </template>
                                </v-text-field>
                            </template>
                            <span>Name will be shown as item category in mobile application</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip}">
                                    <MultiSelectArea 
                                        @selected="areaSelected"
                                        :dense="true"
                                        :error="itemCategoryCreate.error.region_id"
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
                                        :forImgName="form.name"
                                        :errorMsg="itemCategoryCreate.error.image_url"
                                        :type="'item_tag'"
                                        :extention="'jpeg'"
                                        :accept="'image/jpeg,image/jpg'"
                                        data-unq="itemCategory-upload-image"
                                    ></UploadImage>
                                </div>
                            </template>
                            <span>Image will be shown as item category icon in our mobile application</span>
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
                            data-unq="itemCategory-button-create"
                        >
                            Create
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`" :sendData="itemCategoryCreate.confirm_data"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ItemCategoryCreate",
        computed: {
            ...mapState({
                form: state => state.itemcategory.create_item_category.form,
                itemCategoryCreate: state => state.itemcategory.create_item_category,
            }),
        },
        created() {
            this.fetchItemCategoryCreate()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.itemCategoryCreate.error = err
            });
            this.$root.$on('event_uploadImage', function (image) {
                self.form.image_url = image
            });
        },
        methods: {
            ...mapActions([
                "fetchItemCategoryCreate"
            ]),
            confirmButton() {
                this.itemCategoryCreate.confirm_data = {
                    model: true,
                    title: "Create Item Category",
                    text: "Are you sure want to Create this Item Category?",
                    urlApi: '/catalog/v1/item_category',
                    nextPage: '/catalog/item-category',
                    post: true,
                    data: this.form
                }
            },
            areaSelected(d) { // for select area and set id
                let arr = []
                this.$store.commit('setRegionCategoryListCreate', [])
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit('setRegionCategoryListCreate', arr)
                }
            },
        },
    }
</script>
