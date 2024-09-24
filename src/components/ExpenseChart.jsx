import React from 'react'
import { useSelector } from 'react-redux';
import CategoryColors from './CategoryColors';
import SankeyWrapper from './SankeyWrapper';
import { useTranslation } from 'react-i18next';

const styles = {
    containerStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    }
};

const getDataInSankeyFormat = ({ expenses, categoryDataMap }) => {
    const nodeIdToIndexMap = {};
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
    const { t } = useTranslation();
    const expenses = useSelector((state) => state.expense.expenses);
    const categoryDataMap = useSelector((state) => state.expense.categoryDataMap);
    const data = getDataInSankeyFormat({ expenses, categoryDataMap });
    const { nodes, links } = data;
    if(!nodes.length || !links.length) {
        return (<div style={{...styles.containerStyles, width: '100%', height: 300, alignItems: 'flex-end' }}>
            <h1>{t('noExpensesFound')}</h1>
        </div>)
    }
    return (
        <div style={styles.containerStyles}>
            <SankeyWrapper data={data} linkColor="#77c878"/>
            <CategoryColors />
        </div>
    )
}

export default ExpenseChart
