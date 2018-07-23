<template lang="pug">
div
    el-card.box-card.col-md-8.offset-2
        h1.title Cập nhật mật khẩu
    el-card.box-card.col-md-8.offset-2
        el-container
            el-main.col-md-4
                img.col-md-10.offset-1.img-respoonsive(src='http://fibo.vn/wp-content/uploads/2018/03/logofb.png')
                p.col-12.text-center.text-uppercase.font-weight-bold.displayName {{ profile.fullName }}
                p.col-12.text-center.userName ({{ profile.username }})
            el-main.col-md-8
                form(role='form')
                    div.row
                        div.col-md-12.form-group
                            label Mật khẩu hiện tại
                            el-input(v-model='profile.oldPass',placeholder='Mật khẩu hiện tại',type='password')
                        div.col-md-12.form-group
                            label Mật khẩu mới
                            el-input(v-model='profile.newPass', placeholder='Mật khẩu mới',type='password')
                        div.col-md-12.form-group
                            label Xác nhận mật khẩu
                            el-input(v-model='profile.confirmNewPass', placeholder='Xác nhận mật khẩu mới',type='password')
                        div.col-md-12.form-group
                            button.btn.btn-primary.btn-lg.pull-right(type='button', @click='handleEditPassword(profile)') Đổi mật khẩu
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('session', ['profile', 'fullLoading']),
  },

  methods: {
    ...mapActions('session', ['getProfile', 'updatePassword']),
    handleEditPassword(params) {
      params.status = true;
      if (params.newPass !== params.confirmNewPass) {
        params.status = false;
        params.msg = 'Mật khẩu nhập ko chính xác';
      }
      if (!params.newPass || params.newPass.length < 6) {
        params.status = false;
        params.msg = 'Mật khẩu phải nhiều hơn 6 ký tự';
      }
      if (!params.oldPass) {
        params.status = false;
        params.msg = 'Hãy nhập mật khẩu cũ';
      }
      this.updatePassword(params);
    },
  },

  created() {
    this.getProfile();
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0px;
}

.el-input__inner,
.el-date-editor,
.el-select,
.el-input {
  width: 100%;
}
.form-group > label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
p.displayName {
  font-size: 1.3rem;
  margin-top: 0.4em;
  margin-bottom: 1px;
}
</style>
