<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <historique-list></historique-list>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import HistoriqueList from '../components/historiques/HistoriqueList'
    export default {
        name: "Historique",
        components:{
            HistoriqueList
        }
    }
</script>

<style scoped>

</style>