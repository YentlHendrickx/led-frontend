// Returns the RGBA values of a color in an array
export const extractRGBA = (color: string) => {
    const rgba = color.replace(/[^\d,]/g, '').split(',');
    return rgba.map((value: string) => parseInt(value));
};

export const hexToRGBA = (hex: string) => {
    const rgba = hex.replace('#', '').match(/.{1,2}/g);
    return rgba?.map((value: string) => parseInt(value, 16));
};

export const mapBetween = (value: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

