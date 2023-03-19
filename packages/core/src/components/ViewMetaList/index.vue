<template>
  <div class="view-meta-list">
    <a-table :data-source="workViews" :columns="columns" size="middle" :pagination="false" :showHeader="true" rowKey="viewId">
      <template slot="name" slot-scope="text, record, col">
        <div>
          <a-input style="margin: -5px 0" :value="text" @change="(e) => handleChange(e.target.value, record, col)" />
        </div>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a-popconfirm v-if="workViews.length > 1" title="确定要删除?" @confirm="() => onDelete(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <a href="javascript:;" v-if="workViews.length === index + 1" @click="handleAdd" style="margin-left: 10px">添加</a>
      </template>

      <template slot="check" slot-scope="text, record">
        <div @click="clickTableRow(record)" style="cursor: pointer">
          <a-icon type="check-circle" :style="{ color: activeViewId === record.viewId ? 'red' : '' }" />
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
  export default {
    inject: ["work"],
    computed: {
      activeViewId() {
        return this.work.state.activeViewId;
      },
      workViews() {
        return this.work.state.views;
      }
    },
    data() {
      return {
        columns: [
          {
            title: "Tab名称",
            dataIndex: "title",
            scopedSlots: { customRender: "name" }
          },
          {
            title: "操作",
            width: "100px",
            scopedSlots: { customRender: "action" }
          },
          {
            title: "默认",
            aligin: "center",
            width: "50px",
            scopedSlots: { customRender: "check" }
          }
        ]
      };
    },
    methods: {
      onDelete(record) {
        this.work.delWorkView(record.viewId);
      },
      handleAdd() {
        this.work.addWorkView();
      },
      clickTableRow(record) {
        this.work.setWorkView(record.viewId);
      },
      handleChange(value, record) {
        this.work.setWorkViewTitle(record.viewId, value);
      }
    }
  };
</script>
<style lang="less" scoped>
  .view-meta-list {
    position: absolute;
    height: 100%;
    width: 100%;

    // border: 1px solid red;
  }
</style>
