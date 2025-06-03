import { Alert, Button, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";

interface FormMultiKeyValueInputProps extends Omit<MetadataInputProps, "value" | "onChange"> {
    control: Control<any, any>,
    name: string
}

export const FormMultiKeyValueInput: React.FC<FormMultiKeyValueInputProps> = (props) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value } }) => {
                return <MetadataInput {...props} onChange={onChange} value={value} />;
            }}
        />
    );
};

interface MetadataInputProps {
    label: string
    value: { [key: string]: any }
    onChange: (values: { [key: string]: any }) => void
    readonly?: boolean
    disabled?: boolean
}

const MetadataInput: React.FC<MetadataInputProps> = (props) => {
    const [metadata, setMetadata] = React.useState("");
    const [enableSave, setEnableSave] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        setMetadata(JSON.stringify(props.value, null, 4));
    }, [props.value]);

    const handleChange = (value: string | undefined) => {
        if (!value) {
            setMetadata("{}");
            return;
        }

        setMetadata(value);

        const isJsonFormat = isJson(value);
        setEnableSave(isJsonFormat);
        setHasError(!isJsonFormat);
    };

    const isJson = (text: string): boolean => {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    };

    const handleClickSave = () => {
        props.onChange(JSON.parse(metadata));
        setEnableSave(false);
    };

    return (
        <Grid container flexDirection={"column"} spacing={1}>
            <Grid>
                <Typography variant="h6">{props.label}</Typography>
            </Grid>
            <Grid>
                <Editor
                    theme="vs-dark"
                    defaultLanguage="json"
                    height="50vh"
                    value={metadata}
                    defaultValue={metadata}
                    onChange={(value) => { handleChange(value); }}
                />
            </Grid>
            {hasError && (
                <Grid>
                    <Alert severity="error">Error parsing metadata. Not a valid JSON</Alert>
                </Grid>
            )}
            <Grid>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!enableSave}
                    onClick={handleClickSave}
                >
                    Save changes
                </Button>
            </Grid>
        </Grid>
    );
};

export { MetadataInput };
