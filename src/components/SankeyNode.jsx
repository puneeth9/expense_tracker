import React from "react";

const styles = {
    textStyles: {
        fontFamily: 'Sans-serif',
        fontWeight: 'bold'
    },
};

const SankeyNode = (props) => {
    const { height, width, payload, x, y } = props;
    const { name, color } = payload;
    return (
        <>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
            >
            </rect>
            <text
                x={x + width + 2}
                y={y + height / 2}
                textAnchor="left"
                alignmentBaseline="middle"
                fill="#000"
                style={styles.textStyles}
            >
                {name}
            </text>
        </>
    )
}

export default SankeyNode;