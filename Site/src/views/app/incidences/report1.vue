<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
      <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('all_incidences') }}</strong></li>
    </ol>


    <b-row>
      <b-col lg="12" xl="12" md="12" class="mb-30">
        <b-card class="card   mb-30" header-bg-variant="transparent ">
          <vue-good-table 
            ref="table" 
            :columns="columns" 
            :pagination-options="{ enabled: true,  mode: 'records' }" 
            styleClass="tableOne vgt-table" 
            :rows="rows" 
            :search-options="{ enabled: true }">
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
      table: 'incidences',

      columns: [
        {
          field: 'inc_id',
          hidden: true
        },
        {
          label: 'ID',
          field: 'inc_identificator',
        },
        {
          label: 'Class',
          field: 'inc_class',
        },
        {
          label: 'Area',
          field: 'inc_area',
        },
        {
          label: 'Process',
          field: 'inc_process',
        },
        {
          label: 'Non conformity description',
          field: 'inc_non_conformity_description',
        },
        {
          label: 'IATF clause',
          field: 'inc_iatf_clause',
        },
        {
          label: 'Root cause due date',
          field: 'inc_root_cause_due_date',
        },
        {
          label: 'Corrective action date',
          field: 'inc_corrective_action_date',
        },
        {
          label: 'Action description',
          field: 'inc_action_description',
        },
        {
          label: 'Action type',
          field: 'inc_action_type',
        },
        {
          label: 'Due date',
          field: 'inc_due_date',
        },
        {
          label: 'Status',
          field: 'inc_status',
        },
        {
          label: 'QMS_comments',
          field: 'inc_qms_comments',
        }
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
<style>.echarts {
  width: 100%;
  height: 100%;
}</style>
