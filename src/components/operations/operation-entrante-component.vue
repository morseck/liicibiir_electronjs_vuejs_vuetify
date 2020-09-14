<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">
        <!--Debut snackbar et overlay-->
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
                            class="clickable">Fermer</v-btn>
                </template>
            </v-snackbar>

            <v-overlay  :value="overlay">
                <v-progress-linear indeterminate height="25" color="white">
                </v-progress-linear>
                <p class="mt-2">Traitement en cours...</p>
            </v-overlay>
        </template>
        <!--Fin snackbar et overlay-->

        <v-app-bar dark color="#6D3B0F">
            <v-icon class="mr-5">mdi-swap-vertical</v-icon>
            <v-toolbar-title>Opérations</v-toolbar-title>
            <v-spacer></v-spacer>
            <span>Formulaire opération entrante</span>
        </v-app-bar>

        <v-container>
            <v-row>
                <v-col cols="12" sm="12" class="ml-5 mr-5">
                    <template>
                        <v-col cols="12" sm="11" class="mb-2">
                            <v-card class="px-5 pb-5 pt-5">
                                <v-form ref="form" class="mt-5 ml-10 mr-10">
                                    <template v-if="loading.loadingConteneur">
                                        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                                 class="mb-5">
                                            <v-skeleton-loader type="card" height="53"></v-skeleton-loader>
                                        </v-sheet>
                                    </template>
                                    <div class="mb-2 pa-4" style="border: 2px solid #00c853; border-radius: 10px">
                                        <h4 class="display-1">Mode d'operation: <strong>Entrante</strong></h4>
                                        <v-btn fab  color="success" class="float-right">
                                            <v-icon>mdi-clipboard-arrow-down</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-container
                                        v-for="(op, indexConteneur) in operation.conteneur"
                                        :key="indexConteneur"
                                        class="mb-5"
                                        style="border: 2px solid #A95E19; border-radius: 10px">
                                       <v-container class="mb-10">
                                           <h3 class="float-left" >Bloc conteneur {{ indexConteneur+1 }}</h3>
                                           <v-tooltip left>
                                               <template  v-slot:activator="{ on, attrs }">
                                                           <v-btn v-bind="attrs" v-on="on"
                                                              @click="supprimerBlocConteneur(indexConteneur)"
                                                              v-if="operation.conteneur.length>1"
                                                              fab small  color="error"
                                                              class="clickable bottom float-right">
                                                       <v-icon>mdi-close</v-icon>
                                                   </v-btn>
                                               </template>
                                               <span>Supprimer ce bloc conteneur</span>
                                           </v-tooltip>
                                       </v-container>

                                        <template v-if="loading.loadingConteneur">
                                            <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                                     class="mb-5">
                                                <v-skeleton-loader type="card" height="53"></v-skeleton-loader>
                                            </v-sheet>
                                        </template>
                                        <v-select
                                               v-else
                                               v-model="op.numero"
                                               :items="getConteneurList"
                                               label="Numéro du conteneur"
                                               required
                                               outlined
                                       ></v-select>
                                        <template v-if="loading.loadingConteneur">
                                            <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                                     class="mb-5">
                                                <v-skeleton-loader type="card" height="120"></v-skeleton-loader>
                                            </v-sheet>
                                        </template>
                                        <template v-if="conteneurList.length > 0">
                                            <template v-if="loading.loadingProduit">
                                                <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                                         class="mb-5">
                                                    <v-skeleton-loader type="card" height="120"></v-skeleton-loader>
                                                </v-sheet>
                                            </template>
                                            <v-container
                                                    v-for="(produit, indexProduit) in op.produit"
                                                    :key="indexProduit"
                                                    style="border: #A95E19 1px solid; border-radius: 10px"
                                                    class="mt-2">
                                                <template>
                                                    <v-tooltip right>
                                                        <template  v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                                    @click="supprimerBlocProduit(indexConteneur, indexProduit)"
                                                                    v-if="op.produit.length > 1"
                                                                    v-bind="attrs" v-on="on"
                                                                    fab x-small color="error" outlined class="clickable float-left">
                                                                <v-icon x-small>mdi-delete</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Supprimer ce bloc produit</span>
                                                    </v-tooltip>
                                                    <h4 class="float-right" >Bloc produit {{ indexProduit+1 }}</h4>
                                                </template>
                                                <br>
                                                <v-row>
                                                    <template v-if="produitList.length===0 && loading.loadingProduit===false">
                                                        <v-col cols="12" sm="12" class="text-center">
                                                            <v-btn
                                                                    @click="responseAjaxGetProduitList"
                                                                    fab color="error" class="clickable mb-4">
                                                                <v-icon >mdi-reload</v-icon>
                                                            </v-btn>
                                                            <p>Aucun produit chargé <v-icon color="warning">mdi-alert</v-icon></p>
                                                        </v-col>
                                                    </template>
                                                    <template v-if="produitList.length !== 0">
                                                        <v-col cols="12" sm="4">
                                                            <v-select
                                                                :items="produitList"
                                                                v-model="produit.nom"
                                                                label="Nom produit"
                                                                required
                                                            ></v-select>
                                                        </v-col>
                                                        <v-col cols="12" sm="4">
                                                            <v-text-field
                                                                v-model="produit.quantite"
                                                                label="Quantité (kg)"
                                                                counter
                                                                type="number"
                                                                maxlength="10"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="4">
                                                            <v-select
                                                                    v-model="produit.calibre"
                                                                    :items="calibreList"
                                                                    label="Calibre"
                                                                    required
                                                            ></v-select>
                                                        </v-col>
                                                    </template>

                                                </v-row>
                                            </v-container>
                                            <div class="text-right">
                                                <v-btn
                                                    @click="ajouterNouveauBlocProduit(indexConteneur)"
                                                    v-if="loading.loadingValideOperation === false && produitList.length !==0"
                                                    x-small outlined
                                                    color="#A95E19" class="clickable mt-5">
                                                    Ajouter un nouveau bloc produit
                                                </v-btn>
                                            </div>
                                        </template>

                                    </v-container>
                                    <v-row class="text-center">
                                       <template v-if="conteneurList.length > 0 && produitList.length > 0">
                                           <v-col cols="12" sm="12">
                                               <v-btn
                                                   @click="ajouterNouveauBlocContneur"
                                                   v-if="loading.loadingValideOperation === false"
                                                   small  class="clickable" color="#A95E19"
                                                   style="color: #FFF">
                                                   Ajouter un nouveau bloc conteneur
                                               </v-btn>
                                           </v-col>
                                           <v-col cols="12" sm="12" >
                                               <v-progress-circular
                                                    v-if="loading.loadingValideOperation"
                                                    indeterminate="">
                                               </v-progress-circular>
                                               <template v-else>
                                                   <v-btn
                                                       @click="saveNewOperation"
                                                       v-if="operationValide"
                                                       x-large color="success"  class="clickable">
                                                       Valider l'opération
                                                       <v-icon class="ml-2">mdi-check-circle</v-icon>
                                                   </v-btn>
                                               </template>
                                           </v-col>
                                       </template>
                                        <v-col v-if="conteneurList.length===0 && loading.loadingConteneur===false"
                                               cols="12" sm="12">
                                            <v-btn
                                                @click="initialize"
                                                fab color="error"
                                                class="clickable mb-4">
                                                <v-icon >mdi-reload</v-icon>
                                            </v-btn>
                                            <p>Aucune donnée chargée  <v-icon color="warning">mdi-alert</v-icon></p>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <template v-if="conteneurList.length > 0 && produitList.length > 0">
                                                <v-btn
                                                    v-if="loading.loadingValideOperation === false"
                                                    @click="isOperationValide"
                                                    color="cyan"
                                                    class="clickable" style="color: #FFF">
                                                    Verification Validité de l'opération
                                                </v-btn>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card>
                        </v-col>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "operation-entrante-component",
        inject:['theme'],
        data:()=>({
            loading: {
                loadingConteneur: false,
                loadingProduit: false,
                loadingOperation: false,
                loadingValideOperation: false
            },
            operationValide : false,
            snackbar: false,
            overlay: false,
            notification: {
                message: '',
                color: ''
            },
            timeoutSnackbar: 7000,
            mode_operation: [],
            conteneurList: [],
            calibreList:[
                '100 - 200',
                '300 - 400',
                '500 - 600'
            ],
            produitList: [],
            operation: {
                mode_operation: 'entrante',
                conteneur:[{
                    numero: '',
                    produit: [{
                        nom: '',
                        quantite: '',
                        calibre: ''
                    }]
                }]
            },
            defaultBlocConteneur: {
                numeroConteneur: '',
                produits: [{
                    nomProduit: '',
                    quantite: '',
                    calibrage: ''
                }]
            },
            defaultBlocProduit:{
                nomProduit: '',
                quantite: '',
                calibrage: ''
                }
        }),
        computed:{
            getConteneurList(){return this.conteneurList},
            resourceOperation(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('operation/entrante{/id}', {}, {}, {
                    before:()=>{
                        this.overlay = true;
                        this.snackbar = false;
                    },
                    after:()=>{
                        this.overlay = false;
                        this.snackbar = true;
                    }
                })
            }
        },
        methods:{
            initialize(){
                this.responseAjaxGetConteneurList()
                this.responseAjaxGetProduitList()
            },
            async responseAjaxGetConteneurList(){
                let response = '';
                this.loading.loadingConteneur = true;
                response = await this.ajaxGet('conteneur/disponible')
                if (Array.isArray(response)){
                    this.conteneurList = await this.pushConteneurList(response)
                    this.mode_operation = [// false= entrante ::::: true= sortante
                        'Entrante',
                        'Sortante'
                    ]
                }
                this.loading.loadingConteneur = false
            },
            async responseAjaxGetProduitList(){
                let response = '';
                this.loading.loadingProduit = true;
                response = await this.ajaxGet('produit/disponible')
                if (Array.isArray(response)){
                    this.produitList = await this.pushProduitList(response)
                }
                this.loading.loadingProduit = false
            },

            //methode pour transformer la reponseajax en tableau simple de numeroconteneur
            pushConteneurList(response){
                var tab = [];
                for (let i in response){
                    tab.push(response[i].numero)
                }
                return tab;
            },
            pushProduitList(response){
                var tab = [];
                for (let i in response){
                    tab.push(response[i].nom)
                }
                return tab;
            },

            async ajaxGet(url){
                var result = '';
                await this.$http.get(url)
                    .then(response=>{
                        console.log("success-"+url, response)
                        result =  response.body
                    }, response=>{
                        console.log("error-"+url, response)
                    });
                return result;
            },
            ajouterNouveauBlocContneur(){
                this.operationValide = false
                var blocConteneur = {
                    numero: '',
                    produit: [{
                        nom: '',
                        quantite: '',
                        calibre: ''
                    }]
                };
                this.operation.conteneur.push(blocConteneur)
            },
            supprimerBlocConteneur(index){
                this.operation.conteneur.splice(index, 1)
            },
            supprimerBlocProduit(indexConteneur, indexProduit){
                this.operation.conteneur[indexConteneur].produit.splice(indexProduit, 1)
            },
            ajouterNouveauBlocProduit(indexConteneur){
                this.operationValide = false
                var blocProduit = {
                    nom: '',
                    quantite: '',
                    calibre: ''
                };
                console.log(indexConteneur)
                this.operation.conteneur[indexConteneur].produit.push(blocProduit)
            },
            async isOperationValide(){
                var op = this.operation.conteneur;
                this.loading.loadingValideOperation = true;
                var isvalid = false;
                console.log('avant isValid: ', isvalid);
                this.operationValide = await this.verificationOperation(op);
                console.log('apres isValid: ',isvalid);
                this.loading.loadingValideOperation = false;
                this.messageVerificationValideOperation()
            },
            async verificationOperation(op){
                let rest = true;
                if (this.operation.mode_operation === ''){
                    return false
                }
                for (let i in op){
                    console.log("i", op[i]);
                    if (op[i].numero === ''){
                        return rest = false
                    }
                    for (let j in op[i].produit) {
                        if (op[i].produit[j].nom === ''){
                            return rest = false
                        }
                    }
                }
                return rest;
            },

            messageVerificationValideOperation(){
                if (this.operationValide){
                    this.snackbar = true;
                    this.notification.message = "L'opération est valide. Vous pouvez maintenant la soumettre"
                    this.notification.color = "success"
                }else {
                    this.snackbar = true;
                    this.notification.message = "L'opération n'est pas valide. Assurez-vous de remplir tous les champs"
                    this.notification.color = "error"
                }
            },

            saveNewOperation(){
                var modeOperation = this.operation.mode_operation=== 'Sortante' ? false : true;
                var newOperatoin= {
                    mode_operation : modeOperation,
                    operation : {
                        conteneur: this.operation.conteneur
                    }
                }
                console.log("operation", this.operation)
                this.$operation.save(newOperatoin)
                    .then(response => {
                        console.log("success", response);
                        this.notification.message = 'l\'Opération a été bien enregistrée ';
                        this.notification.color = 'success';
                        this.sweetAlertOperationSaveSuccess();
                        this.reinitaliseFormDefault();

                    }, response => {
                        console.log("error", response);
                        this.notification.message = "L'opération d'enregistrement a échoué";
                        this.notification.color = 'error'

                    });
            },
            //Methode pour reinitialiser le formulaire par default apres l'opération success
            reinitaliseFormDefault(){
               this.close0perationValide();
                var blocConteneurinit = [{
                    numero: '',
                    produit: [{
                        nom: '',
                        quantite: '',
                        calibre: ''
                    }]
                }];
                this.operation.conteneur = blocConteneurinit
            },

            sweetAlertOperationSaveSuccess(){
                return this.$swal({
                    title: 'Opération enregistrée',
                    text: "L'opération entrante a été enregistrée avec succes",
                    type: 'success',
                    icon: 'success',
                })
            },

            //Methode de fermeture du snackbar
            closeSnackbar(){
                this.snackbar = false;
            },
            closeOverlay(){
                this.overlay = false
            },
            close0perationValide(){
                this.operationValide = false;
            }
        },
        watch:{
            overlay(val){
                val ||  this.closeOverlay()
            },
            snackbar(val){
                val ||  this.closeSnackbar()
            },
        },
        async mounted() {
            this.$operation = await this.resourceOperation;
            this.initialize()
        }

    }
</script>

<style scoped>

</style>