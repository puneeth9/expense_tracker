import React from "react";
const styles = {
    containerStyles: {
        border: "2px solid black",
        backgroundColor: 'white'
    },
    rowStyles: {
        marginLeft: 10,
        marginRight: 10,
    }
}
const SankeyTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const { name = '', value = '' } = data;
        return (
            <div style={styles.containerStyles}>
                <p style={styles.rowStyles}>{`${name}`}</p>
                <p style={styles.rowStyles}>{`Amount: ${value}`}</p>
            </div>
        );
    }
    return null;
};

export default SankeyTooltip;