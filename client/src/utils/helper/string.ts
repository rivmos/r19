export const trimString = (text: string): string => {
    if (typeof text !== 'string') {
        throw new TypeError('Input must be a string');
    }
    return text.length > 6 ? text.slice(0, 6) + '...' : text;
};
