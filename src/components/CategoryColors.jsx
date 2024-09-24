import React from 'react'
import { useSelector } from 'react-redux'
import CategoryColorItem from './CategoryColorItem'

const CategoryColors = (props) => {
    const categoryDataMap = useSelector((state) => state.expense.categoryDataMap);
    const categories = Object.values(categoryDataMap);
    return (
        <div data-testid={props['testId'] || ''}>
            {
                categories.map((category, index) =>
                    <CategoryColorItem
                        category={category}
                        index={index}
                    />
                )
            }
        </div>
    )
}

export default CategoryColors
