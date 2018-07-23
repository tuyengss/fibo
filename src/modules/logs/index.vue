<template lang="pug">
div(v-loading.fullscreen.lock='fullLoading')
  .row
    .col-md-12
      button.btn.btn-primary.pull-right(type='button' @click='metExportExcel()') Xuất Excel
  el-card.box-card.col-md-12
    .clearfix.row(slot='header', :style='{ background: "#6f42c1" }')
      el-container
        el-aside(width='200px') 
          span Lịch sử
    el-main.custom
      div.col-md-12.clearfix
        div.row
          el-select(v-model='param.servieName', clearable='', filterable='', placeholder='Service Name' @change='metChange')
            el-option(v-for='item in listServiceName', :key='item.value', :label='item.label', :value='item.value')
          el-input.form-group(v-model='param.sim', placeholder='Số điện thoại' , @change='metChange')
          el-select.form-group(v-model='param.type', clearable='', filterable='', placeholder='Loại' , @change='metChange')
            el-option(key='MT', label='Nhận', value='MO')
            el-option(key='MO', label='Gửi', value='MT')
          el-select.form-group(v-model='param.status', clearable='', filterable='', placeholder='Trạng thái' , @change='metChange')
            el-option(key='1', label='SENDING', value='1')
            el-option(key='2', label='SENT', value='2')
            el-option(key='3', label='READ', value='3')
            el-option(key='4', label='FAIL', value='4')
          el-input.form-group(v-model='param.inputKey', placeholder='từ khóa...' , @change='metChange')
          el-date-picker.form-group(v-model='daterange',type='daterange' , @change='metChange')
          el-date-picker.form-group(v-model='param.month',type='month', format="MM/yyyy",placeholder="Tháng", @change='metChangeMonth(param.month)',@selected='metChangeMonth(param.month)')
    el-table(:data='logs', height='500', style='width: 100%')
      el-table-column(prop='seq', label='STT', width='60')
      el-table-column(prop='Type', label='Loại', width='180')
      el-table-column(prop='ServiceName', label='Service Name', width='180')
      el-table-column(prop='From', label='Số điện thoại gởi', width='180')
      el-table-column(prop='To', label='Số điện thoại nhận', width='180')
      el-table-column(prop='MsgContent', label='Nội dung')
      el-table-column(prop='Time', label='Ngày', width='180')
      el-table-column(prop='StatusName', label='Trạng thái',width='100')
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      daterange:'',
      param : {
        sim:'',
        type:'',
        inputKey:'',
        servieName:'',
      },
      listServiceName:[]
    };
  },
  

  computed: {
    ...mapState('logs', ['logs', 'fullLoading']),
    ...mapState('sims', ['sims', 'fullLoading']),
  },

  methods: {
    ...mapActions('logs', ['getAllLogs','exportExcel','metChangeMonth','getAllServiceName']),
    ...mapActions('sims', ['getAllSIMs']),
    metChange() {
      this.param.date = this.daterange;
      let params = this.param;
      console.log(params);
      this.getAllLogs(params);
      
    },
    metExportExcel(){
      let param = this.param;
      this.exportExcel(param);
    },
    metChangeMonth(month){
      let firstDay = month;
      let lastDay = new Date(firstDay.getFullYear(),firstDay.getMonth()+1, 0);
      let dateRange = [firstDay,lastDay];
      this.daterange = dateRange;
      this.metChange();
    },
    metInitDateRange(){
      let lastDay = new Date();
      let firstDay = new Date(lastDay.getFullYear(),lastDay.getMonth(), 1);
      let dateRange = [firstDay,lastDay];
      this.param.date = dateRange;
    },
  },

  created() {
    this.metInitDateRange();
    let param = this.param;
    this.getAllSIMs();
    this.getAllLogs(param);
    
    this.getAllServiceName().then((data)=>{
      this.listServiceName.push({
        value:'',
        label:'',
      })
      data.data.data.forEach(item => {
        let itemSer={};
        itemSer.value=item.serviceName;
        itemSer.label=item.serviceName;
        this.listServiceName.push(itemSer);
      });
    });
    
  },
};
</script>

<style lang="scss" scoped>
.el-select,
.el-input,
.el-date-editor {
  margin-right: 5px;
  width: auto;
}

.el-date-editor--daterange {
  width: 260px !important;
}
.el-date-editor--month{
  width: 150px;
}

.box-card {
  /deep/ .el-range__close-icon {
    display: none;
  }

  /deep/ .el-card__header {
    padding: 0;
  }

  /deep/ .el-container {
    min-height: 36px;
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
  .el-main{
    padding: 0px;
    overflow: inherit;
  }
}
</style>
