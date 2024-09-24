import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const styles = {
    editStyles: { marginRight: 1 },
    deleteStyles: { marginLeft: 1 }
}

const ActionsComponent = ({ isEditable = false, handleEdit = () => {}, handleDelete = () => {}, handleSave = () => {}, index=-1 }) => {
    const { t } = useTranslation();
    if (isEditable) {
        return (
            <>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    data-testid={`${index}_save`}
                >
                    {t('save')}
                </Button>
            </>
        )
    }
    return (
        <>
            <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                sx={styles.editStyles}
                data-testid={`${index}_edit`}
            >
                {t('edit')}
            </Button>
            <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                sx={styles.deleteStyles}
                data-testid={`${index}_delete`}
            >
                {t('delete')}
            </Button>
        </>
    )
}

export default ActionsComponent;