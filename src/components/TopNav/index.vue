<template lang="pug">
header.app-header.navbar-fixed-top
  .container-fluid
    .row
      section.col-md-12.navbar-top-wrapper(:class='{ "sidebar-opened": sidebarOpened, fixed: fixed }')
        .navbar-left.col-lg-3.col-md-3.col-sm-3.col-xs-10
          button.btn-none(@click='$emit("onToggleClick")')
            i.fa.fa-bars
          b-link.navbar-brand(to='')
        navbar-center(:menus="menus")
        user-box
</template>

<script>
import NavbarCenter from './menu';
import UserBox from './userbox';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: {
    sidebarOpened: Boolean,
    fixed: Boolean
  },

  components: {
    ...mapGetters('session', ['me']),
    NavbarCenter,
    UserBox
  },

  data() {
    return {
      activeIndex: true,
      menus: []
    };
  },

  methods: {
    mobileSidebarToggle() {},
    sidebarToggle() {},
    asideToggle() {}
  },

  created() {
    this.menus = [
      { path: '/', name: 'Dashboard' },
      { path: 'sims', name: 'SIMs' },
      { path: 'logs', name: 'Lịch sử' },
    ];
  }
};
</script>

<style>

</style>
