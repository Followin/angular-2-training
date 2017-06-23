Number.isNumber = (val: any) => {
  return !isNaN(+val) && isFinite(+val);
};