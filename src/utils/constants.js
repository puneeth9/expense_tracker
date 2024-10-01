const SNACKBAR_ACTIONS = {
    ADD_EXPENSE: 'expenseAdded',
    EDIT_EXPENSE: 'expenseEdited',
    DELETE_EXPENSE: 'expenseDeleted',
};

const ERROR_MESSAGES = {
    EMPTY: 'Field cannot be empty',
    IN_AND_OUT_FLOW_ARE_SAME: 'Inflow and outflow should be different',
    AMOUNT_NEGATIVE: 'Amount should be greater than 0'
};

export {
    SNACKBAR_ACTIONS,
    ERROR_MESSAGES,
};