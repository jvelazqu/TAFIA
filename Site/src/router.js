import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./auth/authenticate";

Vue.use(Router);

// create new router

const routes = [
  {
    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    beforeEnter: authenticate,
    redirect: "/app/dashboards/dashboard",

    children: [
      // Dashboard
      {
        path: "/app/dashboards",
        component: () => import("./views/app/dashboards"), //dashboard
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            component: () => import("./views/app/dashboards/dashboard")
          },
        ]
      },

      // Actions 
      {
        path: "/app/actions",
        component: () => import("./views/app/incidences"),
        children: [
          {
            path: "system",
            name: "system_actions",
            component: () => import("./views/app/actions/system")
          },
          {
            path: "process",
            name: "process_actions",
            component: () => import("./views/app/actions/process")
          },
          {
            path: "followup/process",
            name: "followup_process",
            component: () => import("./views/app/actions/follow_up_process_actions")
          },
          {
            path: "followup/system",
            name: "followup_system",
            component: () => import("./views/app/actions/follow_up_system_actions")
          },
          {
            path: "authorize/process",
            name: "authorize_process",
            component: () => import("./views/app/actions/authorize_process")
          },
          {
            path: "authorize/system",
            name: "authorize_system",
            component: () => import("./views/app/actions/authorize_system")
          },
          {
            path: "report1",
            name: "report1",
            component: () => import("./views/app/actions/report1")
          },
          {
            path: "report2",
            name: "report2",
            component: () => import("./views/app/actions/report2")
          },
          {
            path: "chart1",
            name: "chart1",
            component: () => import("./views/app/incidences/chart1")
          },
          {
            path: "chart2",
            name: "chart2",
            component: () => import("./views/app/incidences/chart2")
          },
        ]
      },


      //System 
      {
        path: "/app/system",
        component: () => import("./views/app/system"),
        children: [
          {
            path: "projects",
            name: "projects",
            component: () => import("./views/app/system/projects")
          },
          {
            path: "parameters",
            name: "parameters",
            component: () => import("./views/app/system/parameters")
          },

          {
            path: "users",
            name: "users",
            component: () => import("./views/app/system/users")
          }
        ]
      },

      // pages
      {
        path: "/app/pages",
        component: () => import("./views/app/pages"),
        redirect: "/app/pages/profile",
        children: [
          {
            path: "profile",
            component: () => import("./views/app/pages/profile")
          },
          {
            path: "error",
            component: () => import("./views/app/pages/notFound")
          },
          {
            path: "icons",
            component: () => import("./views/app/pages/icons")
          },
          {
            path: "search-result",
            component: () => import("./views/app/pages/search-result")
          },
          {
            path: "pricing-table",
            component: () => import("./views/app/pages/pricingTable")
          },
          {
            path: "faq",
            component: () => import("./views/app/pages/faq")
          },
          
        ]
      },

      //ui-kits
      {
        path: "/app/ui-kits",
        component: () => import("./views/app/ui-kits"),
        redirect: "/app/ui-kits/alerts",
        children: [
          {
            path: "alerts",
            name: "alerts",
            component: () => import("./views/app/ui-kits/alerts")
          },
          {
            path: "accordion",
            name: "accordion",
            component: () => import("./views/app/ui-kits/accordion")
          },
          {
            path: "badges",
            name: "badges",
            component: () => import("./views/app/ui-kits/badges")
          },
          {
            path: "buttons",
            name: "buttons",
            component: () => import("./views/app/ui-kits/buttons")
          },
          {
            path: "bootstrap-tab",
            name: "bootstrap-tab",
            component: () => import("./views/app/ui-kits/bootstrap-tab")
          },
          {
            path: "cards",
            name: "cards",
            component: () => import("./views/app/ui-kits/cards")
          },
          {
            path: "list", 
            name: "list", 
            component: () => import("./views/app/ui-kits/list")},
          {
            path: "popover",
            name: "popover",
            component: () => import("./views/app/ui-kits/popover")
          },
          {
            path: "progressbar",
            name: "progressbar",
            component: () => import("./views/app/ui-kits/progressbar")
          },
          {
            path: "collapsible",
            name: "collapsible",
            component: () => import("./views/app/ui-kits/collapsible")
          },
          {
            path: "modals",
            name: "modals",
            component: () => import("./views/app/ui-kits/modals")
          },
          {
            path: "typography",
            name: "typography",
            component: () => import("./views/app/ui-kits/typography")
          },
          {
            path: "carousel",
            name: "carousel",
            component: () => import("./views/app/ui-kits/carousel")
          },
          {
            path: "pagination",
            name: "pagination",
            component: () => import("./views/app/ui-kits/pagination")
          }
          // {
          //   path: "slider",
          //   component: () => import("./views/app/ui-kits/sliders")
          // }
        ]
      },

      //uiExtraKits
      {
        path: "/app/extraKits",
        component: () => import("./views/app/extraKits"),
        redirect: "/app/extraKits/dropdown",
        children: [
          {
            path: "dropdown",
            component: () => import("./views/app/extraKits/dropdown")
          },
          {
            path: "loaders",
            component: () => import("./views/app/extraKits/loaders")
          },
          {
            path: "sweetAlerts",
            component: () => import("./views/app/extraKits/sweetAlerts")
          },
          {
            path: "toasts",
            component: () => import("./views/app/extraKits/toasts")
          },
          {
            path: "tour",
            component: () => import("./views/app/extraKits/tour")
          },
          {
            path: "imageCropper",
            component: () => import("./views/app/extraKits/imageCropper")
          },
          {
            path: "vCalendar",
            component: () => import("./views/app/extraKits/vCalendar")
          },
          {
            path: "vuedraggable",
            component: () => import("./views/app/extraKits/vuedraggable")
          },
          {
            path: "vueTree",
            component: () => import("./views/app/extraKits/vueTree")
          }
        ]
      },
    ]
  },
  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/app/sessions"),
    redirect: "/app/sessions/signIn",
    children: [
      {
        path: "signIn",
        component: () => import("./views/app/sessions/signIn")
      },
      {
        path: "signUp",
        component: () => import("./views/app/sessions/signUp")
      },
      {
        path: "forgot",
        component: () => import("./views/app/sessions/forgot")
      }
    ]
  },

  {
    path: "/vertical-sidebar",
    component: () => import("./containers/layouts/verticalSidebar")
  },
  {
    path: "*",
    component: () => import("./views/app/pages/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
