<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
    </ol>
    <b-row>
      <!-- ICON BG -->

      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Add-User"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Jobs</p>
            <p class="text-primary text-24 line-height-1 mb-2">205</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Financial"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Products</p>
            <p class="text-primary text-24 line-height-1 mb-2">4021</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Checkout-Basket"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Units</p>
            <p class="text-primary text-24 line-height-1 mb-2">849610</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Money-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Boxes</p>
            <p class="text-primary text-24 line-height-1 mb-2">1200</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8" md="12" sm="12">
        <b-card class=" mb-30">
          <h4 class="card-title m-0">This Year Sales</h4>
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
          <h4 class="card-title m-0">Sales by Countries</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100%">
            <v-chart :options="echartPie" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <div class="row">
      <div class="col-lg-6 col-xl-6 col-md-12">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="card card-chart-bottom o-hidden mb-30">
              <div class="card-body pb-0 ">
                <div class="text-muted">Last Month Sales</div>
                <p class="  text-primary text-24 m-0">$40250</p>
              </div>
              <div class="chart-wrapper" style="height: 260px">
                <v-chart :options="echart1" :autoresize="true"></v-chart>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="card card-chart-bottom o-hidden mb-30">
              <div class="card-body pb-0">
                <div class="text-muted">Last Week Sales</div>
                <p class=" text-warning text-24 m-0">$10250</p>
              </div>
              <div class="chart-wrapper" style="height: 260px">
                <v-chart :options="echart2" :autoresize="true"></v-chart>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <!-- start::top selling product -->
      <!-- <b-col col lg="6" md="12">
                    
                </b-col> -->
      <!-- end::top-selling product -->

      <b-col lg="6" xl="6" md="12">
        <div class="card mb-30">
          <div class="card-body p-0">
            <div class="card-title  d-flex align-items-center mb-2 pb-0 p-3">
              <span>User activity</span>
              <span class="flex-grow-1"></span>
              <span class="badge badge-pill badge-warning">Updated daily</span>
            </div>
            <div class="d-flex border-bottom justify-content-between  p-3 ">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">2065</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">465</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">23456</h5>
              </div>
            </div>
            <div class="d-flex border-bottom justify-content-between p-3">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">1829</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">735</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">92565</h5>
              </div>
            </div>
            <div class="d-flex justify-content-between p-3 mb-1">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">3165</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">165</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">32165</h5>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 class="card-title border-bottom p-3 mb-2">Recent Orders</h5>

            &nbsp;.
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
import { echartBar, echartPie } from "@/data/echarts";
import { echart1, echart2, echart3 } from "@/data/dashboard1";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard"
  },
  data() {
    return {
      echartBar,
      echartPie,
      echart1,
      echart2,
      echart3
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
