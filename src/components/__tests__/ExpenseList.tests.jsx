/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseList from '../ExpenseList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from '../../store/expenseSlice';
import { getCategoryId } from '../../utils/utils';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const createExpense = ({ source, target, value, index }) => {
    const addButton = screen.getByTestId("addButton");
    fireEvent.click(addButton);
    const sourceField = screen.getByTestId(`${index}_source`).querySelector('input');
    const targetField = screen.getByTestId(`${index}_target`).querySelector('input');
    const amountField = screen.getByTestId(`${index}_value`).querySelector('input');
    fireEvent.change(sourceField, { target: { value: source } });
    fireEvent.change(targetField, { target: { value: target } });
    fireEvent.change(amountField, { target: { value: value } });
    const saveButton = screen.getByTestId(`${index}_save`);
    fireEvent.click(saveButton);
}

const editExpense = ({ source, target, value, index }) => {
    const editButton = screen.getByTestId(`${index}_edit`);
    fireEvent.click(editButton);
    const sourceField = screen.getByTestId(`${index}_source`).querySelector('input');
    const targetField = screen.getByTestId(`${index}_target`).querySelector('input');
    const amountField = screen.getByTestId(`${index}_value`).querySelector('input');
    fireEvent.change(sourceField, { target: { value: source } });
    fireEvent.change(targetField, { target: { value: target } });
    fireEvent.change(amountField, { target: { value: value } });
    const saveButton = screen.getByTestId(`${index}_save`);
    fireEvent.click(saveButton);
}

const deleteExpense = ({ index }) => {
    const deleteButton = screen.getByTestId(`${index}_delete`);
    fireEvent.click(deleteButton);
}

const compareExpenses = ({ expensesInput, expenses }) => {
    expect(expenses.length).toBe(expensesInput.length);
    expenses.forEach((actualExpense, index) => {
        expensesInput[index].source = getCategoryId(expensesInput[index].source);
        expensesInput[index].target = getCategoryId(expensesInput[index].target);
        expect(actualExpense).toMatchObject(expensesInput[index]);
    })
};

const compareCategoryDataMap = ({ categoryDataMapInput, categoryDataMap }) => {
    expect(Object.keys(categoryDataMap).length).toBe(Object.keys(categoryDataMapInput).length)
    Object.keys(categoryDataMap).forEach((categoryKey) => {
        expect(categoryDataMap[categoryKey].name).toBe(categoryDataMapInput[categoryKey].name || '')
    });
}

describe('Expense List', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                expense: expenseSlice
            },
            preloadedState: {
                expense: {
                    expenses: [],
                    categoryDataMap: {},
                },
            }
        })
    })
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it('Create Expense', async () => {
        render(
            <Provider store={store}>
                <ExpenseList />
            </Provider>
        )
        const expensesInput = [
            { source: "Salary", target: "Bills", value: 5000 },
            { source: "Bills", target: "Electric Bill", value: 3000 },
            { source: "Bills", target: "Mobile bill", value: 2000 }
        ]
        const categoryDataMapInput = {
            salary: { name: 'Salary' },
            bills: { name: 'Bills' },
            electric_bill: { name: 'Electric Bill' },
            mobile_bill: { name: 'Mobile bill' }
        }

        expensesInput.forEach((expense, index) => {
            createExpense({ ...expense, index });
        })

        const { expenses, categoryDataMap } = store.getState().expense;
        compareExpenses({ expensesInput, expenses });
        compareCategoryDataMap({ categoryDataMapInput, categoryDataMap });
    })

    it('Edit Expense', async () => {
        render(
            <Provider store={store}>
                <ExpenseList />
            </Provider>
        )
        const expensesInput = [
            { source: "Salary", target: "Bills", value: 5000 },
            { source: "Bills", target: "Electric Bill", value: 3000 },
            { source: "Bills", target: "Mobile bill", value: 2000 }
        ]
        const categoryDataMapInput = {
            salary: { name: 'Salary' },
            bills: { name: 'Bills' },
            electric_bill: { name: 'Electric Bill' },
            mobile_bill: { name: 'Mobile bill' }
        }
        expensesInput.forEach((expense, index) => {
            createExpense({ ...expense, index });
        })
        editExpense({ ...expensesInput[0], index: 0, value: 1000 });
        editExpense({ ...expensesInput[1], index: 1, source: "Freelancing" });
        expensesInput[0].value = 1000;
        expensesInput[1].source = "Freelancing";
        categoryDataMapInput.freelancing = { name: "Freelancing" };

        const { expenses, categoryDataMap } = store.getState().expense;

        compareExpenses({ expensesInput, expenses });
        compareCategoryDataMap({ categoryDataMapInput, categoryDataMap });
    })

    it('Delete Expense', async () => {
        render(
            <Provider store={store}>
                <ExpenseList />
            </Provider>
        )
        const expensesInput = [
            { source: "Salary", target: "Bills", value: 5000 },
            { source: "Bills", target: "Electric Bill", value: 3000 },
            { source: "Bills", target: "Mobile bill", value: 2000 }
        ]
        const categoryDataMapInput = {
            salary: { name: 'Salary' },
            bills: { name: 'Bills' },
            electric_bill: { name: 'Electric Bill' },
            mobile_bill: { name: 'Mobile bill' }
        }
        
        expensesInput.forEach((expense, index) => {
            createExpense({ ...expense, index });
        })
        deleteExpense({ index: 0 });
        
        expensesInput.splice(0, 1);
        delete categoryDataMapInput.salary;

        const { expenses, categoryDataMap } = store.getState().expense;
        compareExpenses({ expensesInput, expenses });
        compareCategoryDataMap({ categoryDataMapInput, categoryDataMap });
    })
})