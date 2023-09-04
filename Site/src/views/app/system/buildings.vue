<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('buildings') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
    <b-modal  v-model="showAddModal" title="Adding record" hide-footer>
      <b-container fluid>
        <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
          <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Building" label-for="input-1">
            <b-form-input id="input-1" v-model="form.bld_name" required placeholder="Enter building name"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Description" label-for="input-2">
            <b-form-input id="input-2" v-model="form.bld_description" required placeholder="Enter building description"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Location" label-for="select-1">
            <b-form-select id="select-1" v-model="form.bld_loc_id" required :options="form.optionsLocations" />
          </b-form-group>

          <div class="col-md-12 mb-3 text-right">    
            <b-button type="submit" variant="primary">Save</b-button>&nbsp;      
            <b-button type="reset" variant="danger" @click="showAddModal = false">Close</b-button>
          </div>

        </b-form>
      </b-container>                      
    </b-modal>

    <!--Update Record Modal-->
    <b-modal  v-model="showUpdateModal"  title="Editing record"  >
      <b-container fluid>              
        <b-form @submit="updateRecord" @reset="onReset" id="formUpdateRecord">
          <b-row>
            <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Building" label-for="input-1">
              <b-form-input id="input-1" v-model="form.bld_name" required readonly placeholder="Enter building name"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Description" label-for="input-2">
              <b-form-input id="input-2" v-model="form.bld_description" required placeholder="Enter building description"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Location" label-for="select-1">
              <b-form-select id="select-1" v-model="form.bld_loc_id" required :options="form.optionsLocations" />
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-3" >
              <b-form-checkbox id="checkbox-1" v-model="form.bld_status" name="checkbox-1"  value="On" unchecked-value="Off">
                Status: <strong>{{ form.bld_status }}</strong>
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
                  <i class="i-Close-Window text-25 text-danger" @click="showDeleteRecordModal(props.row.bld_id)" style="cursor: pointer;"></i>
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
      title: "Buildings"
    },
    data() {
      return {
        table: 'buildings',

        columns: [
          {
            label: 'ID',
            field: 'bld_id',
            hidden: false
          },
          {
            label: 'Building',
            field: 'bld_name',
          },
          {
            label: 'Description',
            field: 'bld_description',
          },
          {
            label: 'Location',
            field: 'loc_name',
          },
          {
            label: 'Status',
            field: 'bld_status',
          },
          {
            label: 'Create date',
            field: 'bld_create_date',
          },
          {
            label: 'Update date',
            field: 'bld_update_date',
          },
          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false
          } 
        ], 

        rows: [],
        rowsLocations: [],

        form: {
          bld_id: '',
          bld_name: '',
          bld_description: '',
          bld_status: '',
          bld_loc_id: '',
          optionsLocations: []
        }, 
        showAddModal: false,
        showUpdateModal: false
      };
    },

    created() {
       this.getRows(),
       this.getLocations()
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

      getLocations(){      
        this.form.optionsLocations = []
        
        axios.get(apiServer+'/api/locations')           
        .then(res => {
          this.rowsLocations = res.data
          res.data.forEach((location) => {
            this.form.optionsLocations.push({ "text":location.loc_name, "value": location.loc_id })      
          })      
        })        
        .catch(error => {
          this.makeToast("warning", "Can not get data")
        });
      },

      // Save a record
      saveRecord(evt) {
        evt.preventDefault()

       {
          axios.post(apiServer+'/api/'+this.table,           
          {
            "bld_name": this.form.bld_name,
            "bld_description": this.form.bld_description,
            "bld_loc_id": this.form.bld_loc_id,
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

        axios.put(apiServer+'/api/'+this.table+'/'+this.form.bld_id,   
          {
            "bld_description": this.form.bld_description,
            "bld_status": this.form.bld_status,
            "bld_loc_id": this.form.bld_loc_id,
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

      // Show a modal to confirm delete a record
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
              
                axios.delete(apiServer+'/api/'+this.table+'/'+id,  
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
        
        this.form.bld_name = ""
        this.form.bld_description = ""
        this.showAddModal = true
      },

      // Show a modal with information to edit and update it
      showUpdateRecordModal(userInfo){
        this.form.bld_id = userInfo.bld_id
        this.form.bld_name = userInfo.bld_name
        this.form.bld_description = userInfo.bld_description
        this.form.bld_status = userInfo.bld_status
        this.form.bld_loc_id = userInfo.bld_loc_id
        
        this.showUpdateModal = true
      },

      // Hide modals
      onReset(){
        this.showAddModal = false
        this.showUpdateModal = false
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
