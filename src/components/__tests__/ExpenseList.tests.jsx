/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseList from '../ExpenseList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from '../../store/expenseSlice';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));



// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

const createExpense = ({ source, target, value, index }) => {
    const addButton = screen.getByTestId("addButton");
    // expect(screen.getByTestId("addButton")).toBeInTheDocument();
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
            { source: "Salary", target: "Bills", value: 5000, index: 0 },
            { source: "Bills", target: "Electric Bill", value: 3000, index: 1},
            { source: "Bills", target: "Mobile bill", value: 2000, index: 2 }
        ]
        expensesInput.forEach((expense) => {
            createExpense(expense);
        })
        const  { expenses } = store.getState().expense
        expect(expenses.length).toBe(3);

    })
})