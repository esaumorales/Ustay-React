// utils/arrayHelpers.js

/**
 * Baraja un array aleatoriamente.
 * @param {Array} array - El array a barajar.
 * @returns {Array} Un nuevo array barajado.
 */
export const shuffleArray = (array) => {
    return array
        .map(item => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};
