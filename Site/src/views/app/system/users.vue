<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('users') }}</strong></li>
    </ol>

    <!--Add Record Modal-->
    <b-modal  v-model="showAddModal" title="Adding record" hide-footer>
      <b-container fluid>
        <b-form @submit="saveRecord" @reset="onReset" id="formAddRecord">
          <b-form-group class="col-md-12 mb-3" id="input-group-1" label="Username" label-for="input-for-">
            <b-form-input id="input-for-username" v-model="form.user_name" required placeholder="Enter user name"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-2" label="Full Name" label-for="input-for-full_name">
            <b-form-input id="input-for-full_name" v-model="form.full_name" required placeholder="Enter full name"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-3" label="E-mail" label-for="input-for-email">
            <b-form-input id="input-for-email" v-model="form.email" required placeholder="Enter email" type="email"/>
          </b-form-group>

          <b-form-group class="col-md-12 mb-3" id="input-group-4" label="Password" label-for="input-for-password">
            <b-form-input id="input-for-password" v-model="form.password" required placeholder="Enter password" type="password"/>
          </b-form-group>
          
          <b-form-group class="col-md-12 mb-3" id="input-group-5" label="Group" label-for="select-for-group">
            <b-form-select id="select-for-group" v-model="form.group" required :options="form.optionsGroups" />
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
      title: "Users"
    },
    data() {
      return {
        table: 'users',

        columns: [
          {
            label: 'ID',
            field: 'usr_id',
            hidden: true
          },
          {
            label: 'Username',
            field: 'usr_name',
          },
          {
            label: 'Full Name',
            field: 'usr_full_name',
          },
          {
            label: 'E-Mail',
            field: 'usr_email',
          },          
          {
            label: 'Group',
            field: 'grp_name',
          },
          {
            label: 'Status',
            field: 'usr_status',
          },
          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false
          } 
        ], 

        rows: [],
        groupsRows: [],

        form: {
          id: '',
          user_name: '',
          full_name: '',
          email: '',
          password: '',
          group: null,          
          optionsGroups: [],
          status: ''
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

        if(this.form.group == 0){
            this.makeToast("warning", "Select a group")
        }else{
          axios.post(apiServer+'/api/users',           
          {
            "usr_name": this.form.user_name,
            "usr_full_name": this.form.full_name,
            "usr_email": this.form.email,
            "usr_password": this.form.password,
            "usr_grp_id": this.form.group,
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

        axios.put(apiServer+'/api/users/'+this.form.usr_id,   
          {
            "usr_full_name": this.form.full_name,
            "usr_email": this.form.email,
            "usr_password": this.form.password,
            "usr_grp_id": this.form.group,
            "usr_status": this.form.status,
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
              
                axios.delete(apiServer+'/api/users/'+id,  
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
        
        this.form.usr_name = ""
        this.form.full_name = ""
        this.form.email = ""
        this.form.password = ""
        this.form.group = 0
        
        this.showAddModal = true
      },

      showUpdateRecordModal(userInfo){
        //alert(userInfo.usr_name)
        this.form.usr_id = userInfo.usr_id
        this.form.user_name = userInfo.usr_name
        this.form.full_name = userInfo.usr_full_name
        this.form.email = userInfo.usr_email
        this.form.password = userInfo.usr_password
        this.form.group = userInfo.usr_grp_id
        this.form.status = userInfo.usr_status
        
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
