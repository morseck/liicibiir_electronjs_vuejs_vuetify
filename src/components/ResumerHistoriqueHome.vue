<template>
    <v-card class="mr-5 ml-5">
        <v-app-bar
                dark
                color="#FFF"
                style="color: rgb(30,27,31)"
        >
            <v-btn icon color="rgb(30,27,31)">
                <v-icon>mdi-view-list</v-icon>
            </v-btn>
            <v-toolbar-title>Résumé des dernières opération</v-toolbar-title>
        </v-app-bar>
        <v-card-title>
            10 dernières opérations
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Recherche"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>

        <!--<v-data-table item-key="name" class="elevation-1 mr-5 ml-5" loading loading-text="Chargement... Patientez svp"></v-data-table>
        -->
        <v-data-table class="ml-5 mr-5"
                :headers="headers"
                :items="desserts"
                :search="search"
        >
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "ResumerHistoriqueHome",
        data () {
            return {
                search: '',
                headers: [
                    {
                        text: 'Date Opération (jj/mm/aa heure:minute)',
                        align: 'start',
                        ///sortable: false,
                        value: 'name',
                    },
                    { text: 'Status', value: 'calories' },
                    { text: 'Quantité totale', value: 'fat' },
                  /*  { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },*/
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%',
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%',
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%',
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%',
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%',
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%',
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%',
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%',
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%',
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%',
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>