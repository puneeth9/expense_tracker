/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AddExpense from '../AddExpense';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

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
    afterAll(() => {

    })
    it('Check for display name Add', async () => {
        const { container } = render(
            <Provider store={store}>
                <AddExpense addExpense={false}/>
            </Provider>
        )
        expect(container.firstChild).toBeNull();
    })
    it('Check for display name Reset', async () => {
        render(
            <Provider store={store}>
                <AddExpense addExpense={true}/>
            </Provider>
        )
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    })
})