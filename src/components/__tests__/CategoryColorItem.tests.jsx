import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryColorItem from '../CategoryColorItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { hexToRgb } from '../../utils/utils'

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // simple mock that returns the translation key
    }),
}));

const mockStore = configureStore([]);


describe('Category Color Item display', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            expense: {
            },
        });
    })
    afterAll(() => {

    })
    it('Check for category name and color', async () => {
        const nameTestId = 'categoryName';
        const colorTestId = 'categoryColor';
        const categoryObj = { name: 'Category Name', color: '#ff0000'};
        render(
            <Provider store={store}>
                <CategoryColorItem
                    category={categoryObj}
                    colorTestId = {colorTestId}
                    nameTestId={nameTestId}
                />
            </Provider>
        )
        expect(screen.getByTestId(nameTestId).textContent).toEqual(categoryObj.name);
        const element = screen.getByTestId(colorTestId);
        const styles = getComputedStyle(element);
        expect(styles.backgroundColor).toBe(hexToRgb(categoryObj.color));
    })
    it('Check for null case', async () => {
        const nameTestId = 'categoryName';
        const colorTestId = 'categoryColor';
        const categoryObj = {};
        render(
            <Provider store={store}>
                <CategoryColorItem
                    category={categoryObj}
                    colorTestId={colorTestId}
                    nameTestId={nameTestId}
                />
            </Provider>
        )
        expect(screen.getByTestId(nameTestId).textContent).toEqual('');
        const element = screen.getByTestId(colorTestId);
        const styles = getComputedStyle(element);
        expect(styles.backgroundColor).toBe(hexToRgb('#000000'));
    })
})