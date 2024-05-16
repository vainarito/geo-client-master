/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';



export default function Appbar({onAction}) {
    const [showBackground, setShowBackground] = React.useState(true);

    const handleCRUDCities = () => {
        onAction("CRUD_CITY");
        setShowBackground(false);
    }

    const handleCRUDCountries = () => {
        onAction("CRUD_COUNTRY");
        setShowBackground(false);
    }

    const handleCRUDLanguages = () => {
        onAction("CRUD_LANGUAGE");
        setShowBackground(false);
    }

    const buttonStyle = css`
        color: rgba(255, 255, 255, 0.7);
        font-size: 110px;
        font-family: Archive;
        text-align: left;
        transition: transform 0.3s, color 0.3s;

        &:hover {
            transform: scale(1.1);
            color: rgba(255, 255, 255, 1);
        }

        &:focus {
            outline: none;
        }

        &:active {
            color: rgba(2, 2, 1, 0.33);
            background-color: transparent;
        }
    `;

    return showBackground? (
        <Box sx={{ flexGrow: 1 }}>
            <div style={{ position: "fixed", width: "100%", height: "100%", overflow: "hidden", zIndex: "-1"}}>
                <video autoPlay loop muted style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: "translate(-50%, -50%)", left: "50%", top: "50%"}}>
                    <source src="/videos/171944-846113548.mp4" type="video/mp4" />
                </video>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "black", opacity: 0.2, filter: "blur(20px)"}}></div>
                <img src="/1715653740944.svg" alt="description" style={{ position: "absolute", right: 0, marginRight: '80px', top: "50%", transform: "translateY(-50%)", width: "540px", height: "auto", opacity: 0.7 }} />
            </div>
            <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <Button variant="text" onClick={handleCRUDCities} css={buttonStyle} disableRipple>  C  i  t  y</Button>
                <Button variant="text" onClick={handleCRUDCountries} css={buttonStyle} disableRipple>  C  o  u  n  t  r  y</Button>
                <Button variant="text" onClick={handleCRUDLanguages} css={buttonStyle} disableRipple>  L  a  n  g  u  a  g  e</Button>
            </Box>
        </Box>
    ) : null;
}

