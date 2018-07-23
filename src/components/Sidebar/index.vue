<template lang="pug">
.sidebar(:class='{ opened: opened }')
  nav.sidebar-nav
    div(slot='header')
    ul.nav()
      router-link.nav-link(v-for="m in menus", :key="m.path" :to="m.path")
        i(:class='m.icon')
        |  {{m.name}}
    slot
    div(slot='footer')
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    opened: Boolean,
  },

  components: {},

  data() {
    return {
      menus: [
        { path: '/', name: 'Dashboard', icon: 'fa fa-dashboard' },
        { path: '/sims', name: 'Danh sách SIMs', icon: 'fa fa-list-ol' },
        { path: 'logs', name: 'Lịch sử', icon: 'fa fa-history' },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}

.sidebar > .sidebar-nav > .nav > .nav-link > i {
  color: #fff !important;
}
</style>
