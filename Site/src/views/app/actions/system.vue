<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('system_actions') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
      <b-modal  v-model="showAddModal" title="Adding record" size="lg" hide-footer>
        <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
          <b-container fluid>
            <b-row>
              <b-form-group class="col-md-3 mb-3" id="input-group-1" label="ID" label-for="input-for-sac_identificator">
                <b-form-input id="input-for-sac_identificator" v-model="form.sac_identificator" required placeholder="Enter ID"/>
              </b-form-group>

              <b-form-group class="col-md-3 mb-3" id="input-group-2" label="Class" label-for="input-for-sac_class">
                <b-form-input id="input-for-sac_class" v-model="form.sac_class" required placeholder="Enter class"/>
              </b-form-group>

              <b-form-group class="col-md-3 mb-3" id="input-group-3" label="Area" label-for="input-for-sac_area">
                <b-form-input id="input-for-sac_area" v-model="form.sac_area" required placeholder="Enter area"/>
              </b-form-group>

              <b-form-group class="col-md-3 mb-3" id="input-group-4" label="Process" label-for="input-for-sac_process">
                <b-form-input id="input-for-sac_process" v-model="form.sac_process" required placeholder="Enter process"/>
              </b-form-group>
            </b-row>

            <b-row>            
              <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Non conformity description" label-for="input-for-sac_non_conformity_description">
                <b-form-textarea id="textarea-group-5" v-model="form.sac_non_conformity_description" placeholder="Enter non conformity description"  rows="3"  max-rows="6"/>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group class="col-md-4 mb-3" id="input-group-6" label="IATF Clause" label-for="input-for-sac_iatf_clause">
                <b-form-input id="input-for-sac_iatf_clause" v-model="form.sac_iatf_clause" required placeholder="Enter IATF Clause"/>
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-7" label="Root cause due date" label-for="input-for-sac_root_cause_due_date">
              
                <b-form-datepicker id="datepicker-1" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.sac_root_cause_due_date" class="mb-2"></b-form-datepicker>
              
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-8" label="Corrective action due date" label-for="input-for-sac_corrective_action_date">
                
                  <b-form-datepicker id="datepicker-2" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.sac_corrective_action_date" class="mb-2"></b-form-datepicker>
                </b-form-group>
            </b-row>

            <b-row>            
              <b-form-group class="col-md-12 mb-3" id="input-group-9" label="Action description" label-for="input-for-sac_action_description">
                <b-form-textarea id="textarea-group-9" v-model="form.sac_action_description" placeholder="Enter action description"  rows="3"  max-rows="6"/>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group class="col-md-6 mb-3" id="input-group-10" label="Type of action" label-for="select-for-group">                
                <b-form-select id="select-for-group" v-model="form.sac_action_type" required :options="options_action_type" />
              </b-form-group>

              <b-form-group class="col-md-6 mb-3" id="input-group-11" label="Responsible" label-for="input-for-sac_usr_id">
                <b-form-input id="input-for-sac_usr_id" v-model="form.sac_usr_id" required placeholder="Enter responsible"/>
              </b-form-group>
              </b-row>

              <b-row>
              <b-form-group class="col-md-6 mb-3" id="input-group-12" label="Due date" label-for="input-for-sac_due_date">
                <b-form-datepicker id="datepicker-3" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.sac_due_date" class="mb-2"></b-form-datepicker>
              </b-form-group>

              <b-form-group class="col-md-6 mb-3" id="input-group-13" label="Status" label-for="input-for-sac_status">
                <b-form-input id="input-for-sac_status" v-model="form.sac_status" required placeholder="Enter status"/>
              </b-form-group>
            </b-row>


            <b-row>            
              <b-form-group class="col-md-12 mb-3" id="input-group-14" label="QMS Comments" label-for="input-for-sac_qms_comments">
                <b-form-textarea id="textarea-group-9" v-model="form.sac_qms_comments" placeholder="Enter QMS Comments"  rows="3"  max-rows="6"/>
              </b-form-group>
            
            </b-row>
        
            <b-row>
              <b-col>
                <div class="col-md-12 mb-3 text-right">    
                  <b-button type="submit" variant="primary">Save</b-button>&nbsp;      
                  <b-button type="reset" variant="danger" @click="showAddModal = false">Close</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>                      
        </b-form>
      </b-modal>

    <b-row>        
        <b-col lg="12" xl="12" md="12" class="mb-30">
          <b-card class="card   mb-30" header-bg-variant="transparent ">
          
            <vue-good-table
              ref="table"
                :columns="columns"
                :pagination-options="{
                  enabled: true,
                  mode: 'records'
                }"
                styleClass="tableOne vgt-table"
                :rows="rows"
                :search-options="{
                  enabled: true
                }"
            >   
            
              <div slot="table-actions">              
                <b-button variant="success m-1" @click="showAddRecordModal()">Add record</b-button>
              </div>  
            
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                    <i class="i-Eraser-2 text-25 text-success mr-2" @click="showUpdateRecordModal(props.row)" style="cursor: pointer;"></i>
                    <i class="i-Close-Window text-25 text-danger" @click="showDeleteRecordModal(props.row.usr_id)" style="cursor: pointer;"></i>
                </span>
              </template>
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
    title: "system_actions"
  },
  data() {
    return {
      table: 'system_actions',

      columns: [
        {
          field: 'sac_id',
          hidden: true
        },
        {
          label: 'ID',
          field: 'sac_identificator',
        },
        {
          label: 'Class',
          field: 'sac_class',
        },
        {
          label: 'Area',
          field: 'sac_area',
        },
        {
          label: 'Process',
          field: 'sac_process',
        },
        {
          label: 'Non conformity description',
          field: 'sac_non_conformity_description',
        },
        {
          label: 'IATF clause',
          field: 'sac_iatf_clause',
        },
        {
          label: 'Root cause due date',
          field: 'sac_root_cause_due_date',
        },
        {
          label: 'Corrective action date',
          field: 'sac_corrective_action_date',
        },
        {
          label: 'Action description',
          field: 'sac_action_description',
        },
        {
          label: 'Action type',
          field: 'sac_action_type',
        },
        {
          label: 'Due date',
          field: 'sac_due_date',
        },
        {
          label: 'Status',
          field: 'sac_status',
        },
        {
          label: 'QMS_comments',
          field: 'sac_qms_comments',
        },
        {
          label: 'Actions',
          field: 'actions',
          html: true,
          sortable: false
        }
      ],

      rows: [],

      
      

      form: {
        sac_id: '',
        sac_identificator: '',
        sac_class: '',
        sac_area: '',
        sac_process: '',
        sac_non_conformity_description: '',
        sac_iatf_clause: '',
        sac_root_cause_due_date: '',
        sac_corrective_action_date: '',
        sac_action_description: '',
        sac_action_type: null,
        sac_due_date: '',
        sac_status: '',
        sac_qms_comments: ''        
      },

      options_action_type: [
        { value: null, text: 'Please select an action' },
        { value: 'Containment', text: 'Containment action' },
        { value: 'Corrective', text: 'Corrective action' },
      ],

      showAddModal: false,
      //showUpdateModal: false
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
    },

    // Show a modal with a form to add a record
    showAddRecordModal() {
      this.sac_identificator = ""
      this.sac_class = ""
      this.sac_area = ""
      this.sac_process = ""
      this.sac_non_conformity_description = ""
      this.sac_iatf_clause = ""
      this.sac_root_cause_due_date = ""
      this.sac_corrective_action_date = ""
      this.sac_action_description = ""
      this.sac_action_type = ""
      this.sac_due_date = ""
      this.sac_status = ""
      this.sac_qms_comments = ""

      this.showAddModal = true
    },

    onReset() {
      this.showAddModal = false
      //this.showUpdateModal = false
    },

    // Save a record
    saveRecord(evt) {
      evt.preventDefault()
      if(this.form.sac_action_type == null){
          this.makeToast("warning", "Select an action")
      } else {
        axios.post(apiServer + '/api/system_actions',
          {
            "sac_identificator": this.form.sac_identificator,
            "sac_class": this.form.sac_class,
            "sac_area": this.form.sac_area,
            "sac_process": this.form.sac_process,
            "sac_non_conformity_description": this.form.sac_non_conformity_description,
            "sac_iatf_clause": this.form.sac_iatf_clause,
            "sac_root_cause_due_date": this.form.sac_root_cause_due_date,
            "sac_corrective_action_date": this.form.sac_corrective_action_date,
            "sac_action_description": this.form.sac_action_description,
            "sac_action_type": this.form.sac_action_type,
            "sac_due_date": this.form.sac_due_date,
            "sac_status": 'Open',
            "sac_qms_comments": this.form.sac_qms_comments,
            "user": username
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': JSON.parse(localStorage.getItem("userInfo")).token
            }
          })
          .then(res => {
            this.showAddModal = false
            this.makeToast("success", "New record has been created")
            this.getRows()
          })
          .catch(error => {
            this.makeToast("warning", "Can not save new record")
          })
      }

    },
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
