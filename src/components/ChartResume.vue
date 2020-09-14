<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card flat>
        <template v-if="this.loading">
            <v-sheet
                    class="mr-5 ml-5 mt-5 mb-5"
                    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
            </v-sheet>
        </template>
        <template v-if="this.loading === false && this.dataResponse !== ''">
            <pie-chart :data="this.dataResponse"></pie-chart>
        </template>
        <template v-if="this.loading === false && this.dataResponse === ''">
            <div class="text-center mb-160 mt-16" style="height: 305px">
                <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                <v-btn fab color="error" @click="initialize"> <v-icon class="">mdi-reload</v-icon></v-btn>
            </div>
        </template>
    </v-card>
</template>

<script>
    export default {
        name: "ChartResume",
        inject:['theme'],
        props: ['urlChart'],
        data: ()=>({
            loading:false,
            dataResponse: '',
        }),
        methods:{
            initialize(){
                this.responseAjaxGetDataChart()
            },
            //Methode qui recupere les donnees de la methode ajax
            async responseAjaxGetDataChart(){
                this.loading = true;
                //this.dataResponse = await this.ajaxGetDataChart(this.urlChart)
                //console.log("dataResponse", this.dataResponse)
                const response = await this.ajaxGetDataChart(this.urlChart)
                this.remplirArrayChart(response)
                this.loading = false
            },

            remplirArrayChart(item){
                if (item !== undefined){
                    console.log("item", item)
                    console.log("Object", Object.entries(item))
                    let array = []
                    //let disponible= 1
                    //let nonDisponible = 2
                    for (let i=0; i < item.length; i++){
                        item[i]._id = item[i]._id === true ? "Disponible" : "Non disponible"
                        array.push(Object.values(item[i]))
                    }
                    console.log("array", array)
                    this.dataResponse= array
                }

            },

            //Methode ajax qui retourne les count des conteneurs ou produit en fonction de leurs disponibilite d
            async ajaxGetDataChart(urlParam){
                const url = urlParam;
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
        },
        mounted() {
            this.initialize()
        },
    }
</script>

<style scoped>

</style>