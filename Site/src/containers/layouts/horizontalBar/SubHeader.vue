<template>
  <div class="subheader shadow-sm">
    <div class="d-flex subheader-navbar">
      <vue-navigation-bar class :options="navbarOptions" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "./",

        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Process actions",
            iconLeft: '<i class="nav-icon mr-2 i-Bar-Chart"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "New action",
                path: { name: "process_actions" },
                iconLeft: '<i class=" i-Right1"></i>',
              },    
              {
                type: "link",
                text: "Follow Up",
                path: { name: "followup_process" },
                iconLeft: '<i class=" i-Right1"></i>',
              },         
              {
                type: "link",
                text: "Authorize",
                path: { name: "authorize_process" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
          {
            type: "link",
            text: "System actions",
            iconLeft: '<i class="nav-icon mr-2 i-Bar-Chart"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "New action",
                path: { name: "system_actions" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Follow Up",
                path: { name: "followup_system" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Authorize",
                path: { name: "authorize_system" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
          {
            type: "link",
            text: "Informs",
            iconLeft: '<i class="nav-icon mr-2 i-Bar-Chart"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "All System Actions",
                path: { name: "report1" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "All Process Actions",
                path: { name: "report2" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Chart 1",
                path: { name: "chart1" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Chart 2",
                path: { name: "chart2" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
          {
            type: "link",
            text: "System",
            iconLeft: '<i class="nav-icon mr-2 i-Bar-Chart"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Parameters",
                path: { name: "parameters" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Products",
                path: { name: "products" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Users",
                path: { name: "users" },
                iconLeft: '<i class=" i-Right1"></i>',
              }
            ],
          },
/*          
          {
            type: "link",
            text: "Ui Kits",
            iconLeft: '<i class="nav-icon mr-2 i-Suitcase"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Alerts",
                path: { name: "alerts" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Accordion",
                path: { name: "accordion" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Badges",
                path: { name: "badges" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Buttons",
                path: { name: "buttons" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Bootstrap Tab",
                path: { name: "bootstrap-tab" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Buttons",
                path: { name: "buttons" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Accordion",
                path: { name: "accordion" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "List",
                path: { name: "list" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Pagination",
                path: { name: "pagination" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Popover",
                path: { name: "popover" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Progressbar",
                path: { name: "progressbar" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Modals",
                path: { name: "modals" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },   
*/      
        ]
      },
    };
  },
};
</script>


<style lang="scss">
.subheader {
  .subheader-navbar {
    background-color: #fff;
  }
  position: fixed;
  top: 80px;
  z-index: 50;
  width: 100%;
  @media (max-width: 577px) {
    top: 70px;
  }
}

//  vue-navigation-bar plugins
.vnb {
  .tippy-box {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
  &__menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        &:hover {
          color: #a855f7;
          .vnb__menu-options__option__arrow {
            fill: #a855f7;
          }
        }

        &__icon {
          svg {
            fill: #a855f7 !important;
          }
        }
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        color: #000 !important;
        &:hover {
          color: #a855f7 !important;
          border-left: 2px solid #a855f7;
        }
      }
    }
  }
}

.vnb__popup {
  height: 80vh !important;
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  .vnb__popup__top__close-button {
    &:focus {
      border: 1px solid none;
      outline: none;
    }
    top: 20px;
    right: -33px;
    svg {
      fill: #000 !important;
    }
  }
}
.vnb__collapse-button {
  margin-left: 33px;
  @media (max-width: 577px) {
    margin-left: 30px;
  }
}
</style>