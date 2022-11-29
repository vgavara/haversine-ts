/**
 * Rounds a floating number to a given number of decimals
 *
 * @param {number} number Nomber to be rounded
 * @param {number} decimalPlaces Number of decimals
 * @returns {number} Number with decimalPlaces decimals
 */
export const round = (number: number, decimalPlaces: number) => {
  const powOfTen = 10 ** decimalPlaces;
  return Math.round(number * powOfTen) / powOfTen;
};
