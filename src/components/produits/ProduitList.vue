<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">
        <!--Debut notification overlay et snackbar-->
        <template>
            <div class="text-center" >
                <v-snackbar
                            :color="notification.color"
                            v-model="snackbar" :timeout="timeoutSnackbar">
                        {{this.notification.message}}
                        <template v-slot:action="{attrs}">
                            <v-btn
                                v-bind="attrs"
                                color="cyan"
                                small
                                rounded
                                @click="closeSnackbar"
                                class="clickable">Fermer</v-btn>
                        </template>
                    </v-snackbar>
                <v-overlay  :value="overlay">
                    <v-progress-linear indeterminate height="25" color="white">
                    </v-progress-linear>
                    <p class="mt-2">Traitement en cours...</p>
                </v-overlay>
            </div>
        </template>
        <!--Fin notification overlay et snackbar-->

        <v-app-bar dark color="#6D3B0F">
            <v-icon class="mr-3">mdi-book-multiple</v-icon>
            <v-toolbar-title>Produits</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="!loading && this.desserts.length!==0">
                <v-tooltip left>
                    <template  v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on"
                            fab outlined small
                            color="warning">
                            <span style="font-size: 20px">{{ desserts.length }}</span>
                        </v-btn>
                    </template>
                    <span>Nombre total de produit</span>
                </v-tooltip>
            </template>
        </v-app-bar>

        <template  v-if="this.loading">
            <v-sheet class="mr-5 ml-5 mt-5 mb-5"
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
                <v-skeleton-loader class="mb-10" type="list-item-avatar"></v-skeleton-loader>
            </v-sheet>
        </template>

        <v-data-table
                v-else
                :search="search"
                :headers="headers"
                :items="desserts"
                sort-by="nom"
                class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white" class="mt-10 mb-5">
                    <v-toolbar-title class="mr-1">Liste des produits</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Recherche"
                            single-line
                            hide-details
                            class="clickable"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="cyan" dark rounded outlined small class="mb-2"
                                v-bind="attrs"
                                v-on="on">
                                Ajouter un produit
                                <v-icon small class="ml-2">mdi-plus-circle</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title style="">
                            <span class="">{{ formTitle }}</span>
                                <v-spacer></v-spacer>
                                <v-btn @click="close" small class="clickable" color="transparent" elevation="0">
                                    <v-icon color="error">mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="5">
                                            <v-text-field v-model="editedItem.nom" label="Nom produit"></v-text-field>
                                        </v-col>
                                        <v-col cols="12"  sm="6" md="3">
                                            <v-text-field type="number" v-model="editedItem.quantite" label="Quantite (en kg)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="3">
                                            <v-checkbox  v-model="editedItem.disponible" label="Disponible" ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="editedIndex > -1" color="white darken-1" class="success" text @click="updateProduit">Mettre à jour <v-icon class="ml-2">mdi-check</v-icon> </v-btn>
                                <v-btn v-else color="white darken-1" class="success" text @click="save">Enregister <v-icon class="ml-2">mdi-check</v-icon> </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>
            <template v-slot:item.disponible="{ item }">
                <v-chip :color="getColor(item.disponible)" dark>{{ `${item.disponible ?  "Oui" : 'Non'}` }}</v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" x-small
                            class="clickable mr-2" color="transparent" elevation="2" hover="transparent"
                            route :to="'/produit/' + item._id+'/'+item.nom"><!--Route vers produitDetails-->
                            <v-icon small color="#C46A18">mdi-eye</v-icon>
                        </v-btn>
                    </template>
                    <span>Afficher</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" class="clickable mr-2" x-small
                            @click="editItem(item)" color="transparent" elevation="2" hover="transparent">
                            <v-icon small color="success">
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Modifier</span>
                </v-tooltip>
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" x-small
                            class="clickable"
                            @click="deleteItem(item)" color="transparent" elevation="2" hover="transparent">
                            <v-icon color="error" small>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Supprimer</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data v-if="this.desserts.length === 0">
                <div class="mt-5 mb-5">
                    <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                    <v-btn rounded color="error" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "ProduitList",
        inject:['theme'],
        components:{
        },
        data: () => ({
            loading:true,
            dialog: false,
            overlay: false,//couche de chargement,
            snackbar:false,
            notification: {
                message: '',
                color: ''
            },
            notificationDefault: {
                message: '',
                color: ''
            },
            timeoutSnackbar: 7000,//en milliseconde
            search: '',
            headers: [
                {
                    text: 'Nom',
                    align: 'start',
                    sortable: true,
                    value: 'nom',
                },
                { text: 'Quantite (en kg)', value: 'quantite' },
                { text: 'Disponible (oui ou non)', value: 'disponible' },

                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                _id: '',
                quantite: 0,
                disponible: true,
                created_at: '',
                updated_at: '',
            },
            defaultItem: {
                _id: '',
                quantite: 0,
                disponible: true,
                created_at: '',
                updated_at: '',

            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Ajouter un nouveau produit' : 'Modifier ce produit'
            },
            resourceConteneur(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('produit{/id}', {}, {}, {
                    before:()=>{
                        this.overlay = true;
                        this.snackbar = false;
                    },
                    after:()=>{
                        this.overlay = false;
                        this.snackbar = true;
                    }
                })
            },

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            overlay(val){
                val ||  this.closeOverlay()
            },
            snackbar(val){
                val || this.closeSnackbar()
            }
        },

        methods: {
            //methode pour charger les donnees
            initialize () {
                this.loading=true
                this.$http.get("produit")
                    .then(response => {
                        console.log("success", response.body);
                        this.desserts =response.body;

                    }, response => {
                        console.log("error", response);
                        this.desserts = [];

                    }).then(()=>{ //une fonction qui sera lancer n'importe le resultat
                    this.loading = false;
                });
            },
            getColor(etat){
                return etat ? 'success' : 'error';
            },
            //Methode pour creer un model de produit
            createProduit(){
                var newProduit = {
                    'nom': this.editedItem.nom,
                    'quantite': this.editedItem.quantite,
                    'disponible': this.editedItem.disponible
                    
                };

                console.log('newProduit before', newProduit)
                this.$produit.save(newProduit)
                    .then(response => {
                        console.log("success", response);
                        this.editedItem =response.body;
                        this.desserts.push(this.editedItem);
                        this.notification.message = 'Produit '+this.editedItem.nom+ ' ajouté avec succés';
                        this.notification.color = 'success'

                    }, response => {
                        console.log("error", response);
                        this.notification.message = "L'opération d'enregistrement a échoué";
                        this.notification.color = 'error'

                    }).then(()=>{ //une fonction qui sera lancer n'importe le resultat
                    this.close()
                });
            },

            updateProduit(){

                //this.dialog= false;
                console.log('uptade before', this.editedItem)
                console.log('uptade index', this.editedIndex )
                var updateProduit = this.editedItem
                var updateIndex = this.editedIndex
                this.dialog= false; // Attention Appelle du watdcher : dialog
                this.$nextTick(() => {

                    this.$produit.update({id: updateProduit._id}, updateProduit)
                        .then(response => {
                            console.log("success", response);
                            Object.assign(this.desserts[updateIndex], updateProduit)
                            this.notification.message = 'Produit '+updateProduit.nom+ ' mit à jour avec succés';
                            this.notification.color = 'success'

                        }, response => {
                            console.log("error", response);
                            this.notification.message = "L'opération de mise à jour a échoué";
                            this.notification.color = 'error'

                        }).then(()=>{ //une fonction qui sera lancer n'importe le resultat

                    });
                })
            },
            editItem (item) {
                console.log('editer', item);
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            //Methode de confirm dialog avec sweetalert
            sweetAlertConfirmDelete(nom){
                return this.$swal({
                    title: 'Êtes-vous sûr de vouloir supprimer le produi [' +nom+' ] ?',
                    text: "Il n'y aura aucun retour en arrière possible !",
                    type: 'warning',
                    icon: 'warning',
                    cancelButtonText: 'Non, surtout pas !',
                    confirmButtonText: 'Oui supprimer !',
                    showCancelButton: true,
                })
            },

            //Methode de suppresion quand on clique sur le bouton supprimer
            async deleteItem (item) {
                const index = this.desserts.indexOf(item)
                console.log('itemDelete', item)
                var confirmDelete =   await this.sweetAlertConfirmDelete(item.nom)
                confirmDelete = confirmDelete.isConfirmed
                console.log("confirm", confirmDelete)
                if (confirmDelete){
                    this.$produit.delete({id: item._id})
                        .then((response) => {
                            console.log("success", response);
                            this.desserts.splice(index, 1)
                            this.notification.message = 'Produit ['+item.nom+ '] a été bien supprimé.';
                            this.notification.color = 'success'
                        }, response => {
                            console.log("error", response);
                            this.notification.message = "L'opération de suppression du prdouti  ["+ item.numero+"] a échoué.";
                            this.notification.color = 'error'

                        }).then(()=>{ //une fonction qui sera lancer n'importe le resultat

                    })
                }
            },

            //Methode à appeler quand on annule le modal dialog d'ajout ou de modification
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            //Meethode de fermeture du overlay
            closeOverlay(){
                this.overlay = false;
            },
            //Methode de fermeture du snackbar
            closeSnackbar(){
                this.snackbar = false;
            },
            //Methode à appeler quand on clique sur enregistrer
            save () {
                if (this.editedIndex > -1) {//cas de modification
                    // Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    this.updateProduit()
                } else {//cas de creation
                    //this.desserts.push(this.editedItem)
                    this.createProduit()
                }
                this.close()
            },

            //Methode d'activation du du snacknbar avec le systeme de $store
            activeSnackbarNotification(){
                this.notification.message = this.$store.state.messageStore;
                this.notification.color = 'success';

            },

            //Methode pour reinitialiser le $store
            reinitilizeStore(){
                this.$store.commit("initializeStoreState")

            }
        },

        async mounted() {
            /*
            Attention l'ordre dans cette partie est primordial
            Car on appelle la recouce this.$produit dans la fonction this.initialialize()
            Donc il est vitale de l'appeller (this.$produit) d'abord avant d'appeler la fonction this.initaliaze()
             */

            this.$produit = await this.resourceConteneur;
            this.initialize();
            if( this.$store.state.supprimerStore){
                this.snackbar = true;
                this.activeSnackbarNotification();
                this.reinitilizeStore()
            }
        }
    }
</script>

<style scoped>

</style>