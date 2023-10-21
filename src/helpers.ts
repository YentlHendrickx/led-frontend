// Returns the RGBA values of a color in an array
export const extractRGBA = (color: string) => {
    const rgba = color.replace(/[^\d,]/g, '').split(',');
    return rgba.map((value: string) => parseInt(value));
};