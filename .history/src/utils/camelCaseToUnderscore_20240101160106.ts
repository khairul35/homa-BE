export const camelCaseToUnderscore = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map(item => camelCaseToUnderscore(item));
    } else {
      const underscoredData: any = {};
      Object.keys(data).forEach(key => {
        const underscoreKey = key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
        underscoredData[underscoreKey] = data[key];
      });
      return underscoredData;
    }
};
