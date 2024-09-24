import React from 'react';
import { render, screen } from '@testing-library/react';
import Actions from '../Actions';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const mockStore = configureStore([]);


describe('Actions display', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            expense: {
                expenses: [
                    { source: 'bills', target: 'water bill', value: 1000}
                ]
            },
        });
    })
    afterAll(() => {

    })
    it('Check for display name with edit enable', async () => {
        render(
            <Provider store={store}>
                <Actions isEditable={true}/>
            </Provider>
        )
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    })
    it('Check for display name with edit disabled', async () => {
        render(
            <Provider store={store}>
                <Actions isEditable={false}/>
            </Provider>
        )
        expect(screen.getByText(/Edit/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    })
})