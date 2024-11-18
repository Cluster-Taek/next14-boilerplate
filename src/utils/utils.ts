export const getHypenNumber = (number: string) => {
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const getOnlyNumber = (number: string) => {
  return number.replace(/[^0-9]/g, "");
};