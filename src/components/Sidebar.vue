<template>
  <div class="sidebar">
    <Menu theme="dark" width="250px" accordion>
      <template v-for="item in menuList">
        <Submenu
          v-if="item.children && item.children.length"
          :name="item.menuCode"
          :key="item.menuCode"
        >
          <template slot="title">
            <Icon size="18" :type="item.icon" />
            {{ item.menuName }}
          </template>
          <MenuItem
            v-for="sitem in item.children"
            :name="sitem.menuCode"
            :to="sitem.menuPath"
            :key="sitem.menuCode"
          >
            {{ sitem.menuName }}
          </MenuItem>
        </Submenu>
        <MenuItem
          v-else
          :name="item.menuCode"
          :key="item.menuCode"
          :to="item.menuPath"
        >
          <Icon size="18" :type="item.icon" style="margin-right: 8px" />
          {{ item.menuName }}
        </MenuItem>
      </template>
    </Menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapse: true,
      menuList: [
        {
          menuCode: "1",
          menuName: "用户管理",
          menuPath: "/mgt-user",
          icon: "md-person",
        },
        {
          menuCode: "2",
          menuName: "电影",
          icon: "md-videocam",
          children: [
            {
              menuCode: "2-1",
              menuName: "电影管理",
              menuPath: "/mgt-movie",
            },
            {
              menuCode: "2-2",
              menuName: "订单管理",
              menuPath: "/mgt-order",
            },
            {
              menuCode: "2-3",
              menuName: "评论管理",
              menuPath: "/mgt-comment",
            },
          ],
        },
        {
          menuCode: "3",
          menuName: "影院",
          icon: "md-closed-captioning",
          children: [
            {
              menuCode: "3-1",
              menuName: "放映厅管理",
              menuPath: "/mgt-hall",
            },
            {
              menuCode: "3-2",
              menuName: "场次安排",
              menuPath: "/mgt-session",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>