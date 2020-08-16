<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <conteneur-show v-bind:receveIdNumeroConteneur="this.sendIdNumeroConteneur"></conteneur-show>

            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import ConteneurShow from '../components/conteneurs/ConteneurShow'
    export default {
        name: "ConteneurDetails",
        components:{
          ConteneurShow
        },
        data :()=>({
            idConteneur: '',
            numero: ''
        }),
        computed:{
            resourceConteneur(){ //utilisation des resources
                return this.$resource('conteneur{/id}')
            },
            getIdContenneurParams(){
                return this.$route.params.id;
            },
            getNumeroContenneurParams(){
                return this.$route.params.numero;
            },
            sendIdNumeroConteneur(){
                return {id: this.getIdContenneurParams, numero: this.getNumeroContenneurParams};
            }

        ,
        },
        methods:{
            initialize(){
                this.idConteneur = this.getIdContenneurParams;
                this.numero = this.getNumeroContenneurParams;

            },
            testEmit(){
                //this.$route.params.numero = "mor";
                console.log("tst");
            }
        },
        mounted() {
            /*
           Attention l'ordre dans cette partie est primordial
           Car on appelle la recouce this.$conteneur dans la fonction this.initialialize()
           Donc il est vitale de l'appeller (this.$conteneur) d'abord avant d'appeler la fonction this.initaliaze()
            */
            this.$conteneur = this.resourceConteneur;
            this.initialize();

        },
    }
</script>

<style scoped>

</style>