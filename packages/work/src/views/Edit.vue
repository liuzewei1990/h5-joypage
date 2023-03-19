<template>
  <div id="app">
    <work height="100vh"></work>
  </div>
</template>
<script>
  import * as work from "../index";
  import WorkEditor from "../class/work.editor.class.js";
  const workeditor = new WorkEditor();
  const state = {
    activeViewId: "view-d291-a380",
    views: [
      {
        viewId: "view-d291-a380",
        title: "new page",
        elements: [
          {
            i: "ele-1efa-de45",
            x: 20,
            y: 0,
            w: 30,
            h: 200,
            static: false,
            isResizable: true,
            fixedHeight: false,
            elId: "ele-1efa-de45",
            elStyle: {},
            coName: "WorkRectComponent",
            coType: "",
            coProps: {},
            moved: false,
            pos: {
              left: 0,
              top: 0,
              width: 800,
              height: 200
            },
            lsca: null,
            wsca: 1
          },
          {
            i: "ele-1efa-de46",
            x: 60,
            y: 0,
            w: 30,
            h: 200,
            static: false,
            isResizable: false,
            fixedHeight: false,
            elId: "ele-1efa-de46",
            elStyle: {},
            coName: "WorkImage",
            coType: "",
            coProps: {},
            moved: false,
            pos: {
              left: 0,
              top: 0,
              width: 800,
              height: 200
            },
            lsca: null,
            wsca: 1
          }
        ]
      }
    ]
  };
  export default {
    components: { Work: work.createWork() },
    provide: {
      work: workeditor
    },
    data() {
      return {};
    },
    mounted() {
      workeditor.initWork(state);
      workeditor.loading = false;
    }
  };
</script>
