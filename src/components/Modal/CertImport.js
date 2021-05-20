import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";
import { LamassuModal } from "./LamassuModal";
const LamassuModalCertImport = ({open, handleClose, handleSubmit}) => {

    const inputFileRef = useRef(null);
    const [certContent, setCertContent] = useState("")

    const onFileChange = (e) => {
        /*Selected files data can be collected here.*/
        var files = e.target.files
        if (files.length > 0) {
            console.log(files);
            var reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");
            reader.onload = (evt) => {
                var content = evt.target.result;
                setCertContent(content)
            }
        }else{
            console.log("Nofile");
        }
        inputFileRef.current.value = ""
    }



    return (
        <LamassuModal 
            title={"Import Certificate"}
            msg={"Select a certificate file or paste de appropiate certificate content"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Import",
                        primary: true,
                        onClick: ()=>{handleSubmit(certContent)}
                    }
                ]
            }
            formContent={
                <Box>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={()=>{inputFileRef.current.click() }}
                    >
                        Select Certificate
                    </Button>
                    <input
                        type="file"
                        ref={inputFileRef}
                        hidden
                        onChange={onFileChange}
                    />
                    <Box container style={{margin: 20}}>
                        <MenuSeparator/>
                    </Box>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Certificate content"
                        multiline
                        rows={18}
                        style={{width: 500}}
                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                        variant="outlined"
                        fullWidth
                        value={certContent}
                        onChange={(ev)=>{setCertContent(ev.target.value)}}
                    />

                </Box>
            }
        />
    )
}

export {LamassuModalCertImport}
