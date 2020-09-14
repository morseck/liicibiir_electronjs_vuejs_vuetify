<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <ProduitsList></ProduitsList>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import ProduitsList from '../../components/produits/ProduitList'
    export default {
        name: "ProduitsIndex",
        components: {
            ProduitsList
        }
    }
</script>

<style scoped>

</style>