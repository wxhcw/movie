<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";
export default {
  components: {
    vHeader,
    vSidebar,
  },
};
</script>
<style>
.about {
  height: 100%;
  width: 100%;
}
.content {
  display: block;
  position: absolute;
  /* width: calc(100% - 250px);
  height: calc(100% - 70px); */
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  background-color: #f0f0f0;
}
</style>