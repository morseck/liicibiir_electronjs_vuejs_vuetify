<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card flat class="mr-5 ml-5">
        <template  v-if="this.loading">
            <v-sheet
                class="mr-5 ml-5 mt-5 mb-5"
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
            </v-sheet>
        </template>

        <template v-else>
            <v-data-table class="ml-5 mr-5"
                  :headers="headers"
                  :items="desserts"
                  :search="search"
                  sort-by="created_at">
                <template v-slot:top>
                    <!--Debut Modal dialog-->
                    <template>
                        <v-row justify="center">
                            <v-dialog
                                v-model="dialog"
                                persistent
                                scrollable
                                transition="dialog-bottom-transition"
                                max-width="900px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Détails opération</span>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            @click="close"
                                            small fab outlined
                                            class="clickable"
                                            color="error"
                                            elevation="0">
                                            <v-icon color="error">mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                        <!--Debut Historique Operation Details One-->
                                    <template v-if="idOperation!==-1">
                                        <HistoriqueOperationDetailsOne v-bind:id-operation="idOperation"></HistoriqueOperationDetailsOne>
                                    </template>
                                        <!--Fin Historique Operation Details One-->
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error darken-1" text @click="close" class="clickable">Fermer</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </template>
                    <!--Fin Modal dialog-->


                    <v-toolbar flat color="white" class="mt-10 mb-5">
                        <v-toolbar-title class="mr-1">
                           {{ `${
                                    urlOperation === 'operation/all' ? 'Liste de toutes les opérations'
                                    :urlOperation === 'operation/entrante' ? 'Liste des opérations entrantes'
                                    : 'Liste des opérations sortantes'
                            }` }}
                        </v-toolbar-title>

                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Recherche"
                                single-line
                                hide-details
                                class="clickable"
                        ></v-text-field>

                    </v-toolbar>
                </template>
                <template v-slot:item.mode_operation="{ item }">
                    <v-chip :color="getColor(item.mode_operation)" dark>{{ item.mode_operation  }}</v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                x-small
                                class="clickable mr-2" color="transparent" elevation="0" hover="transparent"
                                @click="showDetailsOperation(item._id)"><!--Route vers operationDetails-->
                                <v-icon small color="#C46A18">mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>Voir détails</span>
                    </v-tooltip>
                </template>

                <template v-slot:no-data v-if="this.desserts.length === 0">
                    <div class="mt-5 mb-5">
                        <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                        <v-btn rounded color="error" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
                    </div>
                </template>
            </v-data-table>
        </template>
    </v-card>
</template>

<script>
    import HistoriqueOperationDetailsOne from '../historiques/HistoriqueOperationDetailsOne'
    export default {
        name: "HistoriqueOperation",
        inject:['theme'],
        props: ['urlOperation'],
        components:{
          HistoriqueOperationDetailsOne
        },
        data: ()=>({
            loading:true,
            dialog: false,
            search: '',
            headers: [
                {
                    text: 'Date Opération',
                    align: 'start',
                    value: 'created_at',
                },
                { text: 'Mode d\'opération', value: 'mode_operation' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            idOperation: -1, //Cas false par default
        }),
        computed:{
            resourceHistoriqueOperationAll(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('operation{/id}', {}, {}, {
                    before:()=>{ this.loading = true },
                    after:()=>{ this.loading = false }
                })
            },
        },
        watch:{
            dialog (val) {
                val || this.close()
            },
        },
        methods:{
            initialize(){
                this.responseAjaxGetHistoriqueOperation()
            },
            //Methode qui recupere l'historique de toutes opreation de la methode ajax
            async responseAjaxGetHistoriqueOperation(){
                this.loading = true;
                const arrayResponse = await this.ajaxGetHistoriqueOperation(this.urlOperation)
                this.remplirArray(arrayResponse)
               // console.log("desserts", this.desserts)
                this.loading = false
            },
            remplirArray(items){
                for (let i = 0; i < items.length; i++){
                    var dessert = {
                        created_at: this.getDate(items[i].created_at),
                        mode_operation: this.getTranslateMode_operation(items[i].mode_operation),
                        _id: items[i]._id
                    }
                    this.desserts.push(dessert)
                }
            },
            //Methode ajax qui retourne le nombre total d'item
            async ajaxGetHistoriqueOperation(url){
                var result = [];
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
            getTranslateMode_operation(mode_operation){
              return mode_operation ? 'Entrante' : 'Sortante'
            },

            getDate(mongoObject){
              let years =new Date(mongoObject).getUTCFullYear();
              let months =new Date(mongoObject).getUTCMonth();
              let days = new Date(mongoObject).getUTCDate();
              let hours = new Date(mongoObject).getUTCHours();
              let minutes = new Date(mongoObject).getUTCMinutes();
              let secondes = new Date(mongoObject).getUTCSeconds();

             let date =  new Date(Date.UTC(years, months, days, hours, minutes, secondes));
             let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}

             return date.toLocaleDateString ('fr-FR', options)
            },
            //Methode à appeler quand on annule le modal dialog d'ajout ou de modification
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.idOperation = -1
                })
            },
            showDetailsOperation(idOperation){
              this.dialog = true;
              this.idOperation = idOperation;
              console.log('idOperation', this.idOperation)
            },
            redirectPage(id){
                this.$router.push({path: '/'+id})
            }
        },
        mounted() {
            this.initialize()
        }
    }
</script>

<style scoped>

</style>

