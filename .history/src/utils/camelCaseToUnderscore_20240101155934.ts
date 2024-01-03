export const camelCaseToUnderscore = (data: any): any {
    const underscoredData: any = {};
    Object.keys(data).forEach(key => {
      const underscoreKey = key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
      underscoredData[underscoreKey] = data[key];
    });
    return underscoredData;
}