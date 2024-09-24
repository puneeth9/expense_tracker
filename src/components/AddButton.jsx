import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import ResetIcon from '@mui/icons-material/Restore'
import { useTranslation } from 'react-i18next'

const AddButton = ({ addExpense = false, handleAddExpense = () => {}}) => {
    const { t } = useTranslation();
    const displayText = addExpense ? t('reset') : t('add');
    const startIcon = addExpense ? <ResetIcon /> : <AddIcon />
    return (
        <>
            <Button
                data-testid="addButton"
                variant='contained'
                onClick={handleAddExpense}
                startIcon={startIcon}
            >
                {displayText}
            </Button>
        </>
    )
}

export default AddButton
