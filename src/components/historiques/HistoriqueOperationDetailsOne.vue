<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <template v-if="loading">
                        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                 class="mb-5">
                            <v-skeleton-loader type="card"></v-skeleton-loader>
                            <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
                        </v-sheet>
                    </template>

                    <template v-if="loading===false && this.operation._id !=='' ">
                        <div class="mb-2 pa-4" :style="'border: 2px solid'+ this.getColorCss()+' ; border-radius: 10px'">
                            <h4 class="display-1 font-weight-light">Mode d'operation: <strong>{{ this.getTranslateMode_operation() }}</strong></h4>
                            <br>
                            <h2 class="font-weight-regular"><v-icon>mdi-calendar</v-icon> <strong>{{ this.getDate(this.operation.created_at )}}</strong></h2>
                            <h3>Quantite total: {{ this.quantiteTotalOperation }} kg</h3>
                            <v-btn fab  :color="this.getColor(this.getTranslateMode_operation())" class="float-right">
                                <v-icon>{{ this.getIconModeOperation() }}</v-icon>
                            </v-btn>

                        </div>
                        <v-container
                                v-for="(op, indexConteneur) in this.operation.conteneur"
                                :key="indexConteneur"
                                class="mb-5"
                                style="border: 2px solid #A95E19; border-radius: 10px">
                            <v-container class="mb-3">
                                <h3 class="float-left" >Bloc conteneur {{ indexConteneur+1 }}</h3>
                            </v-container>
                            <v-col cols="12" sm="12"><h2>Numero Conteneur: <strong class="ml-1">{{ op.numero }}</strong></h2></v-col>
                            <v-container
                                    v-for="(produit, indexProduit) in op.produit"
                                    :key="indexProduit"
                                    style="border: #A95E19 1px solid; border-radius: 10px"
                                    class="mt-2">
                                <template>
                                    <h4 class="float-right" >Bloc produit {{ indexProduit+1 }}</h4>
                                </template>
                                <br>
                                <v-row>
                                    <template v-if="op.produit.length !== 0">
                                        <v-col cols="12" sm="4">
                                            Nom produit <br>
                                            <h3>{{ produit.nom }}</h3>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            Quantite (kg)<br>
                                            <h3>{{ produit.quantite }}</h3>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            Calibre <br>
                                            <h3>{{ produit.calibre }}</h3>
                                        </v-col>
                                    </template>

                                </v-row>
                            </v-container>
                        </v-container>
                    </template>

                    <template v-if="loading === false && this.operation._id === '' ">
                        <div class="mt-5 mb-5 text-center">
                            <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                            <v-btn rounded color="error" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
                        </div>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
    export default {
        name: "HistoriqueOperationDetailsOne",
        inject:['theme'],
        props: ['idOperation'],
        data: ()=>({
            loading:false,
            quantiteTotalOperation: 0,
            operation:{
                _id: '',
                created_at: '',
                mode_operation: '',
                conteneur: [{
                    numero: '',
                    produit: [{
                        nom: '',
                        quantite: '',
                        calibre: ''
                    }]
                }]
            },
            operationDefault:{
                _id: '',
                created_at: '',
                mode_operation: '',
                conteneur: [{
                    numero: '',
                    produit: [{
                        nom: '',
                        quantite: '',
                        calibre: ''
                    }]
                }]
            }
        }),
        methods:{
            initialize(){
                this.responseAjaxGetOperationDetails()
            },

            //Methode qui recupere les details d'une opreation de la methode ajax
            async responseAjaxGetOperationDetails(){
                this.loading = true;
                const response = await this.ajaxGetOperationDetails(this.idOperation)
                this.remplirOperation(response)
                this.getQuantiteTotal()
                this.loading = false
            },

            remplirOperation(item){
                this.operation._id = item._id;
                this.operation.mode_operation = item.mode_operation;
                this.operation.created_at = item.created_at;
                this.operation.conteneur = item.operation === undefined ? item.conteneur : item.operation[0].conteneur;
                console.log("operation", this.operation.conteneur)
            },

            //Methode ajax qui retourne les détails d'une opération
            async ajaxGetOperationDetails(id){
                const url = 'operation/'+id;
                var result = this.operationDefault;
                await this.$http.get(url)
                    .then(response=>{
                        console.log("success-"+url, response)
                        result =  response.body
                    }, response=>{
                        console.log("error-"+url, response)
                    });
                return result;
            },

            getColor(etat){
                return etat.toLowerCase()==="entrante".toLowerCase() ? 'success' : 'error';
            },
            getColorCss(){
                return this.operation.mode_operation ? '#00c853' : '#C80B0C';
            },
            getIconModeOperation(){
                return this.operation.mode_operation ? 'mdi-clipboard-arrow-down' : 'mdi-clipboard-arrow-up';
            },
            getTranslateMode_operation(){
                return this.operation.mode_operation ? 'Entrante' : 'Sortante'
            },
            getDate(){
                let mongoObject = this.operation.created_at;
                let years =new Date(mongoObject).getUTCFullYear();
                let months =new Date(mongoObject).getUTCMonth();
                let days = new Date(mongoObject).getUTCDate();
                let hours = new Date(mongoObject).getUTCHours();
                let minutes = new Date(mongoObject).getUTCMinutes();
                let secondes = new Date(mongoObject).getUTCSeconds();

                let date =  new Date(Date.UTC(years, months, days, hours, minutes, secondes));
                let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}

                return date.toLocaleDateString ('fr-FR', options)
            },
            getQuantiteTotal(){
                for (let i=0; i < this.operation.conteneur.length; i++){
                    let op = this.operation.conteneur[i]
                    for (let j=0; j < op.produit.length; j++){
                        if(op.produit[j].quantite !== '')
                            this.quantiteTotalOperation += parseInt(op.produit[j].quantite)
                    }
                }
            }


        },
        mounted() {
            this.initialize()
        },
    }
</script>

<style scoped>

</style>