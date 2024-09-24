import { createSlice } from "@reduxjs/toolkit";
import { getCategoryId, getRandomColor } from "../utils/utils";

const initialState = {
    expenses: [
        { source: "salary", target: "bills", value: 10000 },
        { source: "salary", target: "rent", value: 2000 },
        { source: "bills", target: "power_bill", value: 5000 },
        { source: "bills", target: "water_bill", value: 3000 },
    ],
    categoryDataMap: {
        'salary': { name: 'Salary', color: '#FF5733' },
        'rent': { name: 'Rent', color: '#33FF57' },
        'bills': { name: "Bills", color: '#3357FF' },
        'power_bill': { name: 'Power Bill', color: '#FF33A1' },
        'water_bill': { name: 'Water Bill', color: '#FFC300' }
    }
};

const addNewCategory = ({ categoryDataMap, categoryId, displayName }) => {
    // Add the category if it is not existing the categoryDataMap
    if (!categoryDataMap[categoryId]) {
        categoryDataMap[categoryId] = { name: displayName, color: getRandomColor() };
    }
};

const deleteCategory = ({ expenses, categoryDataMap, categoryId }) => {
    // Delete the category , if there are no existing links from or to the category
    const linkWithCategory = expenses.findIndex(
        (expense) => expense.source === categoryId || expense.target === categoryId
    );

    if (linkWithCategory === -1) {
        delete categoryDataMap[categoryId];
    }
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const { expenses, categoryDataMap } = state;
            const { source = '', target = '', value = 0 } = action.payload;
            const sourceId = getCategoryId(source);
            const targetId = getCategoryId(target);
            addNewCategory({ categoryDataMap, categoryId: sourceId, displayName: source });
            addNewCategory({ categoryDataMap, categoryId: targetId, displayName: target });
            expenses.push({
                source: sourceId,
                target: targetId,
                value,
            });
        },
        
        editExpense: (state, action) => {
            const { expenses, categoryDataMap } = state;
            const { source = '', target = '', value = 0, index = 0 } = action.payload;
            const sourceId = getCategoryId(source);
            const targetId = getCategoryId(target);
            addNewCategory({ categoryDataMap, categoryId: sourceId, displayName: source });
            addNewCategory({ categoryDataMap, categoryId: targetId, displayName: target });
            const { source: prevSourceId, target: prevTargetId } = expenses[index];
            expenses[index] = {
                source: sourceId,
                target: targetId,
                value,
            };
            // If there are no other links for the previous categories , delete them
            deleteCategory({ expenses, categoryDataMap, categoryId: prevSourceId });
            deleteCategory({ expenses, categoryDataMap, categoryId: prevTargetId });
        },
        
        deleteExpense: (state, action) => {
            const { expenses, categoryDataMap } = state;
            const { index } = action.payload;
            const { source, target } = expenses[index];
            expenses.splice(index, 1);
            deleteCategory({ expenses, categoryDataMap, categoryId: source });
            deleteCategory({ expenses, categoryDataMap, categoryId: target });
        }
    }
});

export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
