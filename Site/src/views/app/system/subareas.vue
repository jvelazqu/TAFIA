<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('subareas') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
    <b-modal  v-model="showAddModal" title="Adding record" hide-footer>
      <b-container fluid>
        <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
          <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Sub area" label-for="input-1">
            <b-form-input id="input-1" v-model="form.sua_name" required placeholder="Enter sub area name"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Description" label-for="input-2">
            <b-form-input id="input-2" v-model="form.sua_description" required placeholder="Enter sub area description"/>
          </b-form-group>

         <b-form-group class="col-md-12 mb-3" id="input-group-3" label="Area" label-for="select-1">
            <b-form-select id="select-1" v-model="form.sua_are_id" required :options="form.optionsAreas" />
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
            <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Parameter" label-for="input-1">
              <b-form-input id="input-1" v-model="form.sua_name" required readonly placeholder="Enter parameter name"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Description" label-for="input-2">
              <b-form-input id="input-2" v-model="form.sua_description" required placeholder="Enter parameter description"/>
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-3" label="Area" label-for="select-1">
              <b-form-select id="select-1" v-model="form.sua_are_id" required :options="form.optionsAreas" />
            </b-form-group>

            <b-form-group class="col-md-12 mb-3" id="input-group-3" >
              <b-form-checkbox id="checkbox-1" v-model="form.sua_status" name="checkbox-1"  value="On" unchecked-value="Off">
                Status: <strong>{{ form.sua_status }}</strong>
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
                  <i class="i-Close-Window text-25 text-danger" @click="showDeleteRecordModal(props.row.sua_id)" style="cursor: pointer;"></i>
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
      title: "Sub Areas"
    },
    data() {
      return {
        table: 'sub_areas',

        columns: [
          {
            label: 'ID',
            field: 'sua_id',
            hidden: false
          },
          {
            label: 'Name',
            field: 'sua_name',
          },
          {
            label: 'Description',
            field: 'sua_description',
          },
          {
            label: 'Area',
            field: 'are_name',
          },
          {
            label: 'Status',
            field: 'sua_status',
          },
          {
            label: 'Create date',
            field: 'sua_create_date',
          },
          {
            label: 'Update date',
            field: 'sua_update_date',
          },
          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false
          } 
        ], 

        rows: [],
        rowsAreas: [],

        form: {
          sua_id: '',
          sua_name: '',
          sua_description: '',
          sua_status: '',
          sua_are_id: '',
          optionsAreas: []
        }, 
        showAddModal: false,
        showUpdateModal: false
      };
    },

    created() {
       this.getRows()
       this.getAreas()
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

      // Get areas
      getAreas(){      
        this.form.optionsAreas = []
        
        axios.get(apiServer+'/api/areas')           
        .then(res => {
          this.rowsAreas = res.data
          res.data.forEach((area) => {
            this.form.optionsAreas.push({ "text":area.are_name, "value": area.are_id })      
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
            "sua_name": this.form.sua_name,
            "sua_description": this.form.sua_description,
            "sua_are_id": this.form.sua_are_id,
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

        axios.put(apiServer+'/api/'+this.table+'/'+this.form.sua_id,   
          {
            "sua_description": this.form.sua_description,
            "sua_are_id": this.form.sua_are_id,
            "sua_status": this.form.sua_status,
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
        
        this.form.sua_name = ""
        this.form.sua_description = ""
        this.form.sua_are_id = ""
        this.showAddModal = true
      },

      // Show a modal with information to edit and update it
      showUpdateRecordModal(userInfo){
        this.form.sua_id = userInfo.sua_id
        this.form.sua_name = userInfo.sua_name
        this.form.sua_description = userInfo.sua_description
        this.form.sua_are_id = userInfo.sua_are_id
        this.form.sua_status = userInfo.sua_status
        
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
