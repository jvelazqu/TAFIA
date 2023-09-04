<template>inc_identificator
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('incidences') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
    <b-modal  v-model="showAddModal" title="Adding record" size="lg" hide-footer>
      <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
        <b-container fluid>
          <b-row>
            <b-form-group class="col-md-3 mb-3" id="input-group-1" label="ID" label-for="input-for-inc_identificator">
              <b-form-input id="input-for-inc_identificator" v-model="form.inc_identificator" required placeholder="Enter ID"/>
            </b-form-group>

            <b-form-group class="col-md-3 mb-3" id="input-group-2" label="Class" label-for="input-for-inc_class">
              <b-form-input id="input-for-inc_class" v-model="form.inc_class" required placeholder="Enter class"/>
            </b-form-group>

            <b-form-group class="col-md-3 mb-3" id="input-group-3" label="Area" label-for="input-for-inc_area">
              <b-form-input id="input-for-inc_area" v-model="form.inc_area" required placeholder="Enter area"/>
            </b-form-group>

            <b-form-group class="col-md-3 mb-3" id="input-group-4" label="Process" label-for="input-for-inc_process">
              <b-form-input id="input-for-inc_process" v-model="form.inc_process" required placeholder="Enter process"/>
            </b-form-group>
          </b-row>

          <b-row>            
            <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Non conformity description" label-for="input-for-inc_non_conformity_description">
              <b-form-textarea id="textarea-group-5" v-model="form.inc_non_conformity_description" placeholder="Enter non conformity description"  rows="3"  max-rows="6"/>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group class="col-md-4 mb-3" id="input-group-6" label="IATF Clause" label-for="input-for-inc_iatf_clause">
              <b-form-input id="input-for-inc_iatf_clause" v-model="form.inc_iatf_clause" required placeholder="Enter IATF Clause"/>
            </b-form-group>

            <b-form-group class="col-md-4 mb-3" id="input-group-7" label="Root cause due date" label-for="input-for-inc_root_cause_due_date">
              
              <b-form-datepicker id="example-datepicker" v-model="form.inc_root_cause_due_date" class="mb-2"></b-form-datepicker>
              
            </b-form-group>

            <b-form-group class="col-md-4 mb-3" id="input-group-8" label="Corrective action due date" label-for="input-for-inc_corrective_action_date">
                
                <b-form-datepicker id="example-datepicker" v-model="form.inc_corrective_action_date" class="mb-2"></b-form-datepicker>
              </b-form-group>
          </b-row>

          <b-row>            
            <b-form-group class="col-md-12 mb-3" id="input-group-9" label="Action description" label-for="input-for-inc_action_description">
              <b-form-textarea id="textarea-group-9" v-model="form.inc_action_description" placeholder="Enter action description"  rows="3"  max-rows="6"/>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group class="col-md-6 mb-3" id="input-group-10" label="Type of action" label-for="input-for-inc_action_type">
              <b-form-select v-model="selected" :options="options_action_type"></b-form-select>
            </b-form-group>

            <b-form-group class="col-md-6 mb-3" id="input-group-11" label="Responsible" label-for="input-for-inc_usr_id">
              <b-form-input id="input-for-inc_usr_id" v-model="form.inc_usr_id" required placeholder="Enter responsible"/>
            </b-form-group>
            </b-row>

            <b-row>
            <b-form-group class="col-md-6 mb-3" id="input-group-12" label="Due date" label-for="input-for-inc_due_date">
              <b-form-datepicker id="example-datepicker" v-model="form.inc_due_date" class="mb-2"></b-form-datepicker>
            </b-form-group>

            <b-form-group class="col-md-6 mb-3" id="input-group-13" label="Status" label-for="input-for-inc_status">
              <b-form-input id="input-for-inc_status" v-model="form.inc_status" required placeholder="Enter status"/>
            </b-form-group>
          </b-row>


          <b-row>            
            <b-form-group class="col-md-12 mb-3" id="input-group-14" label="QMS Comments" label-for="input-for-inc_qms_comments">
              <b-form-textarea id="textarea-group-9" v-model="form.inc_qms_comments" placeholder="Enter QMS Comments"  rows="3"  max-rows="6"/>
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
  
    <!--Update Record Modal-->
    <b-modal  v-model="showUpdateModal"  title="Editing record"  >
      <b-container fluid>              
        <b-form @submit="updateRecord" @reset="onReset" id="formUpdateRecord">
          <b-row>
            <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Username" label-for="input-for-">
              <b-form-input id="input-for-username" v-model="form.user_name" required placeholder="Enter user name"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Full Name" label-for="input-for-full_name">
              <b-form-input id="input-for-full_name" v-model="form.full_name" required placeholder="Enter full name"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-3" label="E-mail" label-for="input-for-email">
              <b-form-input id="input-for-email" v-model="form.email" required placeholder="Enter email" type="email"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-4" label="Password" label-for="input-for-password" description="Leave empty to not change password">
              <b-form-input id="input-for-password" v-model="form.password"  placeholder="Enter password" type="password"/>
            </b-form-group>
            
            <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Group" label-for="select-for-group">
              <b-form-select id="select-for-group" v-model="form.group" required :options="form.optionsGroups" />
            </b-form-group>

             <b-form-group class="col-md-12 mb-3" id="input-group-3" >
              <b-form-checkbox id="checkbox-1" v-model="form.status" name="checkbox-1"  value="On" unchecked-value="Off">
                Status: <strong>{{ form.status }}</strong>
              </b-form-checkbox>               
            </b-form-group>

            <div class="col-md-12 mb-3 text-right">    
              <b-button type="submit" variant="primary">Update</b-button>&nbsp;      
              <b-button type="reset" variant="danger" @click="showUpdateModal = false">Close</b-button>
            </div>

          </b-row>
        </b-form>
      </b-container>
      <div slot="modal-footer" class="w-100">                
      </div>
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
  import {apiServer} from "@/data/config";
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
          },
          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false
          } 
        ], 

        selected: null,
          options_action_type: [
            { value: null, text: 'Please select an action' },
            { value: 'Containment', text: 'Containment action' },
            { value: 'Corrective', text: 'Corrective action' },            
          ],

        rows: [],
        groupsRows: [],

        form: {
          inc_id: '',
          inc_identificator: '',
          inc_class: '',
          inc_area: '',
          inc_process: '',
          inc_non_conformity_description: '',
          inc_iatf_clause: '',
          inc_root_cause_due_date: '',
          inc_corrective_action_date: '',
          inc_action_description: '',
          inc_action_type: '',
          inc_due_date: '',
          inc_status: '',
          inc_qms_comments: ''
          //  group: null,          
          //  optionsGroups: [],
          //  status: ''
        }, 
        showAddModal: false,
        showUpdateModal: false
      };
    },

    created() {
       this.getRows(),
       this.getGroups()
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
      
      // Get all records from API
      getRows(){      
        axios.get(apiServer+'/api/'+this.table,           
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

      // Save a record
      saveRecord(evt) {
        evt.preventDefault()

/*
        if(this.form.inc_action_type == null){
            this.makeToast("warning", "Select an action")
        } else
        */
        {
          axios.post(apiServer+'/api/incidences',           
            {
            "inc_identificator": inc_identificator,
            "inc_class": inc_class,
            "inc_area": inc_area,
            "inc_process": inc_process,
            "inc_non_conformity_description": inc_non_conformity_description,
            "inc_iatf_clause": inc_iatf_clause,
            "inc_root_cause_due_date": inc_root_cause_due_date,
            "inc_corrective_action_date": inc_corrective_action_date,
            "inc_action_description": inc_action_description,
            "inc_action_type": inc_action_type,
            "inc_due_date": inc_due_date,
            "inc_status": 'Open',
            "inc_qms_comments": inc_qms_comments,
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

      // Update a record
      updateRecord(evt){
        evt.preventDefault(),

        axios.put(apiServer+'/api/incidences/'+this.form.inc_id,   
          {
            "inc_identificator": this.inc_identificator,
            "inc_class": this.inc_class,
            "inc_area": this.inc_area,
            "inc_process": this.inc_process,
            "inc_non_conformity_description": this.inc_non_conformity_description,
            "inc_iatf_clause": this.inc_iatf_clause,
            "inc_root_cause_due_date": this.inc_root_cause_due_date,
            "inc_corrective_action_date": this.inc_corrective_action_date,
            "inc_action_description": this.inc_action_description,
            "inc_action_type": this.inc_action_type,
            "inc_due_date": this.inc_due_date,
            "inc_status": this.inc_status,
            "inc_qms_comments": this.inc_qms_comments,
            "user": username
          },
          { 
            headers: { 
              'Content-Type': 'application/json',  
              'x-access-token': JSON.parse(localStorage.getItem("userInfo")).token
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.showUpdateModal = false
              this.makeToast("success", "Record updated")  
              this.getRows()
            }
          })
          .catch(error => {
            this.makeToast("warning", "Can not update record")
          })        
      },

      showDeleteRecordModal(id) {
        //this.boxTwo = "";
        this.$bvModal
          .msgBoxConfirm("Do you want to delete this record", {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }).then(value => {
            //this.boxTwo = value

            if(id == 1){
              this.makeToast("warning", "You can't delete this record") 
            }else{
              if(value){
              
                axios.delete(apiServer+'/api/incidences/'+id,  
                {
                  data:{
                    "user": username
                  }                  
                },         
                { 
                  headers: { 
                    'Content-Type': 'application/json',  
                    'x-access-token': JSON.parse(localStorage.getItem("userInfo")).token
                  }
                }).then(res => {
                  this.makeToast("success", "Record deleted")  
                  this.getRows()      
                }).catch(error => {
                  this.makeToast("warning", "Can not delete user")
                })            
              }
            }          
          }).catch(err => {
            // An error occurred
          });
      },


      // Show a modal with a form to add a record
      showAddRecordModal(){
        this.inc_identificator = ""
        this.inc_class = ""
        this.inc_area = ""
        this.inc_process = ""
        this.inc_non_conformity_description = ""
        this.inc_iatf_clause = ""
        this.inc_root_cause_due_date = ""
        this.inc_corrective_action_date = ""
        this.inc_action_description = ""
        this.inc_action_type = ""
        this.inc_due_date = ""
        this.inc_status = ""
        this.inc_qms_comments = ""
        
        this.showAddModal = true
      },

      showUpdateRecordModal(recordInfo) {
        this.inc_identificator = recordInfo.inc_identificator
        this.inc_class = recordInfo.inc_class
        this.inc_area = recordInfo.inc_area
        this.inc_process = recordInfo.inc_process
        this.inc_non_conformity_description = recordInfo.inc_non_conformity_description
        this.inc_iatf_clause = recordInfo.inc_iatf_clause
        this.inc_root_cause_due_date = recordInfo.inc_root_cause_due_date
        this.inc_corrective_action_date = recordInfo.inc_corrective_action_date
        this.inc_action_description = recordInfo.inc_action_description
        this.inc_action_type = recordInfo.inc_action_type
        this.inc_due_date = recordInfo.inc_due_date
        this.inc_status = recordInfo.inc_status
        this.inc_qms_comments = recordInfo.inc_qms_comments
        
        this.showUpdateModal = true
      },

      onReset(){
        this.showAddModal = false
        this.showUpdateModal = false
      },

      // Custom methods
      getGroups(){
        this.form.optionsGroups = []
        //this.form.optionsGroups.push({ "text":"Please, select a Customer", "value": null })
        
        axios.get(apiServer+'/api/groups')           
        .then(res => {
          this.groupsRows = res.data
          res.data.forEach((group) => {
            this.form.optionsGroups.push({ "text":group.grp_name, "value": group.grp_id })      
          })      
        })        
        .catch(error => {
          this.makeToast("warning", "Can not get data")
        });
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
