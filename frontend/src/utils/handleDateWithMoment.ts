import moment from "moment";

export const handleDateWithMoment = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const yearNow = new Date().getFullYear();

  if (yearNow > date.getFullYear()) {
    return moment(date, "YYYY-MM-DDTHH:mm").format("ll");
  }

  return moment(date, "YYYY-MM-DDTHH:mm").startOf("hour").fromNow();
};
