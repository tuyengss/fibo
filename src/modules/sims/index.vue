<template lang="pug">
div(v-loading.fullscreen.lock='fullLoading')
  el-dialog(title='Edit Port', :visible.sync='dialogFormVisible')
    el-form(:model='formPort')
      el-form-item(label='Port', :label-width='formLabelWidth')
        el-input(v-model='formPort.port',disabled=true)
      el-form-item(label='API Key', :label-width='formLabelWidth')
        el-input(v-model='formPort.api_key' style='width: 100%;')
        el-button(type='primary', @click='newgenapikey()') Renew generate api key
      el-form-item(label='Phone number', :label-width='formLabelWidth')
        el-input(v-model='formPort.number')
      el-form-item(label='Telco', :label-width='formLabelWidth')
        el-select(v-model='formPort.telco', placeholder='Please select a telco')
          el-option(value="vinaphone") vinaphone
          el-option(value="mobilephone") mobilephone 
          el-option(value="viettel") viettel
          el-option(value="vietnamobile") vietnamobile
      el-form-item(label='Service Name', :label-width='formLabelWidth')
        el-input(v-model='formPort.serviceName')
      el-form-item(label='Status Port', :label-width='formLabelWidth')
        el-checkbox(v-model='formPort.status_port')
      el-form-item(label='Support Unicode', :label-width='formLabelWidth')
        el-checkbox(v-model='formPort.support_unicode')
    span.dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false') Cancel
      el-button(type='primary', @click='handleEditPort()') Confirm
  
  el-dialog(title='Edit Forward', :visible.sync='dialogFormVisibleForward')
    el-form(:model='formForward')
      el-form-item(label='Port', :label-width='formLabelWidth')
        el-input(v-model='formForward.Port',disabled=true)
      el-form-item(label='Tên khách hàng', :label-width='formLabelWidth')
        el-input(v-model='formForward.CustomerName' style='width: 100%;')
      el-form-item(label='Username', :label-width='formLabelWidth')
        el-input(v-model='formForward.UserName')
      el-form-item(label='User Id', :label-width='formLabelWidth')
        el-input(v-model='formForward.UserId')
      el-form-item(label='PasswordAPI', :label-width='formLabelWidth')
        el-input(v-model='formForward.PasswordAPI')
      el-form-item(label='ServiceId', :label-width='formLabelWidth')
        el-input(v-model='formForward.ServiceId')
      el-form-item(label='PhoneNumber', :label-width='formLabelWidth')
        el-input(v-model='formForward.PhoneNumber')
      el-form-item(label='Active', :label-width='formLabelWidth')
        el-checkbox(v-model='formForward.Active')
      el-form-item(label='EmailSender', :label-width='formLabelWidth')
        el-input(v-model='formForward.EmailSender')
      el-form-item(label='PasswordEmailSend', :label-width='formLabelWidth')
       el-input(v-model='formForward.PasswordEmailSend')
      el-form-item(label='EmailRecive', :label-width='formLabelWidth')
        el-input(v-model='formForward.EmailRecive' style='width: 100%;')
      el-form-item(label='Subject', :label-width='formLabelWidth')
        el-input(v-model='formForward.Subject' style='width: 100%;')
    span.dialog-footer(slot='footer')
      el-button(@click='dialogFormVisibleForward = false') Cancel
      el-button(type='primary', @click='handleUpdateForward()') Confirm

  el-card.box-card
    .clearfix(slot='header', :style='{ background: "#6f42c1" }')
      el-container
        el-aside(width='200px') 
          span Danh sách SIM 
    el-main.custom
      el-input(v-model="portnumber",placeholder='Port',@change="metChangedPort")
      el-input(v-model="searchnumber",placeholder='Số điện thoại',@change="metChangednumber")
      el-input(v-model='searchServiceName', placeholder='Service Name...' , @change='metChangedServiceName')
      el-select(v-model='selectedTelco', clearable='', filterable='', placeholder='Nhà mạng' , @change='metChangedTelco')
          el-option(value="vinaphone") vinaphone
          el-option(value="mobilephone") mobilephone 
          el-option(value="viettel") viettel
          el-option(value="vietnamobile") vietnamobile
      el-select(v-model='selectedSimStatus', clearable='', filterable='', placeholder='Trạng thái sim' , @change='metChangedSimStatus')
          el-option(value=1) READY
          el-option(value=2) PAUSE 
          el-option(value=3) WARING
    el-table(:data='sims', style='width: 100%')
      el-table-column(prop='seq', label='STT', width='60')
      el-table-column(prop='port', label='Port',width='120')
      el-table-column(prop='serviceName', label='Service Name',width='160')
      el-table-column(prop='number', label='SimNumber',width='160')
      el-table-column(prop='telco', label='Telco',width='150')
      el-table-column(prop='new_status_port', label='Status Port',width='100')
      el-table-column(prop='status_sim', label='Status Sims',width='100')
      el-table-column(prop='success_sms', label='Sucess SMS',width='100')
      el-table-column(prop='fail_sms', label='Fail SMS',width='100')
      el-table-column(prop='last_sucess', label='Last Sucess',width='160')
      el-table-column(prop='last_fail', label='Last Fail',width='160')
      el-table-column(prop='support_unicode',label='Support Unicode',width='100')
      el-table-column(label="Operations",width='300')
        template(slot-scope='scope')
          el-button(type="info", @click='handleEdit(scope.$index, scope.row)') Edit
          el-button(type="info", @click='handleEditForward(scope.$index, scope.row)') Edit Forward
          el-button(type="danger",v-if="scope.row.status_port == true",@click="updateStatusPortNumber(scope.row,false)") DEACTIVE
          el-button(type="success",v-else-if="scope.row.status_port == false",@click="updateStatusPortNumber(scope.row,true)") ACTIVE
