import { Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import { useTranslation } from 'react-i18next';
import AddButton from './AddButton';
import AddExpense from './AddExpense';

const styles = {
    containerStyles: {
        margin: 20
    },
    tableContainerStyles: {
        marginTop: 5,
        right: 100,
        border: '1px solid gray',
        backgroundColor: 'white'
    },
    tableHeaderStyles: {
        marginTop: 5
    },
    tableHeaderElementStyles: {
        fontSize: 18,
        fontWeight: 'bold'
    },
};

const ExpenseList = () => {
    const { t } = useTranslation();
    const expenses = useSelector((state) => state.expense.expenses);
    const [addExpense, setAddExpense] = useState(false);
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
    const [snackBarMesssage, setSnackBarMessage] = useState('');

    const handleSnackBarClose = () => {
        setIsSnackBarVisible(false);
    }

    const handleSnackBarOpen = (action) => {
        setSnackBarMessage(action);
        setIsSnackBarVisible(true);
    }

    const handleAddExpense = () => {
        setAddExpense((prevState) => !prevState);
    }
    return (
        <div style={styles.containerStyles}>
            <AddButton addExpense={addExpense} handleAddExpense={handleAddExpense} />
            <TableContainer sx={styles.tableContainerStyles}>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow sx={styles.tableHeaderStyles}>
                            <TableCell align='center' sx={styles.tableHeaderElementStyles}> {t('serialNo')}</TableCell>
                            <TableCell align="center" sx={styles.tableHeaderElementStyles}> {t('inflowType')} </TableCell>
                            <TableCell align="center" sx={styles.tableHeaderElementStyles}> {t('outflowType')} </TableCell>
                            <TableCell align="center" sx={styles.tableHeaderElementStyles}> {t('amount')} </TableCell>
                            <TableCell align="center" sx={styles.tableHeaderElementStyles}> {t('actions')} </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            expenses.map((expense, index) => {
                                return <ExpenseListItem
                                    expenseDetails={expense}
                                    index={index}
                                    handleSnackBarOpen={handleSnackBarOpen}
                                />
                            })
                        }
                    </TableBody>
                    <AddExpense
                        addExpense={addExpense}
                        index={expenses.length}
                        handleAddExpense={handleAddExpense}
                        handleSnackBarOpen={handleSnackBarOpen}
                    />
                </Table>
            </TableContainer>
            <Snackbar
                open={isSnackBarVisible}
                autoHideDuration={2000}
                onClose={handleSnackBarClose}
                message={t(snackBarMesssage)}
            />
        </div>

    )
}

export default ExpenseList
