<template>
  <div class="panel__model">
    <!-- <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="页面设置"> Content of Tab Pane 1 </a-tab-pane>
    </a-tabs> -->
    <div class="inner">
      <a-form-model class="my-form" :model="form" :label-col="labelCol" labelAlign="left" size="small" :wrapper-col="wrapperCol">
        <a-form-model-item label="标题：">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="描述：">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>

        <a-form-model-item label="布局模式：">
          <a-select v-model="form.region" placeholder="">
            <a-select-option value="shanghai"> 网格布局 </a-select-option>
            <a-select-option value="beijing"> 自由布局 </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="背景色：">
          <!-- <a-date-picker v-model="form.date1" show-time type="date" placeholder="Pick a date" style="width: 100%" /> -->
        </a-form-model-item>

        <a-form-model-item label="访问密码：">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="开启登陆">
          <a-switch v-model="form.delivery" />
        </a-form-model-item>

        <a-form-model-item label="背景图片：">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="my-upload"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange">
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-button class="my-link-btn" type="link">图片库</a-button>
        </a-form-model-item>

        <a-form-model-item label="分享图标：">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="my-upload"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange">
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-button class="my-link-btn" type="link">图片库</a-button>
        </a-form-model-item>

        <a-form-model-item label="适配模式：">
          <a-select v-model="form.region" placeholder="">
            <a-select-option value="shanghai"> 自适应宽度 </a-select-option>
            <a-select-option value="beijing"> 固定宽度 </a-select-option>
            <a-select-option value="beijing"> 大屏模式 </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="背景重复：">
          <a-select v-model="form.region" placeholder="">
            <a-select-option value="shanghai"> 不重复 </a-select-option>
            <a-select-option value="beijing"> 横向重复 </a-select-option>
            <a-select-option value="beijing"> 纵向重复 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
        form: {
          name: "",
          region: "shanghai",
          date1: undefined,
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        }
      };
    },
    methods: {
      onSubmit() {
        console.log("submit!", this.form);
      }
    }
  };
</script>

<style lang="less" scoped>
  .panel__model {
    padding: 10px 10px;

    .inner {
      // border: 1px dashed rgb(237, 237, 237);
      padding: 10px 5px;
    }
  }
  .my-form {
    /deep/ .ant-form-item {
      margin-bottom: 0px;
    }
  }
  .my-upload {
    /deep/ .ant-upload {
      width: 60px;
      height: 60px;
    }
  }

  .my-link-btn {
    float: right;
    margin-bottom: -45px;
    position: relative;
    top: -71px;
    left: -32px;
  }
</style>
