const pastelTonesHex = [
    '#E6E6FA',
    '#F4C2C2',
    '#C1E1C1',
    '#FFDAB9',
    '#87CEEB',
    '#C8A2C8',
    '#FFFF99',
    '#98FB98',
    '#AFEEEE',
    '#DB7093',
    '#FFEFD5',
    '#FADADD',
    '#D3D3D3',
    '#BCD4E6',
    '#DCD0FF'
];

export function qualquerCor(){
    return pastelTonesHex[ (Math.random() * pastelTonesHex.length)|0];
}