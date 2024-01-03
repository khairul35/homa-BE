// Function to transform keys from underscore_case to camelCase
  export const underscoreToCamelCase = (data: any) => {
    const transformedData: any[] = [];
    data.forEach((item: any) => {
      const transformedItem: any = {};
      Object.keys(item).forEach(key => {
        const transformedKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
        if (Array.isArray(item[key])) {
          transformedItem[transformedKey] = underscoreToCamelCase(item[key]);
        } else {
          transformedItem[transformedKey] = item[key];
        }
      });
      transformedData.push(transformedItem);
    });
    return transformedData;
  };
