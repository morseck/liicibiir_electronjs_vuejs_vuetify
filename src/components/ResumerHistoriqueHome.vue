<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-row>
        <v-col cols="12" md="6" >
            <v-card class="ml-5">
                <v-card-title>
                    <h5><v-icon>mdi-cube</v-icon> Conteneurs en fonction de leur disponibilite</h5>
                </v-card-title>
                <v-card-text class="center">
                    <ChartResume v-bind:url-chart="this.urlchartCountConteneur"></ChartResume>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
            <v-card class="mr-5">
                <v-card-title>
                    <h5><v-icon>mdi-book-multiple</v-icon> Produits en fonction de leur disponibilité</h5>
                </v-card-title>
                <v-card-text class="center">
                    <ChartResume v-bind:url-chart="this.urlchartCountProduit"></ChartResume>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    import ChartResume from '../components/ChartResume'
    export default {
        name: "ResumerHistoriqueHome",
        components:{
          ChartResume
        },
        data () {
            return {
                urlchartCountConteneur: 'conteneur/count',
                urlchartCountProduit: 'produit/count',
            }
        },
    }
</script>

<style scoped>

</style>