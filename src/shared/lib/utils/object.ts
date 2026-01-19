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
