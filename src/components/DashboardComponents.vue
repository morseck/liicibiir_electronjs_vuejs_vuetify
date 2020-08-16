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
                    <v-hover v-slot:default="{ hover }"
                             open-delay="200"
                    >
                        <v-card
                                :elevation="hover ? 16 : 2"
                                class="mx-auto"
                                max-width="344"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Conteneurs</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="green"
                                >
                                    <v-icon dark>mdi-cube</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  route :to="'/ConteneurIndex'" >
                                <span class="display-1 ml-2" >7</span>
                                <v-spacer></v-spacer>
                                <v-icon flag color="2c3A47">mdi-chevron-right</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-hover v-slot:default="{ hover }"
                             open-delay="200"
                    >
                        <v-card
                                :elevation="hover ? 16 : 2"
                                class="mx-auto"
                                max-width="344"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Produits</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="rgb(196,106,24)"
                                >
                                    <v-icon dark>mdi-book-multiple</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  route :to="'/produits'" >
                                <span class="display-1 ml-2" >7</span>
                                <v-spacer></v-spacer>
                                <v-icon flag color="2c3A47">mdi-chevron-right</v-icon>
                            </v-list-item>

                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-hover v-slot:default="{ hover }"
                             open-delay="200"
                    >
                        <v-card
                                :elevation="hover ? 16 : 2"
                                class="mx-auto"
                                max-width="344"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Opérations</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="#263238"
                                >
                                    <v-icon dark size="30">mdi-swap-vertical</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item  style="background-color: #F0F0F0"  route :to="'/operations'" >
                                <v-btn text class="">
                                    <v-icon color="green">mdi-clipboard-arrow-down</v-icon>
                                    <span style="font-size: 25px">7</span>
                                </v-btn>
                                <!--<v-spacer></v-spacer>-->
                                <v-btn text class="">
                                    <v-icon color="red">mdi-clipboard-arrow-up</v-icon>
                                    <span style="font-size: 25px">18</span>
                                </v-btn>
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
        name: "DashboardComponents"
    }
</script>

<style scoped>

</style>