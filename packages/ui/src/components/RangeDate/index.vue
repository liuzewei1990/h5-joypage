<template>
  <section class="common-date-query">
    <div flex>
      <div class="form-item" v-if="dateTypeJson.length > 1">
        <!-- <label class="form-label">查询类型：</label> -->
        <a-select :value="type" @change="dateTypeChange" :size="size" style="width: 50px">
          <a-select-option v-for="item in dateTypeJson" :key="item.id" :value="item.id"> {{ item.name }} </a-select-option>
        </a-select>
      </div>
      <div class="form-item">
        <!-- <label class="energy-form-label">时间</label> -->
        <a-range-picker
          ref="picker"
          style="width: 180px"
          dropdown-class-name="common-date-query-picker"
          separator="-"
          :size="size"
          :open="open"
          :placeholder="placeholder"
          :mode="mode"
          :format="format"
          :value="values"
          :allowClear="false"
          @click.native="openPicker"
          @calendarChange="calendarChange"
          @panelChange="handlePanelChange"
          @openChange="handleOpenChange"
          @change="handleChange"
          v-bind="$attrs"
          v-on="$listeners">
          <template slot="renderExtraFooter">
            <div style="padding: 5px" flex="main:center cross:center">
              <div flex-box="1">
                <a-button size="small" v-for="(item, key) in ranges" :key="key" type="link" @click="handleClickRange(item)" style="margin-right: 10px">{{ key }}</a-button>
              </div>
              <!-- <a-button size="small" type="" @click="cancel" style="margin-right: 10px">取消</a-button> -->
              <!-- <a-button size="small" type="primary" @click="ok">确定</a-button> -->
            </div>
          </template>
        </a-range-picker>
      </div>
    </div>
  </section>
</template>
<script>
  import { oneOfType, string, array, object, bool } from "vue-types";
  const moment = window.moment;
  import rangeConfig from "./rangeConfig.js";

  export default {
    props: {
      size: string().def("small"),
      isFormat: bool().def(true),
      dateType: string().def("date").isRequired,
      dateValue: array().def([moment(), moment()]).isRequired,
      dateTypeJson: array().def([
        { name: "日", id: "date" },
        { name: "月", id: "month" },
        { name: "年", id: "year" }
      ])
    },
    data() {
      return {
        dateRangePickerConfig: rangeConfig,
        open: false,
        type: null,
        values: []
      };
    },
    watch: {
      dateType: {
        immediate: true,
        handler(val) {
          this.type = val;
        }
      },
      dateValue: {
        immediate: true,
        handler(val) {
          this.values = this.formatMoment(val);
        }
      }
    },
    computed: {
      placeholder() {
        return this.dateRangePickerConfig[this.type].placeholder;
      },
      mode() {
        return this.dateRangePickerConfig[this.type].mode;
      },
      format() {
        return this.dateRangePickerConfig[this.type].format;
      },
      ranges() {
        return this.dateRangePickerConfig[this.type].ranges;
      }
    },
    mounted() {
      window.picker = this.$refs["picker"];
    },
    methods: {
      openPicker() {
        this.open = true;
      },
      calendarChange(val) {},
      handleOpenChange(status) {
        if (status) {
          this.open = true;
        } else {
          if (this.type === "date") {
            this.open = false;
          } else {
            this.cancel();
          }
        }
      },
      // 日期类型change时
      dateTypeChange(val) {
        this.values = this.dateRangePickerConfig[val].defaultValue;
        this.openPicker();
        this.type = val;
      },
      // change时
      handleChange(value) {
        if (this.values[1] && this.values[1]._d != value[1]._d) {
          setTimeout(() => {
            this.ok();
          }, 0);
        }

        this.values = value;
        // this.values = [value[0].format(this.format), value[1].format(this.format)];
      },
      // 日期面板变化时
      handlePanelChange(value, mode, cc) {
        // console.log(value[0].format("YYYY-MM-DD hh:ss:mm"), value[1].format("YYYY-MM-DD hh:ss:mm"));
        // console.log("之前的：", this.values[1]._d.getTime());
        // console.log("现在的：", value[1]._d.getTime());
        // console.log("结果是：", this.values[1]._d.getTime() === value[1]._d.getTime());
        /**
         * 当为年时：此处有个bug
         */
        this.handleChange(value);
      },
      // 点击快捷选择
      handleClickRange(value) {
        this.handleChange(value);
      },
      ok() {
        this.$emit("update:dateType", this.type);
        if (this.isFormat) {
          this.$emit("update:dateValue", this.formatValues(this.values));
        } else {
          this.$emit("update:dateValue", this.values);
        }
        this.dateRangePickerConfig[this.type].defaultValue = this.values;
        this.open = false;
      },
      cancel() {
        this.type = this.dateType;
        this.values = this.formatMoment(this.dateValue);
        this.open = false;
      },
      formatMoment(value) {
        return [moment(value[0]), moment(value[1])];
      },
      formatValues(values) {
        return [values[0].format(this.format), values[1].format(this.format)];
      }
    }
  };
</script>

<style lang="less" scoped>
  .common-date-query {
    display: inline-block;
    background: #fff;
    // padding: 3px 5px;
    .form-item {
      margin-right: 10px;
    }
    .form-item:last-child {
      margin-right: 0px;
    }

    .form-label {
      font-size: 14px;
      margin: 0 5px;
    }
  }
</style>

<style lang="less">
  .common-date-query-picker {
    .ant-calendar-footer-extra {
      float: none !important;
    }
  }
</style>
