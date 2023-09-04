<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
      <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('all_process_actions') }}</strong></li>
    </ol>


    <b-row>
      <b-col lg="12" xl="12" md="12" class="mb-30">
        <b-card class="card   mb-30" header-bg-variant="transparent ">
          <vue-good-table ref="table" :columns="columns" :pagination-options="{ enabled: true, mode: 'records' }"
            styleClass="tableOne vgt-table" :rows="rows" :search-options="{ enabled: true }">
          </vue-good-table>
        </b-card>
      </b-col>
    </b-row>

  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
import axios from 'axios';
import { apiServer } from "@/data/config";
var token = JSON.parse(localStorage.getItem("userInfo")).token;
var uid = JSON.parse(localStorage.getItem("userInfo")).uid;
var username = JSON.parse(localStorage.getItem("userInfo")).username;

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Incidences"
  },
  data() {
    return {
      table: 'process_actions',

      columns: [
        {
          field: 'pac_id',
          hidden: true
        },
        {
          label: 'Business Area',
          field: 'pac_business_area',
        },
        {
          label: 'Project',
          field: 'pac_project',
        },
        {
          label: 'Item',
          field: 'pac_item',
        },
        {
          label: 'Reference',
          field: 'pac_reference',
        },
        {
          label: 'Audit results',
          field: 'pac_audit_results',
        },
        {
          label: 'Immediate action',
          field: 'pac_immediate_action',
        },
        {
          label: 'Causes',
          field: 'pac_causes',
        },
        {
          label: 'Corrective actions',
          field: 'pac_corrective_actions',
        },
        {
          label: 'Due date',
          field: 'pac_due_date',
        },
        {
          label: 'Responsible',
          field: 'pac_responsible',
        },
        {
          label: 'Due implementation date',
          field: 'pac_due_implementation_date',
        },
        {
          label: 'Verificatin date',
          field: 'pac_verification_date',
        },
        {
          label: 'Status',
          field: 'pac_status',
        },
        {
          label: 'QMS Comments',
          field: 'pac_qms_comments',
        },        
      ],

      rows: [],

    };
  },

  created() {
    this.getRows()
    //this.getGroups()
  },

  methods: {
    // Show a message box in the top & right
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },

    getRows() {
      axios.get(apiServer + '/api/' + this.table,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          this.rows = res.data
        })
        .catch(error => {
          this.makeToast("warning", "Can not get data")
        });
    }
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
