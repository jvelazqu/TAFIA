<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
    </ol>
  <h4>Incidences</h4>
    <b-row>
      
      <!-- ICON BG -->

      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Add-User"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Total</p>
            <p class="text-primary text-24 line-height-1 mb-2">100</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Factory"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Open</p>
            <p class="text-primary text-24 line-height-1 mb-2">50</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Checkout-Basket"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Closed</p>
            <p class="text-primary text-24 line-height-1 mb-2">20</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Computer-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Overdue</p>
            <p class="text-primary text-24 line-height-1 mb-2">30</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8" md="12" sm="12">
        <b-card class=" mb-30">
          <h4 class="card-title m-0">Incidences by month</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100% ">
            <v-chart
              id="echartbar"
              :options="echartBar"
              :autoresize="true"
            ></v-chart>
          </div>
        </b-card>
      </b-col>
      <b-col col lg="4" md="12" sm="12">
        <b-card class=" mb-30">
          <h4 class="card-title m-0">Incidences</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100%">
            <v-chart :options="echartPie" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>

  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
import { echartBar, echartPie } from "@/data/echarts";

import { echart1, echart2, echart3 } from "@/data/dashboard1";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v1"
  },
  data() {
    return {
      echartBar,
      echartPie,
      echart1,
      echart2,
      echart3,
      columns: [
        {
          label: "Order Id",
          field: "id",
          thClass: "text-left pl-3",
          tdClass: "text-left pl-3"
        },
        {
          label: "Buyer Name",
          field: "name",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Product",
          field: "img",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Status",
          field: "span",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },

        {
          label: "Shipping Cost",
          field: "score",

          // html:true,
          type: "percentage",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Date",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-mm-dd",
          dateOutputFormat: "mmm Do yy",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Action",
          field: "action",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        }
      ],
      rows: [
        {
          id: 1,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-primary p-2 ">Delivered</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 2,
          name: "Jane",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-danger p-2">Shipped</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 3,
          name: "Susan",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-3.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-4.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-success p-2 ">Delivered</span>',
          createdAt: "2011-10-30",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 4,
          name: "Chris",
          img:
            '<img src="' +
            require("@/assets/images/products/speaker-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/speaker-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-primary p-2">Pending</span>',
          createdAt: "2011-10-11",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 5,
          name: "Dan",
          img:
            '<img src="' +
            require("@/assets/images/products/watch-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/watch-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-info p-2">Processing</span>',
          createdAt: "2011-10-21",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 6,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/speaker-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/speaker-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-success p-2 ">Delivered</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 7,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-3.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-4.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-info p-2 ">Pending</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 8,
          name: "Jane",
          img:
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-danger p-2">Shipped</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        }
      ]
    };
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
