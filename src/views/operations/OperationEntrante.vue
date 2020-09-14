<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <OperationEntranteComponent></OperationEntranteComponent>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import OperationEntranteComponent from '../../components/operations/operation-entrante-component'
    export default {
        name: "OperationEntrante",
        components:{
            OperationEntranteComponent
        }
    }
</script>

<style scoped>

</style>