<template>
  <div class="header">
    <div class="collapse-btn" @click="collapsedSider">
      <Icon v-if="collapse" type="md-menu" size="24" />
      <Icon v-else type="ios-menu-outline" />
    </div>
    <div class="logo">wty后台管理系统</div>
    <div class="header-right">
      <div class="header-user">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" alt="" />
        </div>
        <!-- 用户名下拉菜单 -->
        <Dropdown class="user-name" trigger="click" @on-click="handleCommand">
          <span class="dropdown-link">
            {{ username }}
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <DropdownMenu slot="list">
            <DropdownItem>项目仓库</DropdownItem>
            <DropdownItem name="user">个人中心</DropdownItem>
            <DropdownItem divided name="loginout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      username: "wangty",
      collapse: true,
    };
  },
  computed: {},
  methods: {
    collapsedSider() {
      this.collapse = !this.collapse;
    },
    handleCommand(name) {
      if (name === "loginout") {
        this.$router.push("/page");
      } else if (name === "user") {
        this.$router.push("/silder");
      }
    },
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user {
  display: flex;
  height: 70px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.dropdown-link {
  cursor: pointer;
}
.ivu-dropdown-item {
  text-align: center;
}
</style>
