<template>
  <div style="height: 100%">
    <a-menu v-bind="$attrs" style="height: 100%" :default-selected-keys="['1']" :style="{ lineHeight: '64px' }" theme="dark" @click="menuToRouter" v-model="selectedKeys">
      <a-menu-item key="13">
        <a-icon type="pie-chart" />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="47">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="user" /><span>User</span></span>
        <a-menu-item key="3"> Tom </a-menu-item>
        <a-menu-item key="4"> Bill </a-menu-item>
        <a-menu-item key="5"> Alex </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="team" /><span>Team</span></span>
        <a-menu-item key="6"> Team 1 </a-menu-item>
        <a-menu-item key="8"> Team 2 </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <a-icon type="file" />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  import { string, array, bool } from "vue-types";
  export default {
    name: "Menu",
    inheritAttrs: false,
    components: {},
    props: {
      menuList: array().def([]),
      logo: string().def(""),
      title: string().def(""),
      collapsed: bool().def(false)
    },
    inject: ["app"],
    computed: {
      menu() {
        return this.menuList;
      }
    },
    data() {
      return {
        selectedKeys: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.getMenuData();
      },
      menuToRouter(e) {
        this.$router.push({ path: e.key, query: { a: Math.random() } });
      },

      // 获取数据
      getMenuData() {
        setTimeout(() => {
          this.watchRoute();
        }, 500);
      },

      // 监听路由变化 检查路由权限
      watchRoute() {
        this.$watch(
          "$route",
          (newRoute) => {
            this.checkAuth(newRoute.name);
            this.setMenuSelectKeys(newRoute);
          },
          { immediate: true }
        );
      },

      // 校验路由权限
      checkAuth(workId) {
        // 通过route.name(workId) 检查是否存在本地menu列表中,存在代表有权限,不存在代表无权限
        // ...具体实现
        let isAuth = true;
        if (isAuth) {
          // 有权限
          window.__currWorkRoute__.resolve();
        } else {
          // 无权限
          window.__currWorkRoute__.reject();
        }
      },
      setMenuSelectKeys(route = {}) {
        this.selectedKeys = [route.name];
      }
    }
  };
</script>
