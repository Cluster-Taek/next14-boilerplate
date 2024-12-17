export const getHypenNumber = (number: string) => {
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const getOnlyNumber = (number: string) => {
  return number.replace(/[^0-9]/g, '');
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
