import { TableBody } from '@mui/material';
import React from 'react'
import ExpenseListItem from './ExpenseListItem';

const AddExpense = (props) => {
    const {
        addExpense = false,
        index = -1,
        handleAddExpense = () => {},
        handleSnackBarOpen = () => {}
    } = props;

    if (!addExpense) return <></>;
    return <TableBody data-testid="addNewExpense">
        <ExpenseListItem
            expenseDetails={{}}
            index={index}
            enableEdit={true}
            newExpense={true}
            handleAddExpense={handleAddExpense}
            handleSnackBarOpen={handleSnackBarOpen}
        />
    </TableBody>
}

export default AddExpense;
