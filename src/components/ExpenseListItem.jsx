import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryId } from '../utils/utils';
import { addExpense, editExpense, deleteExpense } from '../store/expenseSlice';
import ActionsComponent from './Actions';
import TableElement from './TableElement';
import { SNACKBAR_ACTIONS, ERROR_MESSAGES } from '../utils/constants';

const styles = {
    tableRowStyles: {
        "&:hover": { backgroundColor: 'lightgray' }
    },
};

const ExpenseListItem = (props) => {
    const categoryDataMap = useSelector((state) => state.expense.categoryDataMap);
    const dispatch = useDispatch()
    const { expenseDetails = {}, index, enableEdit = false, newExpense = false, handleAddExpense = () => { }, handleSnackBarOpen = () => {} } = props;
    const { source = '', target = '', value = '' } = expenseDetails;
    const { name: sourceName = '' } = categoryDataMap[source] || {};
    const { name: targetName = '' } = categoryDataMap[target] || {};
    const [isEditable, setIsEditable] = useState(enableEdit);
    const [inflowType, setInFlowType] = useState(sourceName);
    const [outflowType, setOutFlowType] = useState(targetName);
    const [amountFlowing, setAmountFlowing] = useState(value);
    const [inflowTypeError, setInflowTypeError] = useState('');
    const [outflowTypeError, setOutflowTypeError] = useState('');
    const [amountFlowingError, setAmountFlowingError] = useState('');

    useEffect(() => {
        const { enableEdit = false } = props;
        const { source = '', target = '', value = '' } = props.expenseDetails;
        const { name: sourceName = '' } = categoryDataMap[source] || {};
        const { name: targetName = '' } = categoryDataMap[target] || {};
        setIsEditable(enableEdit);
        setInFlowType(sourceName)
        setOutFlowType(targetName)
        setAmountFlowing(value)
        setInflowTypeError('')
        setOutflowTypeError('')
        setAmountFlowingError('')
    }, [props, categoryDataMap])

    const handleEdit = () => {
        setIsEditable((prevState) => !prevState);
    }

    const handleSave = () => {
        let hasErrors = false;
        if (!inflowType.length) {
            setInflowTypeError(ERROR_MESSAGES.EMPTY)
            hasErrors = hasErrors || true;
        }
        if (!outflowType.length) {
            hasErrors = hasErrors || true;
            setOutflowTypeError(ERROR_MESSAGES.EMPTY)
        }
        if (!amountFlowing) {
            setAmountFlowingError(ERROR_MESSAGES.EMPTY)
            hasErrors = hasErrors || true;
        }
        if (getCategoryId(inflowType) === getCategoryId(outflowType)) {
            setInflowTypeError(ERROR_MESSAGES.IN_AND_OUT_FLOW_ARE_SAME);
            setOutflowTypeError(ERROR_MESSAGES.IN_AND_OUT_FLOW_ARE_SAME);
            hasErrors = hasErrors || true;
        }
        if (!hasErrors) {
            const payload = {
                source: inflowType,
                target: outflowType,
                value: Number(amountFlowing),
            }
            setIsEditable((prevState) => !prevState);
            if (newExpense) {
                dispatch(addExpense(payload))
                handleAddExpense();
                handleSnackBarOpen(SNACKBAR_ACTIONS.ADD_EXPENSE);
            }
            else {
                payload.index = index;
                dispatch(editExpense(payload))
                handleSnackBarOpen(SNACKBAR_ACTIONS.EDIT_EXPENSE)
            }
        }
    }

    const handleDelete = () => {
        dispatch(deleteExpense({ index }));
        handleSnackBarOpen(SNACKBAR_ACTIONS.DELETE_EXPENSE)
    }

    return (
        <TableRow sx={styles.tableRowStyles} data-testid={`${index}_expense`} key={index}>
            <TableCell align="center">
                <TableElement value={`${index + 1}.`}/>
            </TableCell>
            <TableCell align="center">
                <TableElement
                    isEditable={isEditable}
                    value={inflowType}
                    setValue={setInFlowType}
                    errorText={inflowTypeError}
                    testId={`${index}_source`}
                />
            </TableCell >
            <TableCell align="center">
                <TableElement
                    isEditable={isEditable}
                    value={outflowType}
                    setValue={setOutFlowType}
                    errorText={outflowTypeError}
                    testId={`${index}_target`}
                />
            </TableCell>
            <TableCell align="center">
                <TableElement
                    isEditable={isEditable}
                    value={amountFlowing}
                    setValue={setAmountFlowing}
                    type={'number'}
                    errorText={amountFlowingError}
                    testId={`${index}_value`}
                />
            </TableCell>
            <TableCell align="center">
                <ActionsComponent
                    isEditable={isEditable}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    index={index}
                />
            </TableCell>
        </TableRow>
    )
}

export default ExpenseListItem
