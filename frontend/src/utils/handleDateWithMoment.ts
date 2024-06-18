import moment from "moment";

export const handleDateWithMoment = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const yearNow = new Date().getFullYear();
  const dayNow = new Date().getDay();

  if (yearNow > date.getFullYear()) {
    return moment(date, "YYYY-MM-DDTHH:mm").format("ll");
  }

  if (dayNow < date.getDay()) {
    return moment(date).format("MMM D");
  }

  return moment(date, "YYYY-MM-DDTHH:mm").startOf("minute").fromNow();
};
