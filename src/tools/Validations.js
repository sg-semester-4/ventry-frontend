const isSameKeys = (o1, o2) => {
  // Get the keys of each object
  const o1keys = Object.keys(o1).sort();
  const o2keys = Object.keys(o2).sort();
  // Make sure they match
  // If you don't want a string check, you could do
  // if (o1keys.length !== o2keys.length || !o1keys.every((key, index) => o2keys[index] === key)) {
  if (o1keys.join() !== o2keys.join()) {
    // This level doesn't have the same keys
    return false;
  }
  // Check any objects
  return o1keys.every((key) => {
    const v1 = o1[key];
    const v2 = o2[key];
    if (v1 === null) {
      return v2 === null;
    }
    const t1 = typeof v1;
    const t2 = typeof v2;
    if (t1 !== t2) {
      return false;
    }
    return t1 === "object" ? isSameKeys(v1, v2) : true;
  });
};

const isContains = (a, b) => {
  for (const i in a) {
    if (!b.hasOwnProperty(i) || a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const isEquals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => isEquals(a[k], b[k]));
};

const isStringIn = (x, obj) => {
  for (const k in obj) {
    if (obj[k].includes(x)) return true;
  }
  return false;
};

export { isSameKeys, isContains, isEquals, isStringIn };
