import React from 'react'

const styles = {
    containerStyles: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 1
    },
    colorStyles: {
        width: 10,
        height: 10,
        marginRight: 2
    }
}
const CategoryColorItem = (props) => {
    const { index, category = {} } = props;
    const { name = '', color = '#000000' } = category;
    return (
        <div key={`${index}_categoryColor`} style={styles.containerStyles}>
            <div data-testid={props["colorTestId"] || ''} style={{...styles.colorStyles, backgroundColor: color }} />
            <p data-testid={props["nameTestId"] || ''}>{name}</p>
        </div>
    )
}

export default CategoryColorItem;
