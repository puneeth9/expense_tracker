/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AddExpense from '../AddExpense';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { Table } from '@mui/material';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const mockStore = configureStore([]);


describe('Add Expense display', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            expense: {
                expenses: [],
                categoryDataMap: {}
            },
        });
    })
    it('Check for New expense being added', async () => {
        render(
            <Provider store={store}>
                <Table>
                    <AddExpense addExpense={true} />
                </Table>
            </Provider>
        )
        expect(screen.getByTestId('addNewExpense')).toBeInTheDocument();
    })
})