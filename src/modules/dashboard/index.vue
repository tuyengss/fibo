<template lang="pug">
div
  el-row
      //- el-row.my-statistic(:gutter="20")
      //-   stats-counter.iconStype(title='Nhân Viên', :count='soLuongNhanVien', icon='fa fa-group', background-color='#27ae60')
      //-   stats-counter(title='Câu Hỏi', :count='soLuongCauHoi', icon='fa fa-question-circle-o', background-color='#4a148c')
      //-   stats-counter.iconStype(title='Khảo Sát Hoàn Thành', :count='khaoSatHoanThanh', icon='fa fa-star', background-color='#e67e22')
      //-   stats-counter.iconStype(title='Khảo Sát Chưa Hoàn Thành', :count='khaoSaoChuaHoanThanh', icon='fa fa-star-half-o', background-color='#d35400')
      el-row
        //- stats-line-chart(chart-id="distributedDomains", 
        //-                 title="Lưu lượng tin nhắn",
        //-                 header-color="#6f42c1",
        //-                 icon="globe",
        //-                 :listData="listCombineUserCompany",
        //-                 :listUserCodes="listUserCodes",
        //-                 :listUserPhones="listUserPhones",
        //-                 :legend='true')
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

import StatsCounter from './widget/StatsCounter';
import StatsLineChart from './widget/StatsLineChart';

export default {
  data() {
    return {
      loading: false,
    };
  },

  components: {
    StatsCounter,
    StatsLineChart,
  },

  methods: {},
  created() {},
};
</script>

<style>
.iconStype > .content > i {
  font-size: 100px !important;
  top: 10px !important;
}

.my-statistic {
  margin-bottom: 10px;
}
</style>
