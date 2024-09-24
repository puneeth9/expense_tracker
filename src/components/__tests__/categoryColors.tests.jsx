/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryColors from '../CategoryColors';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const mockStore = configureStore([]);


describe('Category Color List display', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            expense: {
                categoryDataMap: {
                    'categoryId1': { name: 'Category name 1', color: '#ff0000' },
                    'categoryId2': { name: 'Category name 2', color: '#00ff00' },
                }
            },
        });
    })
    afterAll(() => {

    })
    it('Check for category name and color', async () => {
        const testId = 'categoryList';
        render(
            <Provider store={store}>
                <CategoryColors
                    testId={testId}
                />
            </Provider>
        )
        const element = screen.getByTestId(testId)
        const childrenCount = element.children.length;
        const categoryList = Object.values(store.getState().expense.categoryDataMap);
        expect(childrenCount).toEqual(categoryList.length);
        expect(element.children[0].textContent).toEqual(categoryList[0].name)
        expect(element.children[1].textContent).toEqual(categoryList[1].name)

    })
})