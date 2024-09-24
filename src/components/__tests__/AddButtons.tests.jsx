import React from 'react';
import { render, screen } from '@testing-library/react';
import AddButton from '../AddButton';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const mockStore = configureStore([]);


describe('Add button display', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            expense: {
            },
        });
    })
    afterAll(() => {

    })
    it('Check for display name Add', async () => {
        render(
            <Provider store={store}>
                <AddButton addExpense={false}/>
            </Provider>
        )
        expect(screen.getByText(/Add/i)).toBeInTheDocument();
    })
    it('Check for display name Reset', async () => {
        render(
            <Provider store={store}>
                <AddButton addExpense={true}/>
            </Provider>
        )
        expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    })
})