<template >
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <ConteneurList></ConteneurList>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import ConteneurList from '../../components/conteneurs/ConteneurList'
    export default {
        name: "ConteneursIndex",
        components: {
            ConteneurList
        }
    }
</script>

<style scoped>

</style>