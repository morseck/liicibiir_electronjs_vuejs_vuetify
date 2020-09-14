<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app style="-webkit-app-region: drag">
    <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent=""
            color=rgb(196,106,24)
            src="./assets/menu4.png"
            dark
            app
    >

      <v-list-item class="px-2 pt-1 mb-10">
        <v-list-item-avatar>
          <v-img src="./assets/avatar1.jpg" alt="admin" class="mx-auto" />
        </v-list-item-avatar>
        <v-list-item-title class="ml-1" ><h2>Mor SECK</h2></v-list-item-title>
      </v-list-item>

      <v-list shaped class="clickable">
        <template v-for="item in items">
            <v-list-group
                    :key="item.text"
                    v-if="item.children"
                    v-model="item.model"
                    :prepend-icon="item['icon-ctr']"
                    :append-icon="item.model ? item.icon : item['icon-alt']"
                    active-class="orange--text"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                      v-for="(child, i) in item.children"
                      :key="i"
                      route :to="child.route"
                      active-class="orange--text"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{child.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item
                  v-else
                  :key="item.text"
                  active-class="orange--text"
                  route
                  :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color='#6D3B0F'
      src="./assets/inver-menu4.png"
      dark
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" class="clickable"> </v-app-bar-nav-icon>
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
        >
          <h1 class="hiddem-sm-and-down display-1 text-capitalize">Liici Biir</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="logout" class="clickable">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main style="background-color: #F0F0F0">
      <v-container
         fluid
         class="scroll-y"
      >
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>

    <v-footer
            dark
            padless
    >
      <v-card
              class="flex"
              flat
              tile
              color="#F5F5F5"
      >

        <v-card-text class="py-2 blue-grey--text text-center  ">
          <v-icon size="24px" class="mr-2 blue-grey--text">{{ icons[0] }}</v-icon> {{ new Date().getFullYear() }} — by <strong>MouridTech</strong> <v-icon size="24px" class="ml-2 blue-grey--text">{{ icons[3] }}</v-icon>
          <v-spacer></v-spacer>
          <span
                  v-for="icon in icons"
                  :key="icon"
                  class=""
          >
           <!-- <v-btn
                  class="mx-4"
                  dark
                  icon
                  v-if="icon.split('-')[0] === 'mdi'"
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>-->
            <span  v-if="icon.split('-')[0] !== 'mdi'" class="mx-2">{{ icon }}</span>
          </span>
        </v-card-text>

      </v-card>
    </v-footer>

      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  v-scroll="onScroll"
                  bottom
                  color=rgb(196,106,24)
                  dark
                  fab
                  fixed
                  right
                  @click="toTop"
                  class="clickable"
                >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </template>
          <span>Aller en haut</span>
      </v-tooltip>

  </v-app>
</template>

<script>
  export default {
    name: 'App',
    props: {
      source: String
    },
    components: {

    },

    methods:{
      onScroll (e){
        if (typeof window === 'undefined') return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop(){
        this.$vuetify.goTo(0)
      },
      logout(){

      }
    },
    data: () => ({
      drawer: 'null',
      mini: false,
      fab: false,
      items: [
        {icon: 'home', text: 'Tableau de bord', route:'/'},
        {icon: 'mdi-cube', text: 'Conteneurs', route:'/ConteneurIndex'},
        {icon: 'mdi-book-multiple', text: 'Produits', route:'/produitsIndex'},
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          'icon-ctr': 'mdi-swap-vertical',
          text: 'Opérations',
          model: false,
          children: [
            {icon: 'mdi-clipboard-arrow-down', text: 'Opération Entrante', route: '/operationEntrante'},
            {icon: 'mdi-clipboard-arrow-up', text: 'Opération Sortante', route: '/operationSortante'},
          ]
        },
        {icon: 'mdi-history', text:'Historique', route: '/historique'},
        {icon: 'mdi-magnify', text:'Recherche', route: '/search'}
      ],
      icons: [
        'mdi-facebook',
        'mouridtech1@gamail.com',
        'www.mouridtech.com',
        'mdi-instagram',
      ],
    }),
  };
</script>


<style>
  .clickable{
    -webkit-app-region: no-drag;
  }

  ::-webkit-scrollbar{
    width: 12px;
  }

  ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
</style>