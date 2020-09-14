<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">
        <v-app-bar
                dark
                color="#6D3B0F"
        >
            <v-btn icon>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-toolbar-title>Tableau de bord</v-toolbar-title>
        </v-app-bar>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                        <v-card :elevation="hover ? 16 : 2"
                            class="mx-auto"
                            max-width="344"
                            outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Conteneurs</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar tile size="80" color="green">
                                    <v-icon dark>mdi-cube</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  @click.stop="redirectPage('conteneurIndex')" class="clickable" >
                                <v-progress-circular
                                    v-if="loading.loadingConteneur"
                                    indeterminate></v-progress-circular>
                                <v-btn v-else   @click.stop="responseAjaxGetTotalConteneur"
                                       class="clickable"  elevation="0" color="#DEDEDE" >
                                   <span :class="`${getTotalConteneur !== '' ? 'display-1' : ' '}`" >
                                       <template v-if='getTotalConteneur !=="" '>{{ getTotalConteneur }}</template>
                                       <template v-else><v-icon>mdi-reload</v-icon></template>
                                   </span>
                               </v-btn>
                                <v-spacer></v-spacer>
                                <v-icon flag color="2c3A47">mdi-chevron-right</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                        <v-card :elevation="hover ? 16 : 2"
                            class="mx-auto"
                            max-width="344"
                            outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Produits</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar tile size="80" color="rgb(196,106,24)">
                                    <v-icon dark>mdi-book-multiple</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  @click.stop="redirectPage('produitsIndex')" class="clickable" >
                                <v-progress-circular
                                        v-if="loading.loadingProduit"
                                        indeterminate>
                                </v-progress-circular>
                                <v-btn v-else   @click.stop="responseAjaxGetTotalProduit"
                                       class="clickable"  elevation="0" color="#DEDEDE" >
                                   <span :class="`${getTotalProduit !== '' ? 'display-1' : ' '}`" >
                                       <template v-if='getTotalProduit !=="" '>{{ getTotalProduit }}</template>
                                       <template v-else><v-icon>mdi-reload</v-icon></template>
                                   </span>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-icon flag color="2c3A47">mdi-chevron-right</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                        <v-card :elevation="hover ? 16 : 2" class="mx-auto"
                            max-width="344"
                            outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Opérations</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar tile size="80" color="#263238">
                                    <v-icon dark size="30">mdi-swap-vertical</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  @click.stop="redirectPage('operationIndex')" class="clickable" >
                                <v-progress-circular
                                        v-if="loading.loadingOperation"
                                        indeterminate>
                                </v-progress-circular>
                                <template v-else>
                                    <v-btn @click.stop="responseAjaxGetTotalOperation"
                                           class="clickable"  elevation="0" color="#DEDEDE" >
                                   <span :class="`${getTotalOperation !== '' ? 'display-1' : ' '}`" >
                                       <template v-if='getTotalOperation !=="" '>{{ getTotalOperation }}</template>
                                       <template v-else><v-icon>mdi-reload</v-icon></template>
                                   </span>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <template v-if="getTotalOperation !== ''">
                                        <template text class="mr-10">
                                            <v-icon color="green">mdi-clipboard-arrow-down</v-icon>
                                            <span style="font-size: 25px">7</span>
                                        </template>
                                        <span class="ml-2 mr-2"></span>
                                        <template text class="">
                                            <v-icon color="red">mdi-clipboard-arrow-up</v-icon>
                                            <span style="font-size: 25px">18</span>
                                        </template>
                                    </template>
                                </template>
                                <v-spacer></v-spacer>
                                <v-icon flag color="2c3A47">mdi-chevron-right</v-icon>
                            </v-list-item>

                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "DashboardComponents",
        data: () => ({
            totalConteneur: '',
            totalProduit: '',
            totalOperation: '',
            loading: {
                loadingConteneur: false,
                loadingProduit: false,
                loadingOperation: false,
            },
        }),
        computed:{
            //Computed pour retourner le nombre total de conteneur
            getTotalConteneur(){return this.totalConteneur;},
            //Computed pour retourner le nombre total de produit
            getTotalProduit(){return this.totalProduit;},

            getTotalOperation(){return this.totalOperation}
        },
        methods: {
            //Methode d'initialisation
            initialize(){
                this.responseAjaxGetTotalConteneur()
                this.responseAjaxGetTotalProduit()
                this.responseAjaxGetTotalOperation()
            },
            //Methode qui recupere le nombre total de conteneur de la methode ajax
            async responseAjaxGetTotalConteneur(){
                this.loading.loadingConteneur = true;
                this.totalConteneur = await this.ajaxGetTotal('conteneur/total')
                this.loading.loadingConteneur = false
            },

            //Methode qui recupere le nombre total de produit de la methode ajax
            async responseAjaxGetTotalProduit(){
                this.loading.loadingProduit = true;
                this.totalProduit = await this.ajaxGetTotal('produit/total')
                this.loading.loadingProduit = false
            },

            //Methode qui recupere le nombre total de produit de la methode ajax
            async responseAjaxGetTotalOperation(){
                this.loading.loadingOperation = true;
                this.totalOperation = await this.ajaxGetTotal('operation/total')
                this.loading.loadingOperation = false;
            },

            //Methode ajax qui retourne le nombre total d'item
            async ajaxGetTotal(url){
               var result = '';
                await this.$http.get(url)
                    .then(response=>{
                        console.log("success-"+url, response)
                       result =  response.body.total
                    }, response=>{
                        console.log("error-"+url, response)
                    });
                return result;
            },

            redirectPage(name){
                this.$router.push({path: '/'+name})
            }
        },
        mounted() {
            this.initialize()
        }
    }
</script>

<style scoped>

</style>