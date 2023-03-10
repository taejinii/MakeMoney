export const getCurMonth = (date: Date) => {
  let month: number | string = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  return month;
};
export const getYear = (date: Date) => {
  let year = date.getFullYear();
  return year;
};

export const getPrevMonth = (month: number) => {
  let prevMonth = "";
  if (month <= 10) {
    prevMonth = `0${month - 1}`;
  } else if (month === 1) {
    return;
  } else {
    prevMonth = `${month - 1}`;
  }
  return prevMonth;
};
