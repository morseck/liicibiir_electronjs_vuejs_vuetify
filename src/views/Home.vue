<template >
  <v-layout>
    <v-row class="clickable">
      <v-col cols="12" md="12">
          <DashboardComponents/>
      </v-col>
      <v-col cols="12" md="12">
        <ResumerHistoriqueHome/>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
  import DashboardComponents from '../components/DashboardComponents.vue'
  import ResumerHistoriqueHome from '../components/ResumerHistoriqueHome.vue'
  export default {
    name: 'Home',
    components: {
      DashboardComponents,
      ResumerHistoriqueHome
    }
  }
</script>