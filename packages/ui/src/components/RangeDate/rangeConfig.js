const moment = window.moment;

export default {
  date: {
    defaultValue: [moment().add(-7, "days"), moment().add(0, "days")],
    placeholder: ["起始日期", "结束日期"],
    mode: ["date", "date"],
    format: "YYYY-MM-DD",
    ranges: {
      近7天: [moment().add(-7, "days"), moment().add(0, "days")],
      近14天: [moment().add(-14, "days"), moment().add(0, "days")],
      近30天: [moment().add(-30, "days"), moment().add(0, "days")]
    }
  },
  month: {
    defaultValue: [moment().add(-3, "months"), moment().add(0, "months")],
    placeholder: ["起始月", "结束月"],
    mode: ["month", "month"],
    format: "YYYY-MM",
    ranges: {
      近三个月: [moment().add(-3, "months"), moment().add(0, "months")],
      近半年: [moment().add(-6, "months"), moment().add(0, "months")],
      近一年: [moment().add(-12, "months"), moment().add(0, "months")]
    }
  },
  year: {
    defaultValue: [moment().add(-3, "years"), moment().add(0, "years")],
    placeholder: ["起始年", "结束年"],
    mode: ["year", "year"],
    format: "YYYY",
    ranges: {
      近一年: [moment().add(-1, "years"), moment().add(0, "years")],
      近三年: [moment().add(-3, "years"), moment().add(0, "years")],
      近六年: [moment().add(-6, "years"), moment().add(0, "years")]
    }
  }
};
