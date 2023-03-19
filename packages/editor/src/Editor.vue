<template>
  <section>
    <editor-layout>
      <template slot="header">
        <editor-header @show-json="showJson" @show-pre-render="showPreRender"></editor-header>
      </template>
      <template slot="sider">
        <editor-sider-bar></editor-sider-bar>
      </template>
      <template slot="canvas">
        <editor-canvas></editor-canvas>
        <editor-sider-drawer></editor-sider-drawer>
      </template>
    </editor-layout>
    <drawer-json width="45%" v-model="previewJsonVisible" :json-str="JSON.stringify(workJson)" />
    <pre-render v-model="preRenderVisible"></pre-render>
  </section>
</template>

<script>
  import EditorLayout from "./components/EditorLayout/index.vue";
  import EditorHeader from "./components/EditorHeader/index.vue";
  import EditorSiderBar from "./components/EditorSider/index.vue";
  import EditorSiderDrawer from "./components/EditorSider/drawer.vue";
  import EditorCanvas from "./components/EditorCanvas/index.vue";
  import DrawerJson from "./components/DrawerJson/index.vue";
  import PreRender from "./components/PreRender/index.vue";

  import { WorkEditor } from "@work/work";
  import { string, number, oneOfType, array } from "vue-types";

  export default {
    name: "work-editor",
    components: { EditorLayout, EditorHeader, EditorSiderBar, EditorSiderDrawer, DrawerJson, EditorCanvas, PreRender },
    props: {
      workId: oneOfType([string(), number()]),
      componentGroupList: array().def([]),
      mode: string().def("dev")
    },
    provide() {
      this.work = new WorkEditor({
        mode: this.mode,
        componentGroupList: this.componentGroupList
      });
      return { work: this.work };
    },
    computed: {
      workJson() {
        return this.work.state;
      }
    },
    data() {
      return {
        previewJsonVisible: false,
        preRenderVisible: false
      };
    },
    created() {
      if (this.mode === "dev") {
        this.work.initWork();
      } else {
        this.work.getWorkData(this.workId);
      }
    },
    methods: {
      showPreRender() {
        this.preRenderVisible = true;
      },
      showJson() {
        this.previewJsonVisible = true;
      }
    }
  };
</script>
