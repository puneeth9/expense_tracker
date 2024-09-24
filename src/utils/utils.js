const getCategoryId = (name) => {
    //Create unique identifier basd on displayName
    return name.trim().toLowerCase().split(' ').join('_');
}

const getRandomColor = () => {
    let color;
    const generatedColors = new Set();
    do {
        color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    } while (generatedColors.has(color));

    // Add the generated color to the set for future uniqueness checks
    generatedColors.add(color);
    return color;
}

const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

export { getCategoryId, getRandomColor, hexToRgb };