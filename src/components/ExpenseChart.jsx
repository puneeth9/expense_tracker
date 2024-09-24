import React from 'react'
import { useSelector } from 'react-redux';
import CategoryColors from './CategoryColors';
import SankeyWrapper from './SankeyWrapper';

const styles = {
    containerStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    }
};

const getDataInSankeyFormat = ({ expenses, categoryDataMap }) => {
    const nodeIdToIndexMap = {};
    // console.log()
    const nodes = Object.keys(categoryDataMap).map((key, index) => {
        const { name, color } = categoryDataMap[key];
        nodeIdToIndexMap[key] = index;
        return { name, color };
    });
    const links = expenses.map((expense) => {
        return {
            source: nodeIdToIndexMap[expense.source],
            target: nodeIdToIndexMap[expense.target],
            value: expense.value,
        }
    });
    return { nodes, links };
}

const ExpenseChart = () => {
    const expenses = useSelector((state) => state.expense.expenses);
    const categoryDataMap = useSelector((state) => state.expense.categoryDataMap);
    const data = getDataInSankeyFormat({ expenses, categoryDataMap });
    return (
        <div style={styles.containerStyles}>
            <SankeyWrapper data={data} linkColor="#77c878"/>
            <CategoryColors />
        </div>
    )
}

export default ExpenseChart
