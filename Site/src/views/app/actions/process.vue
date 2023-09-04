<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('process_actions') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
      <b-modal  v-model="showAddModal" title="Adding record" size="lg" hide-footer>
        <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
          <b-container fluid>
            <b-row>
              <b-form-group class="col-md-4 mb-3" id="input-group-1" label="Business Area" label-for="input-for-pac_business_area">
                <b-form-input id="input-for-pac_business_area" v-model="form.pac_business_area" required placeholder="Enter Business Area"/>
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-2" label="Project" label-for="input-for-pac_project">
                <b-form-input id="input-for-pac_project" v-model="form.pac_project" required placeholder="Enter Project"/>
              </b-form-group>

              <b-form-group class="col-md-2 mb-3" id="input-group-3" label="Item" label-for="input-for-pac_item">
                <b-form-input id="input-for-pac_item" v-model="form.pac_item" required placeholder="Enter Item"/>
              </b-form-group>

              <b-form-group class="col-md-2 mb-3" id="input-group-4" label="Reference" label-for="input-for-pac_reference">
                <b-form-input id="input-for-pac_reference" v-model="form.pac_reference" required placeholder="Enter Reference"/>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Audit Results" label-for="textarea-for-pac_audit_results">
                  <b-form-textarea id="textarea-for-pac_audit_results" v-model="form.pac_audit_results" placeholder="Enter Audit Results"  rows="3"  max-rows="6"/>
                </b-form-group>
            </b-row>

            <b-row>
                <b-form-group class="col-md-12 mb-3" id="input-group-6" label="Immediate Action" label-for="textarea-for-pac_immediate_action">
                    <b-form-textarea id="textarea-for-pac_immediate_action" v-model="form.pac_immediate_action" placeholder="Enter Immediate Action"  rows="3"  max-rows="6"/>
                  </b-form-group>
              </b-row>

            <b-row>
                <b-form-group class="col-md-12 mb-3" id="input-group-7" label="Causes" label-for="textarea-for-pac_causes">
                    <b-form-textarea id="textarea-for-pac_causes" v-model="form.pac_causes" placeholder="Enter Causes"  rows="3"  max-rows="6"/>
                  </b-form-group>
              </b-row>

            <b-row>            
              <b-form-group class="col-md-12 mb-3" id="input-group-8" label="Corrective Actions" label-for="textarea-pac_corrective_actions">
                <b-form-textarea id="textarea-pac_corrective_actions" v-model="form.pac_corrective_actions" placeholder="Enter Corrective Actions"  rows="3"  max-rows="6"/>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group class="col-md-4 mb-3" id="input-group-9" label="Score" label-for="input-for-pac_score">
                <b-form-input id="input-for-pac_score" v-model="form.pac_score" required placeholder="Enter Score"/>
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-10" label="Due Date" label-for="input-for-pac_due_date">              
                <b-form-datepicker id="datepicker-1" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.pac_due_date" class="mb-2" />
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-11" label="Responsible" label-for="input-for-pac_responsible">
                <b-form-input id="input-for-pac_responsible" v-model="form.pac_responsible" required placeholder="Enter Responsible"/>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group class="col-md-4 mb-3" id="input-group-12" label="Due Implementation Date" label-for="input-for-pac_due_implementation_date">              
                <b-form-datepicker id="datepicker-2" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.pac_due_implementation_date" class="mb-2" />
              </b-form-group>
                        
              <b-form-group class="col-md-4 mb-3" id="input-group-13" label="Verification Date" label-for="input-for-pac_verification_date">                
                <b-form-datepicker id="datepicker-3" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" v-model="form.pac_verification_date" class="mb-2"></b-form-datepicker>
              </b-form-group>

              <b-form-group class="col-md-4 mb-3" id="input-group-14" label="Status" label-for="input-for-pac_status">
                <b-form-input id="input-for-pac_status" v-model="form.pac_status" required placeholder="Enter status"/>
              </b-form-group>
            </b-row>

            <b-row>            
              <b-form-group class="col-md-12 mb-3" id="input-group-15" label="QMS Comments" label-for="textarea-for-pac_qms_comments">
                <b-form-textarea id="textarea-for-pac_qms_comments" v-model="form.pac_qms_comments" placeholder="Enter QMS Comments"  rows="3"  max-rows="6"/>
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
          label: 'Score',
          field: 'pac_score',
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

      
      

      form: {
        pac_id: '',
        pac_business_area: '',
        pac_project: '',
        pac_item: '',
        pac_reference: '',
        pac_audit_results: '',
        pac_score: '',
        pac_immediate_action: '',
        pac_causes: '',
        pac_corrective_actions: '',
        pac_due_date: '',
        pac_responsible: '',
        pac_due_implementation_date: '',
        pac_verification_date: '',
        pac_status: '',
        pac_qms_comments : ''    
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
      this.pac_business_area = ""
      this.pac_project = ""
      this.pac_item = ""
      this.pac_reference = ""
      this.pac_audit_results = ""
      this.pac_score = ""
      this.pac_immediate_action = ""
      this.pac_causes = ""
      this.pac_corrective_actions = ""
      this.pac_due_date = ""
      this.pac_responsible = ""
      this.pac_due_implementation_date = ""
      this.pac_verification_date = ""
      this.pac_status = ""
      this.pac_qms_comments = ""

      this.showAddModal = true
    },

    onReset() {
      this.showAddModal = false
      //this.showUpdateModal = false
    },

    // Save a record
    saveRecord(evt) {
      evt.preventDefault()
      /*
      if(this.form.inc_action_type == null){
          this.makeToast("warning", "Select an action")
      } else
      */
      {
        axios.post(apiServer + '/api/process_actions',
          {
            "pac_business_area": this.form.pac_business_area,
            "pac_project": this.form.pac_project,
            "pac_item": this.form.pac_item,
            "pac_reference": this.form.pac_reference,
            "pac_audit_results": this.form.pac_audit_results,
            "pac_score": this.form.pac_score,
            "pac_immediate_action": this.form.pac_immediate_action,
            "pac_causes": this.form.pac_causes,
            "pac_corrective_actions": this.form.pac_corrective_actions,
            "pac_due_date": this.form.pac_due_date,
            "pac_responsible": this.form.pac_responsible,
            "pac_due_implementation_date": this.form.pac_due_implementation_date,
            "pac_verification_date": this.form.pac_verification_date,
            "pac_status": this.form.pac_status,
            "pac_qms_comments": this.form.pac_qms_comments
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
