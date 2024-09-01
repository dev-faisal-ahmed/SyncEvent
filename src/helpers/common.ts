export const isValidDate = (date: string) => {
  const dateObject = new Date(date);
  return !isNaN(dateObject.getTime());
};

export const isPropertiesExist = (obj: Record<string, any>, keys: string[]) => {
  for (const key of keys) {
    if (obj[key]) return true;
  }
  return false;
};