</template>
<style>
  .el-input {
    width: 200px;
  }
</style>

<script>
import { mapActions, mapState } from 'vuex';
const cryptoRandomString = require('crypto-random-string');

export default {
  data() {
    return {
      selectedTelco: '',
      selectedSimStatus: '',
      searchnumber:'',
      portnumber:'',
      searchServiceName:'',
      dialogFormVisible:false,
      dialogFormVisibleForward:false,
      formPort:{
        port:'',
        number:'',
        telco:'',
        status_port:false,
        status_sim:'',
        serviceName:'',
        support_unicode:false,
        api_key:'',
      },
      formForward:{
        Port:'',
        CustomerName:'',
        UserName:'',
        UserId:'',
        PasswordAPI:'',
        ServiceId:0,
        PhoneNumber:'',
        Active:false,
        EmailSender:'',
        PasswordEmailSend:'',
        EmailRecive:'',
        Subject:'',
      },
      formLabelWidth: '150px'
    };
  },

  computed: {
    ...mapState('sims', ['sims', 'telcos', 'fullLoading']),
  },

  methods: {
    ...mapActions('sims', ['getAllSIMs', 'getAllTelcos','updateStatusPort','getPortbyId','updatePort','getForwardbyPort','updateForward']),
    metChangedTelco(telco) {
      this.getAllSIMs({ telco });
    },
    metChangedServiceName(searchServiceName){
      this.getAllSIMs({ serviceName:searchServiceName });
    },
    metChangedSimStatus(status_sim){
      this.getAllSIMs({ status_sim });
    },
    metChangednumber(number){
       this.getAllSIMs({ number });
    },
    metChangedPort(port){
      this.getAllSIMs({ port });
    },
    handleEdit(index, row) {
        //console.log(index, row.status_port);
        this.getPortbyId({port:row.port}).then(({data})=>{
          console.log(data)
          if(data.data){
            this.dialogFormVisible=true;
            const itemPort=data.data;
            this.formPort.port=itemPort.port;
            this.formPort.number=itemPort.number;
            this.formPort.serviceName=itemPort.serviceName;
            this.formPort.telco=itemPort.telco;
            this.formPort.status_port=itemPort.status_port;
            this.formPort.support_unicode=itemPort.support_unicode;
            this.formPort.api_key=itemPort.api_key;
          }
        });
    },
    handleEditForward(index,row){
      this.getForwardbyPort({port:row.port}).then(({data})=>{
          if(data){
            this.dialogFormVisibleForward=true;
            console.log(data.Port);
            this.formForward.Port=data.Port;
            this.formForward.CustomerName=data.CustomerName;
            this.formForward.UserName=data.UserName;
            this.formForward.UserId=data.UserId;
            this.formForward.PasswordAPI=data.PasswordAPI;
            this.formForward.ServiceId=data.ServiceId;
            this.formForward.Active=data.Active;
            this.formForward.EmailSender=data.EmailSender;
            this.formForward.PasswordEmailSend=data.PasswordEmailSend;
            this.formForward.EmailRecive=data.EmailRecive;
            this.formForward.Subject=data.Subject;
            this.formForward.PhoneNumber=data.PhoneNumber;
            
          }
      });
    },
    // handleCommand(command){
    //     console.log(command);
    // },
    handleEditPort(){
      const dataupdate={
         port:this.formPort.port,
         number: this.formPort.number,
         serviceName:this.formPort.serviceName,
         telco:this.formPort.telco,
         status_port:this.formPort.status_port,
         support_unicode:this.formPort.support_unicode,
         api_key:this.formPort.api_key,
      }
      console.log(dataupdate);
      this.updatePort(dataupdate).then(({data})=>{
         this.getAllSIMs();
         this.dialogFormVisible=false;
      });
    },
    handleUpdateForward(){
      const dataupdate={
         Port:this.formForward.Port,
         CustomerName: this.formForward.CustomerName,
         UserName:this.formForward.UserName,
         UserId:this.formForward.UserId,
         PasswordAPI:this.formForward.PasswordAPI,
         ServiceId:this.formForward.ServiceId,
         Active:this.formForward.Active,
         EmailSender:this.formForward.EmailSender,
         PasswordEmailSend:this.formForward.PasswordEmailSend,
         EmailRecive:this.formForward.EmailRecive,
         Subject:this.formForward.Subject,
         PhoneNumber:this.formForward.PhoneNumber
      }
      this.updateForward(dataupdate).then(({data})=>{
        console.log(data);
        this.dialogFormVisibleForward=false;
      })
    },
    updateStatusPortNumber(row,status_port){
      console.log(row.port,status_port);
      this.updateStatusPort({port:row.port,status_port:status_port}).then(({data})=>{
         this.getAllSIMs();
      });
    },
    newgenapikey(){
      this.formPort.api_key=cryptoRandomString(30);
    }
  },

  created() {
    //this.getAllTelcos();
    this.getAllSIMs();
    
  },
};
</script>

<style lang="scss" scoped>
.custom {
  padding: 0px !important;
}
.el-select,
.el-input,
.el-date-editor {
  margin-right: 5px;
}

.el-date-editor {
  width: 260px !important;
}

.box-card {
  /deep/ .el-range__close-icon {
    display: none;
  }

  /deep/ .el-card__header {
    padding: 0;
  }

  /deep/ .el-container {
    height: 40px;
  }

  /deep/ .el-card__body {
    padding: 0;
  }

  span {
    position: relative;
    top: 8px;
    padding-left: 10px;
    color: white;
    font-size: 16px;
    opacity: 0.7;
  }

  .clearfix {
    padding: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
}
</style>
