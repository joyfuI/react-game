export const deepClone = (obj) => {
  if (obj === null) return null;
  const clone = { ...obj };
  Object.keys(clone).forEach((key) => {
    clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
  });
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

export const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
};
