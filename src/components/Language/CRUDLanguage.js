import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Button, Container, Grid,
    Paper, TableContainer, Table, TableCell,
    TableBody, TableRow, TableHead
} from "@mui/material";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function CRUDLanguage({onAction}) {


    useEffect(() => {
        fetch("http://localhost:8080/api/languages/all")
            .then(res => res.json())
            .then((result) => {
                    setLanguages(result);
                }
            )
    }, [])

    const update = (() => {
        fetch("http://localhost:8080/api/languages/all")
            .then(res => res.json())
            .then((result) => {
                    setLanguages(result);
                }
            )
    })

    const [searchTerm, setSearchTerm] = useState("");

    const [startIndex, setStartIndex] = useState(0);

    const handleNextPage = () => {
        setStartIndex(startIndex + 2);
    };

    const handlePreviousPage = () => {
        setStartIndex(startIndex - 2);
    };

    const paperStyle = {
        padding: '50px 20px',
        width: 800,
        margin: "15px auto",
        backgroundColor: 'rgba(113,100,100,0.95)',
        borderRadius: '10px',
        borderColor: 'rgb(174,54,104)',
        borderWidth: '6px',
        borderStyle: 'solid',
    };
    const textStyle = {
        color: '#ff8989',
        fontFamily: 'Archive'
    };


    const [languages, setLanguages] = useState([]);
    const handleClick = (id) => {
        fetch("http://localhost:8080/api/languages/delete/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(update)
    };

    const [editing, setEditing] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempCode, setTempCode] = useState("");

    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        let name = newName;
        let code = newCode;
        const language = {name, code};
        fetch("http://localhost:8080/api/languages/create", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(language)
        }).then(() => update())
    }

    const handleEdit = (language) => {
        setEditing(language.id);
        setTempName(language.name);
        setTempCode(language.code);
    };

    const handleAccept = (e) => {
        e.preventDefault();
        let id = editing;
        let name = tempName;
        let code = tempCode;
        const language = {id, name, code};
        fetch("http://localhost:8080/api/languages/updateInfo", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(language)
        }).then(() => update())
        setEditing(null);
    };

    const handleCancel = () => {
        setEditing(null);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff8989', // Change this to your desired color
            },
        },
    });

    const buttonStyle = {
        color: 'inherit', // Inherit font color
        fontSize: '16px',
        fontFamily: 'Archive',
        textAlign: 'left',
        transition: 'transform 0.3s, color 0.3s',
        backgroundColor: 'rgba(12,12,12,0)',
        padding: '4px 1px',
        position: 'absolute',
        left: '0',
        bottom: '1',
        '&:hover': {
            transform: 'scale(1.1)',
            color: '#ff8989',
            backgroundColor: 'rgba(130,140,134,0.41)',
        },
        '&:focus': {
            outline: 'none',
        },
        '&:active': {
            color: 'rgba(2, 2, 1, 0.33)',
            backgroundColor: 'transparent',
        },
    };

    const handleBack = () => {
        onAction("IS_BACK");
    }

    return (
        <div style={{position: "fixed", width: "100%", height: "100%", overflow: "hidden", zIndex: "-1"}}>
            <video autoPlay="autoplay" loop="loop" muted style={{position: 'absolute', width: '100%', left: '50%', top: '50%', height: '100vh', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: '-1',}}>
                <source src="/videos/171944-846113548.mp4" type="video/mp4"/>
            </video>
            <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "black", opacity: 0.2, filter: "blur(20px)"}}></div>
            <img src="/1715653740944.svg" alt="description" style={{position: "absolute", right: 0, marginRight: '-50px', top: "50%", transform: "translateY(-50%)", width: "1000px", height: "auto", opacity: 0.7, zIndex: '-1'
            }}/>
            <Container>
                <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                    <Button variant="text" onClick={handleBack} sx={buttonStyle} disableRipple>B A C K</Button>
                </Box>
                <TableContainer component={Paper} elevation={3} style={paperStyle}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                            <TextField
                                label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                variant="outlined"
                                style={{ marginBottom: '10px' }}
                                fullWidth={true}
                                sx={{
                                    '& .MuiInputBase-root': { // Style the input field
                                        backgroundColor: 'rgba(73,70,70,0.6)',
                                        borderRadius: '2px',
                                        padding: '2px',
                                    },
                                    '& .MuiInputBase-input': { // Style the input text
                                        color: '#ff8989 !important',
                                        fontFamily: 'Archive !important',
                                        fontSize: '16px',
                                    },
                                    '& .MuiInputLabel-root': { // Style the label
                                        color: '#ff8989',
                                        fontFamily: 'Archive !important',
                                        fontSize: '14px',
                                    },
                                    '&:hover': { // Styles for hover state
                                        '& .MuiInputBase-root': { // Style the input field on hover
                                            borderColor: '#ff8989', // Change outline color to blue
                                        },
                                    },
                                }}
                            />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    label="Name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: '10px', width: '100%' }}
                                    sx={{
                                        '& .MuiInputBase-root': { // Style the input field
                                            backgroundColor: 'rgba(73,70,70,0.6)',
                                            borderRadius: '2px',
                                            padding: '2px',
                                        },
                                        '& .MuiInputBase-input': { // Style the input text
                                            color: '#ff8989',
                                            fontFamily: 'Archive',
                                            fontSize: '16px',
                                        },
                                        '& .MuiInputLabel-root': { // Style the label
                                            color: '#ff8989',
                                            fontFamily: 'Archive !important',
                                            fontSize: '14px',
                                        },
                                        '&:hover': { // Styles for hover state
                                            '& .MuiInputBase-root': { // Style the input field on hover
                                                borderColor: '#ff8989', // Change outline color to blue
                                            },
                                        },
                                    }}
                                />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <ThemeProvider theme={theme}>
                            <TextField
                                label="Code"
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value)}
                                variant="outlined"
                                style={{ marginBottom: '10px', width: '100%' }}
                                sx={{
                                    '& .MuiInputBase-root': { // Style the input field
                                        backgroundColor: 'rgba(73,70,70,0.6)',
                                        borderRadius: '2px',
                                        padding: '2px',
                                    },
                                    '& .MuiInputBase-input': { // Style the input text
                                        color: '#ff8989',
                                        fontFamily: 'Archive',
                                        fontSize: '16px',
                                    },
                                    '& .MuiInputLabel-root': { // Style the label
                                        color: '#ff8989',
                                        fontFamily: 'Archive !important',
                                        fontSize: '14px',
                                    },
                                    '&:hover': { // Styles for hover state
                                        '& .MuiInputBase-root': { // Style the input field on hover
                                            borderColor: '#ff8989', // Change outline color to blue
                                        },
                                    },
                                }}
                            />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                color="success" style={{ marginTop: '-10px' }} onClick={handleCreate}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(130,140,134,0.41)',
                                        transition: 'background-color 0.3s ease',
                                        '&.MuiButton-label': {
                                            color: '#ff8989',
                                            fontFamily: 'Archive', // Изменение шрифта текста
                                        },
                                    },
                                    backgroundColor: '#0c0c0c',
                                    fontSize: '16px', // Изменение размера текста
                                    padding: '16px 60px', // Изменение размера кнопки
                                    fontFamily: 'Archive', // Изменение шрифта текста
                                    ...textStyle,
                                }}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    </TableContainer>
                    <TableContainer component={Paper} elevation={3} style={paperStyle}>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell sx={textStyle}>Id</TableCell>
                                <TableCell sx={textStyle}>Name</TableCell>
                                <TableCell sx={textStyle}>Code</TableCell>
                                <TableCell sx={textStyle}></TableCell>
                                <TableCell sx={textStyle}></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {languages
                                .filter(language => language.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .slice(startIndex, startIndex + 2)
                                .map(language => (
                                    <TableRow key={language.id}>
                                        <TableCell sx={textStyle}>{language.id}</TableCell>
                                        <TableCell sx={textStyle}>
                                            {editing === language.id? (
                                                <TextField
                                                    label="Name"
                                                    value={tempName}
                                                    onChange={e => setTempName(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: '10px' }}
                                                    sx={textStyle}
                                                />
                                            ) : (
                                                language.name
                                            )}
                                        </TableCell>

                                        <TableCell sx={textStyle}>
                                            {editing === language.id? (
                                                <TextField
                                                    label="Code"
                                                    value={tempCode}
                                                    onChange={e => setTempCode(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: '10px' }}
                                                    sx={textStyle}
                                                />
                                            ) : (
                                                language.code
                                            )}
                                        </TableCell>

                                        <TableCell sx={textStyle}>
                                            <Button
                                                style={{ float: 'right', marginRight: '10px' }} // добавлено marginRight
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleClick(language.id)}
                                                sx={{
                                                    '&.MuiButton-root': {
                                                        backgroundColor: '#0c0c0c', // Синий цвет кнопки
                                                        '&:hover': {
                                                            backgroundColor: '#cf0303', // Фиолетовый цвет фона при наведении
                                                        },
                                                        padding: '10px 0', // Устанавливаем одинаковые значения для padding
                                                        height: '50px', // Явно задаем высоту
                                                        width: '20px', // Явно задаем ширину
                                                    },
                                                }}
                                            >
                                                &#x1F480;
                                            </Button>
                                        </TableCell>



                                        <TableCell sx={textStyle}>
                                            {editing === language.id ? (
                                                <>
                                                    <Button
                                                        style={{ float: 'left', marginRight: '0px' }} // добавлено marginRight
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleAccept}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#67bd6e',
                                                                transition: 'background-color 0.3s ease',
                                                                '&.MuiButton-label': {
                                                                    color: '#ff8989',
                                                                    fontFamily: 'Archive', // Изменение шрифта текста
                                                                },
                                                            },
                                                            backgroundColor: '#0c0c0c',
                                                            fontSize: '16px', // Изменение размера текста
                                                            padding: '10px 20px', // Изменение размера кнопки
                                                            fontFamily: 'Archive', // Изменение шрифта текста
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        style={{ float: 'left', marginRight: '0px' }} // добавлено marginRight
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={handleCancel}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#ff0000',
                                                                transition: 'background-color 0.3s ease',
                                                                '&.MuiButton-label': {
                                                                    color: '#ff8989',
                                                                    fontFamily: 'Archive', // Изменение шрифта текста
                                                                },
                                                            },
                                                            backgroundColor: '#0c0c0c',
                                                            fontSize: '16px', // Изменение размера текста
                                                            padding: '10px 20px', // Изменение размера кнопки
                                                            fontFamily: 'Archive', // Изменение шрифта текста
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    style={{ float: 'left', marginRight: '0px' }} // добавлено marginRight
                                                    variant="contained"
                                                    color="inherit"
                                                    onClick={() => handleEdit(language)}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(130,140,134,0.41)',
                                                            transition: 'background-color 0.3s ease',
                                                            '&.MuiButton-label': {
                                                                color: '#ff8989',
                                                                fontFamily: 'Archive', // Изменение шрифта текста
                                                            },
                                                        },
                                                        backgroundColor: '#0c0c0c',
                                                        fontSize: '16px', // Изменение размера текста
                                                        padding: '10px 20px', // Изменение размера кнопки
                                                        fontFamily: 'Archive', // Изменение шрифта текста
                                                    }}
                                                >
                                                    Change
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <IconButton onClick={handlePreviousPage} disabled={startIndex === 0}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton onClick={handleNextPage} disabled={startIndex + 2 >= languages.length}>
                        <ArrowForward />
                    </IconButton>
                </TableContainer>
            </Container>
        </div>
    );
}
