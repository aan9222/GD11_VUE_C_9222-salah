<template>
    <v-data-table :headers="headers" :items="minuman" :search="search" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Crud Atma pedia</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                 <v-text-field
                    v-model="search"
                    append-icon="mdi-search-web"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">buat minuman</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                    
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="Minuman name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-overflow-btn v-model="editedItem.calories" :items="dropdown" label="Calories"></v-overflow-btn>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>

                            <v-spacer></v-spacer>

                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon class="mr-1" @click="editItem(item)">mdi-silverware</v-icon>
            <v-icon class="mr-1" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

    </v-data-table>
</template>

<script>

import{ minumanRef } from '../firebase';

    export default {
        data: () => ({
            dropdown : ['Es','Hangat'],
            cek : -1,
            search:'',
            dialog: false,
            headers: [{
                    text: 'Minuman (per-gelas)',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Calories',
                    value: 'calories'
                },
                {
                    text: 'Fat (g)',
                    value: 'fat'
                },
                {
                    text: 'Carbs (g)',
                    value: 'carbs'
                },
                {
                    text: 'Protein (g)',
                    value: 'protein'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            minuman: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),
        firebase: {
            minuman : minumanRef
        },
        computed: {
            formTitle() {
                return this.cek === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
  /*    created () {
            this.initialize()
          }, */

        methods: {
            /*initialize () {
            this.desserts = [
              {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
              },
              {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
              },
              {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
              },
              {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
              },
              {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
              },
              {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
              },
              {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
              },
              {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
              },
              {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
              },
              {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
              },
            ]
          }, */
            close() {
                this.dialog = false
            },
            
            save() {
                if (this.cek > -1) {
                    minumanRef.child(this.editedIndex).set({
                        name : this.editedItem.name,
                        calories : this.editedItem.calories, 
                        fat : this.editedItem.fat,
                        carbs: this.editedItem.carbs,
                        protein: this.editedItem.protein})
                        this.clear()
                } else {
                    minumanRef.push({
                        name: this.editedItem.name,
                        calories: this.editedItem.calories,
                        fat: this.editedItem.fat,
                        carbs: this.editedItem.carbs,
                        protein: this.editedItem.protein})
                        this.clear()
                }
                this.close()
            },
            editItem (item) {
                this.editedIndex = item['.key']
                this.cek = 0
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem(item) {
                confirm('Are you sure you want to delete this item?') && minumanRef.child((item['.key'])).remove()
            },
            clear(){
                this.editedItem={}
                this.editedItem.name= ''
                this.editedItem.calories= 0
                this.editedItem.fat= 0
                this.editedItem.carbs= 0
                this.editedItem.protein= 0
                this.cek=-1
            }
        },
    }
</script>