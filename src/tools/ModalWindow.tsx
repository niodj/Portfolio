import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import emailjs from '@emailjs/browser';
import {useState} from "react";
import styled from "styled-components";



    const style = {
        display:'flex',
        flexDirection: 'column',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,

    };

    export const ModalWindow =()=> {
        const [openMain, setOpenMain] = React.useState(false);
        const [openOk, setOpenOk] = React.useState(false);
        const [textInput, setTextInput] = useState('')
        const handleOpen = () => {
            setOpenMain(true);
        };
        const handleClose = () => {
            setOpenMain(false);
            setOpenOk(false);
            setTextInput('')
        };

        const handlerSend=()=>{
            setOpenOk(true);


            const templateParams = {
                message: textInput
            };

            emailjs.send('service_tmwt801','template_hfhdhes', templateParams, '3V8I5ftOdLPYHWQop')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (err) => {
                    console.log('FAILED...', err);
                });

                    }



        return (
            <Wrapper>
                <Button onClick={handleOpen}>Message</Button>
                <Modal
                    open={openMain}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TextField value={textInput} multiline maxRows={8} onChange={(e)=>{
                            setTextInput(e.target.value)}}/>
                        <p>Please, leave your contact</p>
                        <Button onClick={handlerSend}>Send</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>

                {openOk&&
                    <Modal
                        open={openMain}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h2>Thank you for your message</h2>
                            <Button onClick={handleClose}>Close</Button>
                        </Box>
                    </Modal>}
            </Wrapper>
        );
    }
const Wrapper =styled.div`

`
