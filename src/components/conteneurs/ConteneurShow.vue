<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">
        <!--Debut Chargement v-overlay et message snackbar-->
        <template>
            <div class="text-center" >
                <!--Debut snackbar-->
                <template>
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
                                    class="clickable"
                            >Fermer</v-btn>
                        </template>
                    </v-snackbar>
                </template>
                <!--Fin sanckbar-->

                <!--Debut  overlay-->
                <template>
                    <v-overlay  :value="overlay">
                        <v-progress-linear indeterminate height="25" color="white"></v-progress-linear>
                        <p class="mt-2">Traitement en cours...</p>
                    </v-overlay>
                </template>
                <!--Fin overlay-->
            </div>
        </template>
        <!--Fin Chargement v-overlay et message snackbar-->

        <v-app-bar dark color="#6D3B0F">
            <v-btn color="transparent" class="mr-5" elevation="24" route :to="'/ConteneurIndex'" >
                <v-icon size="28">mdi-chevron-left</v-icon>
                retour
            </v-btn>
            <v-spacer></v-spacer>

            <template v-if=" this.conteneur.numero !=='' ">
                <v-toolbar-title>Conteneur N° {{  this.conteneur.numero }} </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                            <v-btn  @click="modifier(conteneur)"
                                   fab small color="rgba(20, 193, 215, 0.3)"
                                   class="mr-2 clickable"
                                   v-bind="attrs"
                                   v-on="on"
                            ><v-icon small>mdi-pencil</v-icon></v-btn>
                    </template>
                    <span>Modifier</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="supprimer()"
                               fab small color="rgba(255, 96, 96, 0.3)"
                               class="clickable"
                               v-bind="attrs"
                               v-on="on"
                        ><v-icon small>mdi-delete</v-icon></v-btn>
                    </template>
                    <span>Supprimer</span>
                </v-tooltip>

                <v-dialog v-model="dialog" max-width="500px">>
                    <v-card>
                        <v-card-title style="">
                            <span class="headline">Modifier conteneur
                                <v-icon color="" size="28" >mdi-pencil-box</v-icon>
                            </span>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="close"
                                small
                                class="clickable"
                               color="transparent"
                               elevation="0">
                                <v-icon color="error">mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="5">
                                        <v-text-field v-model="editConteneur.numero" label="Dessert numero"></v-text-field>
                                    </v-col>
                                    <v-col cols="12"  sm="6" md="3">
                                        <v-text-field type="number" v-model="editConteneur.taille" label="Taille (en pieds)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-checkbox  v-model="editConteneur.disponible" label="Disponible" ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white darken-1" class="success clickable" text @click="save">Enregister <v-icon class="ml-2">mdi-check</v-icon> </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-app-bar>
        <v-container>
            <div class="text-center mt-10" v-if=" this.conteneur.numero === '' && !this.loading">
                <div class="text-center">
                    <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                    <v-btn rounded  color="error" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
                </div>
            </div>

            <v-row class="mx-auto px-5">
                <v-col cols="12" sm="12">
                        <v-row>
                            <template v-if="this.loading">
                                <v-col cols="12" md="12" lg="12" sm="12" >
                                    <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                                        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                                    </v-sheet>
                                </v-col>
                            </template>
                            <template else>
                                <v-col class="text-center" cols="12" md="3" lg="3" sm="12" v-if=" this.conteneur.numero !== '' " >
                                    <qrcode-vue :value="this.conteneur.numero" size="150" level="H"></qrcode-vue>
                                </v-col>
                                <v-col cols="12" md="9" lg="9" sm="12" class="text-left align-center">
                                    <template v-if="this.conteneur.numero !== ''">
                                        <v-alert
                                            :color="` ${this.conteneur.disponible ? 'success' : 'error'} `"
                                            elevation="2"
                                            class="white--text"
                                        >
                                            <span>{{ `${this.conteneur.disponible ? "Disponible" : "Non disponible"}` }} </span>

                                        </v-alert>
                                        <h2 class="" >N°: {{  this.conteneur.numero }}</h2>
                                        <h3 class="" >Taille: {{ this.conteneur.taille }} pieds</h3>
                                        <span class="" >Date de creation: {{ this.conteneur.created_at }}</span>
                                        <h5 class="mt-2" >Date dernière op entrante: 21/02/2020</h5>
                                        <h5 class="" >Date dernière op sortie: 21/02/2020</h5>
                                    </template>
                                </v-col>
                            </template>
                        </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import QrcodeVue from 'qrcode.vue' //Composante pour le qrcode
    export default {
        name: "ConteneurShow",
        inject:['theme'], //injection de theme pour le skeleton-loader
        props: ['receveIdNumeroConteneur'], //proprietes conteneant le Id et numero du conteneur passé par le composant parent
        components: {
          QrcodeVue
        },
        data: () => ({
            loading:true, //le loading pour le chargement des donnees
            dialog: false,// le dialog pour modal dialog,
            overlay: false,//couche de chargement,
            snackbar:false,
            timeoutSnackbar: 7000,//en milliseconde
            notification: {
                message: '',
                color: ''
            },
            notificationDefault: {
                message: '',
                color: ''
            },
            conteneur: { //l'object conteneur à pres  la mise la jour
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },
            editConteneur: { // l'object ratacher au formulaire
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },
            defaultConteneur: {// le model d'object de base
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },

        }),
        computed:{
            getIdContenneur(){
                return this.receveIdNumeroConteneur.id;
            },
            getNumeroContenneur(){
                return this.receveIdNumeroConteneur.numero;
            },
            resourceConteneur(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('conteneur{/id}', {}, {}, {
                    before:()=>{
                       // this.loading = true
                        this.overlay = true;
                        this.snackbar = false;
                    },
                    after:()=>{
                        //this.loading = false
                        this.overlay = false;
                        this.snackbar = true;
                    }
                })
            }
        },
        watch: {
            //Watcher pour observer le modal dialog et remettre à zero le formulaire à traver la methode close()
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
        methods:{
            //Methode d'initilialisation
            initialize(){
                this.loading=true;
                this.$http.get('conteneur/'+this.getIdContenneur)
                    .then(response => {
                        console.log("success", response);
                        if (response.body !==''){
                            this.conteneur =response.body;
                        }

                    }, response => {
                        console.log("error", response);

                    }).then(()=>{ //une fonction qui sera lancer n'importe le resultat
                    this.loading = false;
                });
            },

            //Methode à appeler quand on clique sur modifier
            modifier(conteneur){
                console.log('modifier', conteneur)
                //this.editedIndex = this.desserts.indexOf(item)
                this.editConteneur =  Object.assign({}, conteneur);
                this.dialog = true
            },

            //Methode à  appeler quand on clique sur le bouton save
            save () {
                //this.conteneur = this.editConteneur;
                this.updateConteneur()
                this.close()
            },
            //Methode à ajax pour faire la mise la jour d'un conteneur
            updateConteneur(){
                //this.dialog= false;
                console.log('uptade before', this.editConteneur)
                var updateConteneur = this.editConteneur
                this.dialog= false; // Attention Appelle du watdcher : dialog
                this.$nextTick(() => {
                    this.$conteneur.update({id: updateConteneur._id}, updateConteneur)
                        .then(response => {
                            console.log("success", response);
                            this.successUpdate(updateConteneur)

                        }, response => {
                            console.log("error", response);
                            this.errorUpdate()
                        }).then(()=>{ //une fonction qui sera lancer n'importe le resultat

                    });
                })
            },
            //Methode à appeler quand la mise à jour est bien passée
            successUpdate(updateConteneur){
                console.log('uptade after index', updateConteneur)
                console.log('uptade after editedItem', updateConteneur)
                this.conteneur = updateConteneur;
                this.notification.message = 'Conteneur '+updateConteneur.numero+ ' mis à jour avec succés';
                this.notification.color = 'success'
            },
            //Methode à appeler quand la mise la mise la jour a échoué
            errorUpdate(){
                this.notification.message = "L'opération de mise à jour a échoué";
                this.notification.color = 'error'
            },

            //Methode sweetlalert pour confimer ou annuler la suppression
            sweetAlertConfirmDelete(numero){
                return this.$swal({
                    title: 'Êtes-vous sûr de vouloir supprimer le conteneur n° ' +numero+' ?',
                    text: "Il n'y aura aucun retour en arrière possible !",
                    type: 'warning',
                    icon: 'warning',
                    cancelButtonText: 'Non, surtout pas !',
                    confirmButtonText: 'Oui supprimer !',
                    showCancelButton: true,
                })
            },

            //Methode à appeler quand on clique sur le bouton supprimer
            async supprimer(){
                var conteneur = this.conteneur;
                console.log('supprimer', conteneur)
                var confirDelete = await this.sweetAlertConfirmDelete(this.conteneur.numero);
                confirDelete = confirDelete.isConfirmed
                if(confirDelete){
                    console.log(confirDelete)
                    this.ajaxDelete()
                }
            },
            //Methode à ajax à appeler pour faire la supression
            ajaxDelete(){
                var _id = this.conteneur._id;
                this.$conteneur.remove({id: _id})
                    .then(response => {
                        console.log("success", response);
                        this.successDelete();

                    }, response => {
                        console.log("error", response);
                        this.errorDelete()
                    }).then(()=>{ //une fonction qui sera lancer n'importe le resultat

                })
            },
            //Methode à appeler qaand la supprimer est reussie
            successDelete(){
                var numero = this.conteneur.numero
                this.$store.state.messageStore = 'Le conteneur n° '+numero+' a été bien supprimé';
                this.$store.state.supprimerStore = true;
                this.$router.push({path: '/conteneurindex'})
            },
            //Methode à appeler quand la suppression est échoué
            errorDelete(){
                this.notification.message = "L'opération de suppression a échoué";
                this.notification.color = 'error'
            },


            //Method à appeler quand on annule une modification
            close () {
                this.editConteneur = Object.assign({}, this.defaultConteneur);
                this.dialog = false
            },
            closeOverlay(){
                this.overlay = false;
            },
            closeSnackbar(){
                this.snackbar = false;
            },





        },
        mounted() {
            //console.log('dessert', this.desserts)
            this.$conteneur = this.resourceConteneur;
            this.initialize();
        }
    }
</script>

<style scoped>

</style>