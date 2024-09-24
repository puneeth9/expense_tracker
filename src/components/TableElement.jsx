import { TextField } from "@mui/material";
import React from "react";

const styles = {
    errorStyles: {
        marginTop: 1
    },
    textStyles: {
        fontSize: 18
    },
};

const TableElement = ({ isEditable = false, value, setValue, type, errorText = '', testId }) => {
    if (isEditable) {
        const errorProps = {};
        if(errorText.length) {
            errorProps.error = true
            errorProps.helperText = errorText;
            errorProps.sx = styles.errorStyles;
        }
        const typeProps = {};
        if(type) {
            typeProps.type = type;
        }
        return (
                <TextField
                    data-testid = {testId}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...typeProps }
                    { ...errorProps }
                />
        )
    }
    return (
            <p style={styles.textStyles} data-testid = {testId} >{value}</p>
    );
}

export default TableElement