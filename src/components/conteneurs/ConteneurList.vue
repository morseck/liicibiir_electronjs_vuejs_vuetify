<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">
        <v-app-bar
                dark
                color="#6D3B0F"
        >
            <v-icon class="mr-3">mdi-cube</v-icon>
            <v-toolbar-title>Conteneurs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-if="!loading && this.desserts.length!=0"><span style="font-size: 20px">{{ this.desserts.length }}</span></v-btn>

        </v-app-bar>
        <template  v-if="this.loading">
            <v-sheet
                    class="mr-5 ml-5 mt-5 mb-16"
                    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            >
                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                <v-skeleton-loader
                        type="list-item-three-line"
                >
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="mb-10"
                        type="list-item-avatar"
                >
                </v-skeleton-loader>
            </v-sheet>
            <!--<p class="text-center">Chargement... Patientez svp</p>-->
        </template>

        <v-data-table
            v-else
            :search="search"
            :headers="headers"
            :items="desserts"
            sort-by="numero"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white" class="mt-10 mb-5">

                <v-spacer></v-spacer>
                <v-toolbar-title class="mr-1">Liste des conteneurs</v-toolbar-title>
                <v-divider
                 title="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Recherche"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            Ajouter un conteneur
                            <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title style="">
                            <span class="headline">{{ formTitle }}
                                <v-icon color="" size="28" v-if="editedIndex !==-1">mdi-pencil-box</v-icon>
                                <v-icon color="" size="28" v-else>mdi-plus-box</v-icon>
                            </span>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="5">
                                        <v-text-field v-model="editedItem.numero" label="Dessert numero"></v-text-field>
                                    </v-col>
                                    <v-col cols="12"  sm="6" md="3">
                                        <v-text-field type="number" v-model="editedItem.taille" label="Taille (en pieds)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <!--<v-text-field v-model="editedItem.disponible" label="disponible (g)"></v-text-field>-->
                                        <v-checkbox  v-model="editedItem.disponible" label="Disponible" ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white darken-1" class="error" text @click="close">Annuler <v-icon class="ml-2">mdi-close</v-icon></v-btn>
                            <v-btn color="white darken-1" class="success" text @click="save">Enregister <v-icon class="ml-2">mdi-check</v-icon> </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
           <!--<span>{{item.taille}}</span>-->
           <!-- <a route :to="'/conteneur/' + item.numero">-->
               <v-btn class="clickable mr-2" color="transparent" elevation="0" hover="transparent" route :to="'/conteneur/' + item._id+'/'+item.numero">
                   <v-icon
                           class="clickable"
                           small
                           color="#C46A18"


                   >
                       mdi-eye
                   </v-icon>
               </v-btn>
            <v-btn class="clickable mr-2" @click="editItem(item)" color="" elevation="0" hover="transparent">
                <v-icon small >
                    mdi-pencil
                </v-icon>
            </v-btn>

            <v-btn class="clickable mr-2"  @click="deleteItem(item)" color="" elevation="0" hover="transparent">
                <v-icon small>
                    mdi-delete
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:no-data v-if="this.desserts.length === 0">
            <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
               <v-btn color="primary" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
        </template>
    </v-data-table>
    </v-card>
</template>

<script>
    export default {
        numero: "ConteneurList",
        inject:['theme'],
        components:{
        },
        data: () => ({
            dialog: false,
            search: '',
            headers: [
                {
                    text: 'Numéro',
                    align: 'start',
                    sortable: false,
                    value: 'numero',
                },
                { text: 'Taille', value: 'taille' },
                { text: 'Disponible', value: 'disponible' },
             /*   { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },*/
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            loading:true,
            editedItem: {
                numero: '',
                taille: 0,
                disponible: true,
                /*carbs: 0,
                protein: 0,*/
            },
            defaultItem: {
                numero: '',
                taille: 0,
                disponible: true,/*
                carbs: 0,
                protein: 0,*/
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Ajouter un nouveau conteneur' : 'Modifier ce conteneur'
            },
            resourceConteneur(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('conteneur{/id}', {}, {}, {
                    before:()=>{
                        this.loading = true
                    },
                    after:()=>{
                        this.loading = false
                    }
                })
            },
            /*url(){
                return 'http://127.0.0.1:8085/api';
            },*/

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        /*created () {
            this.initialize()
        },*/

        methods: {
            //methode pour charger les donnees
            initialize ()
            {
                //let url=this.url+'/conteneur';
                //this.loading=true
                this.$conteneur.query()
                    .then(response => {
                        console.log("success", response.body);
                        this.desserts =response.body;

                    }, response => {
                        console.log("error", response);
                        this.desserts = [];


                    }).then(()=>{ //une fonction qui sera lancer n'importe le resultat
                    //this.loading = false;
                });
               /* this.desserts = [
                    {
                        numero: 'Frozen Yogurt',
                        taille: 159,
                        disponible: false,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        numero: 'Ice cream sandwich',
                        taille: 237,
                        disponible: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        numero: 'Eclair',
                        taille: 262,
                        disponible: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        numero: 'Cupcake',
                        taille: 305,
                        disponible: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        numero: 'Gingerbread',
                        taille: 356,
                        disponible: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        numero: 'Jelly bean',
                        taille: 375,
                        disponible: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        numero: 'Lollipop',
                        taille: 392,
                        disponible: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        numero: 'Honeycomb',
                        taille: 408,
                        disponible: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        numero: 'Donut',
                        taille: 452,
                        disponible: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        numero: 'KitKat',
                        taille: 518,
                        disponible: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]*/
            },

            editItem (item) {
                console.log('editer', item);
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Êtes vous sûr de vouloir supprimer le conteneur N° '+ item.numero +' ?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },

        mounted() {
            /*
            Attention l'ordre dans cette partie est primordial
            Car on appelle la recouce this.$conteneur dans la fonction this.initialialize()
            Donc il est vitale de l'appeller (this.$conteneur) d'abord avant d'appeler la fonction this.initaliaze()
             */

            this.$conteneur = this.resourceConteneur;
            this.initialize();
        }
    }
</script>

<style scoped>

</style>