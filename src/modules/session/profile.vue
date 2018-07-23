<template lang="pug">
div
    el-card.box-card.col-md-8.offset-2
        h1.title Cập nhật tài khoản
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
                            label Tên hiển thị
                            el-input(v-model="profile.fullName", placeholder='Tên hiển thị')
                        div.col-md-12.form-group
                            label Email
                            el-input(v-model='profile.email', placeholder='Email',type='email',autocomplete='email')
                        div.col-md-12.form-group
                            label Điện thoại
                            el-input(v-model='profile.phone', placeholder='Điện thoại')
                        div.col-md-12.form-group
                            label Ngày sinh
                            el-date-picker(v-model='profile.birthday',type='date')
                        div.col-md-12.form-group
                            label Giởi tính
                            el-select(v-model='profile.gender', clearable='', filterable='', placeholder='Giởi tính')
                                el-option(key='M', label='Nam', value='M')
                                el-option(key='F', label='Nữ', value='F')
                                el-option(key='U', label='Khác', value='U')
                        div.col-md-12.form-group
                            label Địa chỉ
                            el-input(v-model='profile.address', placeholder='Địa chỉ')
                        div.col-md-12.form-group
                            label Chức vụ
                            el-input(v-model='profile.position', placeholder='Chức vụ')
                        div.col-md-12.form-group
                            button.btn.btn-primary.btn-lg.pull-right(type='button', @click='handleEditProfile(profile)') Lưu
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      user: [],
    };
  },
  computed: {
    ...mapState('session', ['profile', 'fullLoading']),
  },

  methods: {
    ...mapActions('session', ['getProfile', 'updateProfile']),

    handleEditProfile(params) {
      params.status = true;
      if (!params.phone) {
        params.status = false;
        params.msg = 'Hãy điền số điện thoại';
      }
      if (!params.email) {
        params.status = false;
        params.msg = 'Hãy điền email';
      }
      if (!params.fullName) {
        params.status = false;
        params.msg = 'Hãy điền tên hiển thị';
      }
      this.updateProfile(params);
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
