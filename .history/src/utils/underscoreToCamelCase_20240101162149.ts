export const underscoreToCamelCase = (data: any) => {
  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.map((item: any) => transformKeys(item));
  }

  return transformKeys(data);
};

const transformKeys = (item: any) => {
  const transformedItem: any = {};

  Object.keys(item).forEach(key => {
    const transformedKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
    if (Array.isArray(item[key])) {
      transformedItem[transformedKey] = underscoreToCamelCase(item[key]);
    } else if (typeof item[key] === 'object' && item[key] !== null) {
      transformedItem[transformedKey] = transformKeys(item[key]);
    } else {
      transformedItem[transformedKey] = item[key];
    }
  });

  return transformedItem;
};
