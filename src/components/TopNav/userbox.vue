<template lang="pug">
b-nav-dropdown.user-box(right="")
  template(slot="button-content")
    i.fa.fa-user
  b-dropdown-item(@click='editProfile')
    i.fa.fa-user
    |  Cập nhật tài khoản
  b-dropdown-item(@click='changePassword')
    i.fa.fa-wrench
    |  Đổi mật khẩu
  b-dropdown-item(@click='logout')
    i.fa.fa-sign-out
    |  Đăng xuất
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },

  methods: {
    ...mapActions('session', ['logout']),
    editProfile() {
      window.location.href = '#/profile';
    },
    changePassword() {
      window.location.href = '#/password';
    },
  }
};
</script>

<style>
a.nav-link{
  color: white;
}
  li{
    list-style-type:none
  }
  .dropdown-menu{
    transform: translate3d(0px, 50px, 0px) !important;
  }
</style>
