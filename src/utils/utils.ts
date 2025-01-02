export const getHypenNumber = (number: string) => {
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const getOnlyNumber = (number: string) => {
  return number.replace(/[^0-9]/g, '');
};

export const numberToKorean = (number: number) => {
  const unitWords = ['', '만', '억', '조', '경'];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (number % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getClearObject = (target: any) => {
  const filteredObject = Object.keys(target).reduce((acc, key) => {
    if (target[key] !== undefined && target[key] !== null) {
      acc[key] = target[key];
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any);
  return filteredObject;
};

export const isEmpty = (value: unknown) => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
};
