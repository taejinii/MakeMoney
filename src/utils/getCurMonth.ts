export const getCurMonth = (date: Date) => {
  let month: any = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  return month;
};
export const getYear = (date: Date) => {
  let year: any = date.getFullYear();
  return year;
};

export const getPrevMonth = (month: number) => {
  let prevMonth = "";
  if (month <= 10) {
    prevMonth = `0${month - 1}`;
  } else if (month === 12) {
    prevMonth = "01";
  } else {
    prevMonth = `${month - 1}`;
  }
  return prevMonth;
};
