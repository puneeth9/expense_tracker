import React from 'react'
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts'
import SankeyNode from './SankeyNode'
import SankeyTooltip from './SankeyToolTip'

const styles = {
    containerStyles: {
        width: '80%',
        height: 500
    },
    sankeyMarginStyles: {
        left: 20,
        right: 200,
        top: 100,
        bottom: 50,
    }
}

const SankeyWrapper = (props) => {
    const { data, linkColor } = props;
    return (
        <div style={styles.containerStyles}>
            <ResponsiveContainer width="100%" height="100%">
                <Sankey
                    data={data}
                    node={<SankeyNode />}
                    margin={styles.sankeyMarginStyles}
                    link={{ stroke: linkColor }}
                >
                    <Tooltip content={<SankeyTooltip active payload />} />
                </Sankey>
            </ResponsiveContainer>
        </div>
    )
}

export default SankeyWrapper
