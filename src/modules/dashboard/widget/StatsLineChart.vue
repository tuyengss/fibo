<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  el-card.box-card
    .clearfix(slot='header', :style='{ background: headerColor }')
      el-container
        el-aside(width='200px') 
          span {{title}}
        el-main.custom
          el-select(v-model='searchUserCode', clearable='', filterable='', placeholder='Theo SIM' , @change='metChangeUserCode')
            el-option(v-for='item in listUserCodes', :key='item._id', :label='item.username', :value='item.username')
          el-date-picker(v-model='pickedDates', 
                      type='daterange', 
                      clearable=false,
                      start-placeholder='Start date', 
                      end-placeholder='End date',
                      @change='dateRangeChangeEvent')
    line-chart(:ref='chartId',
              :chart-id='chartId',
              :chart-data='chartData',
              :options='chartOpts',
              :height='400')
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import { apiUrl } from '../../../config';
import LineChart from '../../../components/linechart';

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_OPTIONS = {
  responsive: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Ngày',
        },
        gridLines: {
          display: true,
          borderDash: [2, 2],
          tickMarkLength: 1,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Số lượng tin nhắn',
        },
        gridLines: {
          display: true,
          borderDash: [2, 2],
          tickMarkLength: 1,
        },

        ticks: {
          //stepSize: 1,
          min: 0,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

export default {
  props: {
    chartId: String,
    title: String,
    uri: String,
    headerColor: {
      type: String,
      default: 'blue',
    },
    icon: {
      type: String,
      default: 'timeline',
    },
    legend: {
      type: Boolean,
      default: true,
    },
    type: String, // {D|P|S|I|C}
    options: Object,
    listData: Array,

    listUserCodes: Array,
    listUserPhones: Array,
  },

  components: {
    LineChart,
  },

  data() {
    return {
      loading: false,
      chartDataFromUri: {},
      pickedDates: [
        moment()
          .add(-30, 'days')
          .format(DATE_FORMAT),
        moment().format(DATE_FORMAT),
      ],

      searchText: '',
      searchProvince: '',
      searchDistrict: '',
      searchUserCode: '',
      searchUserPhone: '',
      lstProvince: [],
      lstDistrict: [],
      lstDistrictFull: [],
    };
  },

  computed: {
    from() {
      return moment(this.pickedDates[0]);
    },

    fromDt() {
      return moment(this.pickedDates[0]).format(DATE_FORMAT);
    },

    to() {
      return moment(this.pickedDates[1]);
    },

    toDt() {
      return moment(this.pickedDates[1]).format(DATE_FORMAT);
    },

    dates() {
      let dates = [];
      let diff = this.to.diff(this.from, 'days');
      dates.push(`${this.from.format(DATE_FORMAT)}`);
      for (let i = 1; i <= diff; i++) {
        let nextDay = moment(this.from).add(i, 'days');
        dates.push(`${nextDay.format(DATE_FORMAT)}`);
      }
      return dates;
    },

    chartOpts() {
      return _.assignIn(DEFAULT_OPTIONS, this.options);
    },

    chartData() {
      const { series, labels } = this.chartDataFromUri;
      if (!series) return {};
      const datasets = series.map(s => ({
        label: s.name,
        fill: false,
        backgroundColor: s.color,
        borderColor: s.color,
        data: s.data,
      }));
      return {
        labels,
        datasets,
      };
    },
  },

  methods: {
    onTextSearchEnter(event) {
      event.preventDefault();
      this.getChartData();
    },

    metHandlerSearch() {
      this.getChartData();
    },

    metChangeProvinceSearch() {
      let provinceObj = _.find(this.lstProvince, o => {
        return o.name_with_type === this.searchProvince;
      });
      this.searchDistrict = '';

      this.getChartData();

      if (provinceObj) {
        this.lstDistrict = this.lstDistrictFull.filter(item => {
          return provinceObj.code === item.parent_code;
        });
      } else {
        return [];
      }
    },

    metChangeDistrict() {
      this.getChartData();
    },

    metChangeUserCode() {
      this.getChartData();
    },

    metChangeUserPhone() {
      this.getChartData();
    },

    getChartData() {
      this.loading = true;
    },

    dateRangeChangeEvent() {
      this.getChartData();
      this.$emit('dateRangeChange', {
        from: this.from,
        to: this.to,
        fromDt: this.fromDt,
        toDt: this.toDt,
        dates: this.dates,
      });
    },
  },

  created() {
    this.getChartData();
  },

  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.getChartData();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
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
