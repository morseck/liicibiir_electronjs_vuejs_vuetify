<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <v-card class="mr-5 ml-5">
        <v-app-bar
                dark
                color="#6D3B0F"
        >
            <v-btn color="transparent" class="mr-5" elevation="24" route :to="'/ConteneurIndex'" >
                <v-icon size="28">mdi-chevron-left</v-icon>
                retour
            </v-btn>
            <v-spacer></v-spacer>

            <template v-if=" this.conteneur.numero !=='' ">
                <v-toolbar-title>Conteneur N° {{  this.conteneur.numero }} </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="modifier(conteneur)" color="cyan" class="mr-2"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click="supprimer(conteneur)" color="error"><v-icon>mdi-delete</v-icon></v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <!--<template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            Ajouter un conteneur
                            <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                    </template>-->
                    <v-card>
                        <v-card-title style="">
                            <span class="headline">Modifier conteneur
                                <v-icon color="" size="28" >mdi-pencil-box</v-icon>
                            </span>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="5">
                                        <v-text-field v-model="editConteneur.numero" label="Dessert numero"></v-text-field>
                                    </v-col>
                                    <v-col cols="12"  sm="6" md="3">
                                        <v-text-field type="number" v-model="editConteneur.taille" label="Taille (en pieds)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-checkbox  v-model="editConteneur.disponible" label="Disponible" ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white darken-1" class="error clickable" text @click="close">Annuler <v-icon class="ml-2">mdi-close</v-icon></v-btn>
                            <v-btn color="white darken-1" class="success clickable" text @click="save">Enregister <v-icon class="ml-2">mdi-check</v-icon> </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-app-bar>
        <v-container>
            <v-row
                class="mx-auto px-5"
            >

                <v-col cols="12" sm="12">

                        <v-row>
                            <template v-if="this.loading">
                                <v-col cols="12" md="12" lg="12" sm="12" >
                                    <v-sheet
                                            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                    >
                                        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                                    </v-sheet>
                                </v-col>
                            </template>
                            <template else>
                                <v-col cols="12" md="3" lg="3" sm="12" v-if=" this.conteneur.numero !== '' " >
                                    <qrcode-vue :value="this.conteneur.numero" size="150" level="H"></qrcode-vue>
                                </v-col>
                                <v-col cols="12" md="9" lg="9" sm="12" class="text-left align-center">
                                    <template v-if="this.conteneur.numero !== ''">
                                        <v-alert
                                                color="success"
                                                elevation="2"
                                                class="white--text"
                                        >
                                            <span>Disponible</span>

                                        </v-alert>
                                        <h2 class="" >N°: {{  this.conteneur.numero }}</h2>
                                        <h3 class="" >Taille: {{ this.conteneur.taille }} pieds</h3>
                                        <span class="" >Date de creation: {{ this.conteneur.created_at }}</span>
                                        <h5 class="mt-2" >Date dernière op entrante: 21/02/2020</h5>
                                        <h5 class="" >Date dernière op sortie: 21/02/2020</h5>
                                    </template>
                                    <template v-if=" this.conteneur.numero === '' && !this.loading">
                                        <div class="text-center">
                                            <p>Pas de données <v-icon color="warning">mdi-alert</v-icon></p>
                                            <v-btn color="error" @click="initialize">Recharger <v-icon class="ml-2">mdi-reload</v-icon></v-btn>
                                        </div>
                                    </template>
                                </v-col>

                            </template>
                        </v-row>

                </v-col>

            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import QrcodeVue from 'qrcode.vue'
    export default {
        name: "ConteneurShow",
        inject:['theme'],
        props: ['receveIdNumeroConteneur'],
        components: {
          QrcodeVue
        },
        data: () => ({
            loading:true,
            dialog: false,
            conteneur: {
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },
            editConteneur: {
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },
            defaultConteneur: {
                _id: '',
                taille: 0,
                numero: '',
                disponible: true,
                created_at: ''
            },

        }),
        computed:{
            getIdContenneur(){
                return this.receveIdNumeroConteneur.id;
            },
            getNumeroContenneur(){
                return this.receveIdNumeroConteneur.numero;
            },
            resourceConteneur(){ //utilisation des resources avec systeme d'interseption
                return this.$resource('conteneur{/id}', {}, {}, {
                    before:()=>{
                        this.loading = true
                    },
                    after:()=>{
                        this.loading = false
                    }
                })
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        methods:{
            initialize(){
                this.$conteneur.get({id: this.getIdContenneur})
                    .then(response => {
                        console.log("success", response.body);
                        this.conteneur =response.body;

                    }, response => {
                        console.log("error", response);
                        //this.conteneur = 'error'

                    });
            },
           modifier(conteneur){
                console.log('modifier', conteneur)
                //this.editedIndex = this.desserts.indexOf(item)
                this.editConteneur =  Object.assign({}, conteneur);
                this.dialog = true
            },
            supprimer(conteneur){
                console.log('supprimer', conteneur)
            },
            close () {
                this.editConteneur = Object.assign({}, this.defaultConteneur);
                this.dialog = false
            },

            save () {
                this.conteneur = this.editConteneur;
                this.close()
            },

        },
        async mounted() {
            //console.log('dessert', this.desserts)
            this.$conteneur = await this.resourceConteneur;
            this.initialize();
        }
    }
</script>

<style scoped>

</style>