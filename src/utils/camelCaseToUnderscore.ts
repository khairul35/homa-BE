export const camelCaseToUnderscore = (data: any): any => {
  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.map(item => camelCaseToUnderscore(item));
  }

  if (typeof data === 'object') {
    const underscoredData: any = {};
    Object.keys(data).forEach(key => {
      const underscoreKey = key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
      underscoredData[underscoreKey] = camelCaseToUnderscore(data[key]);
    });
    return underscoredData;
  }

  return data;
};
