<template>
  <div class="main-header">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt />
    </div>
    
    <div class="d-flex align-items-center">
      <h2>{{ $t('systemTitle') }}</h2>
    </div>

    <div style="margin: auto"></div>

    <div class="header-part-right">
      <!-- Full screen toggle -->
      <i
        class="i-Full-Screen header-icon d-none d-sm-inline-block"
        @click="handleFullScreen"
      ></i>
      <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
      <!-- Grid menu Dropdown -->

      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          text="Dropdown Button"
          class="m-md-2 user col align-self-end"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <img
              src="@/assets/images/faces/generic.png"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"
              >Sign out</a
            >
          </div>
        </b-dropdown>
      </div>
    </div>
    <search-component
      :isSearchOpen.sync="isSearchOpen"
      @closeSearch="toggleSearch"
    ></search-component>
  </div>

  <!-- header top menu end -->
</template>
<script>
import Util from "@/utils";

import searchComponent from "../common/search";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: {

    searchComponent
  },

  data() {
    return {
      isDisplay: true,

      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false
    };
  },
  mounted() {
    // document.addEventListener("click", this.closeMegaMenu);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",

      "changeSidebarProperties",
      "changeThemeMode",
      "signOut"
    ]),

    // megaMenuToggle() {
    //   this.isMegaMenuOpen = false;

    //   console.log("work");
    // },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
    logoutUser() {
      this.signOut();

      this.$router.push("/app/sessions/signIn");
    },

    closeMegaMenu() {
      this.isMegaMenuOpen = false;
      // console.log(this.isMouseOnMegaMenu);
      // if (!this.isMouseOnMegaMenu) {
      //   this.isMegaMenuOpen = !this.isMegaMenuOpen;
      // }
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },

    sideBarToggle(el) {
      if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        isMobile
      ) {
        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      } else if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        this.changeSecondarySidebarProperties();
      } else if (this.getSideBarToggleProperties.isSideNavOpen) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        !this.getSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        // console.log("4");

        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
        // console.log("4");
      }
    }
  }
};
</script>



