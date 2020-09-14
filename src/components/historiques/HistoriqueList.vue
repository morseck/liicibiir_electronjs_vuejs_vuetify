<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5">

        <v-app-bar dark color="#6D3B0F">
            <v-icon class="mr-3">mdi-history</v-icon>
            <v-toolbar-title>Historique</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-tabs
            v-model="tabs"
            fixed-tabs
            icons-and-text>
            <v-tabs-slider class="orangevif--text"></v-tabs-slider>
            <v-tab
                href="#historique-operation-all"
                class="orangevif--text">
                toutes les opérations
                <v-icon>mdi-swap-vertical</v-icon>
            </v-tab>

            <v-tab
                href="#historique-operation-entrante"
                class="orangevif--text">
                Opérations entrantes
                <v-icon>mdi-clipboard-arrow-down</v-icon>
            </v-tab>

            <v-tab
                href="#historique-operation-sortante"
                class="orangevif--text">
                Opérations sortantes
                <v-icon>mdi-clipboard-arrow-up</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
            <v-tab-item value="historique-operation-all">
                <v-card flat>
                    <historique-operation v-bind:url-operation="this.bindUrlHistorique.operation"></historique-operation>
                </v-card>
            </v-tab-item>
            <v-tab-item value="historique-operation-entrante">
                <v-card flat>
                    <historique-operation v-bind:url-operation="this.bindUrlHistorique.entrante"></historique-operation>
                </v-card>
            </v-tab-item>
            <v-tab-item value="historique-operation-sortante">
                <v-card flat>
                    <historique-operation v-bind:url-operation="this.bindUrlHistorique.sortante"></historique-operation>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import HistoriqueOperation from './HistoriqueOperation'
    export default {
        name: "HistoriqueList",
        components:{

            HistoriqueOperation,
            //HistoriqueOperationSortante

        },
        data:()=>({
            tabs: '',
            bindUrlHistorique:{
                operation: "operation/all",
                entrante: "operation/entrante",
                sortante: "operation/sortante",
            }
        })
    }
</script>

<style scoped>
    .orangevif--text{
        color: #EB7913;
    }
</style>