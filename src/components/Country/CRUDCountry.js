import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Button, Container, Grid,
    Paper, TableContainer, Table, TableCell,
    TableBody, TableRow, TableHead, Dialog, DialogContent, DialogTitle
} from "@mui/material";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';

export default function CRUDCountry({onAction}) {


    useEffect(() => {
        fetch("http://localhost:8080/api/countries/all")
            .then(res => res.json())
            .then((result) => {
                    setCountries(result);
                }
            )
    }, [])

    const update = (() => {
        fetch("http://localhost:8080/api/countries/all")
            .then(res => res.json())
            .then((result) => {
                    setCountries(result);
                }
            )
    })

    const [openCities, setOpenCities] = useState(null);

    const [openLanguages, setOpenLanguages] = useState(null);

    const handleOpenLanguages = (country) => {
        setOpenLanguages(country);
    };

    const handleCloseLanguages = () => {
        setOpenLanguages(null);
    }

    const handleOpenCities = (country) => {
        setOpenCities(country);
    };

    const handleCloseCities = () => {
        setOpenCities(null);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const [startIndex, setStartIndex] = useState(0);

    const [countryIdAddLang, setCountryIdAddLang] = useState("");

    const [addLanguageName, setAddLanguageName] = useState("");

    const handleNextPage = () => {
        setStartIndex(startIndex + 2);
    };

    const handlePreviousPage = () => {
        setStartIndex(startIndex - 2);
    };

    const paperStyle = {
        padding: '50px 20px',
        width: 1100,
        margin: "20px auto",
        backgroundColor: 'rgba(113,100,100,0.95)',
        borderRadius: '10px',
        borderColor: 'rgb(174,54,104)',
        borderWidth: '6px',
        borderStyle: 'solid',
    };

    const [countries, setCountries] = useState([]);
    const handleClick = (id) => {
        fetch("http://localhost:8080/api/countries/delete/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(update)
    };

    const [editing, setEditing] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempNationality, setTempNationality] = useState("");
    const [tempLatitude, setTempLatitude] = useState("");
    const [tempLongitude, setTempLongitude] = useState("");

    const handleAddLanguage = (e) => {
        e.preventDefault();
        let id = countryIdAddLang;
        let languages = [addLanguageName];
        const countryDTO = {id, languages};
        fetch("http://localhost:8080/api/countries/addLanguages", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(countryDTO)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(() => update())
            .catch(error => {
                alert(`Произошла ошибка: ${error.message}`);
            });
    }

    const [newName, setNewName] = useState("");
    const [newNationality, setNewNationality] = useState("");
    const [newLongitude, setNewLongitude] = useState("");
    const [newLatitude, setNewLatitude] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        let name = newName;
        let nationality = newNationality;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const country = {name, nationality, latitude, longitude};
        console.log(country);
        fetch("http://localhost:8080/api/countries/create", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(country)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(() => update())
            .catch(error => {
                alert(`Произошла ошибка: ${error.message}`);
            });
    }

    const handleEdit = (country) => {
        setEditing(country.id);
        setTempName(country.name);
        setTempNationality(country.nationality);
        setTempLatitude(country.latitude);
        setTempLongitude(country.longitude);
    };

    const handleClickRemoveLanguage = (lang) => {
        const languages = [lang.name];
        let id = openLanguages.id;
        const countryDTO = {id, languages}
        console.log(countryDTO);
        fetch("http://localhost:8080/api/countries/removeLanguages", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(countryDTO)
        }).then(update);
    }


    const handleAccept = (e) => {
        e.preventDefault();
        let id = editing;
        let name = newName;
        let nationality = newNationality;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const countryDTO = {id, name, nationality, latitude, longitude};
        console.log(countryDTO);
        fetch("http://localhost:8080/api/countries/updateInfo", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(countryDTO)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(() => update())
            .catch(error => {
                alert(`Произошла ошибка: ${error.message}`);
            });
        setEditing(null);
    };

    const handleCancel = () => {
        setEditing(null);
    };
    const textStyle = {
        color: '#ff8989',
        fontFamily: 'Archive'
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
            <video autoPlay="autoplay" loop="loop" muted style={{
                position: 'absolute',
                width: '100%',
                left: '50%',
                top: '50%',
                height: '100vh',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
                zIndex: '-1',
            }}>
                <source src="/videos/171944-846113548.mp4" type="video/mp4"/>
            </video>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "black",
                opacity: 0.2,
                filter: "blur(20px)"
            }}></div>
            <img src="/1715653740944.svg" alt="description" style={{
                position: "absolute",
                right: 0,
                marginRight: '-50px',
                top: "50%",
                transform: "translateY(-50%)",
                width: "1000px",
                height: "auto",
                opacity: 0.7,
                zIndex: '-1'
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
                            style={{marginBottom: '10px'}}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Nationality"
                            value={newNationality}
                            onChange={(e) => setNewNationality(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Longitude"
                            value={newLongitude}
                            onChange={(e) => setNewLongitude(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Latitude"
                            value={newLatitude}
                            onChange={(e) => setNewLatitude(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Button
                            variant="contained"
                            color="success" style={{marginTop: '-10px'}} onClick={handleCreate}
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
                <Grid container spacing={3}>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Id country"
                            value={countryIdAddLang}
                            onChange={(e) => setCountryIdAddLang(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <ThemeProvider theme={theme}>
                        <TextField
                            label="Name language"
                            value={addLanguageName}
                            onChange={(e) => setAddLanguageName(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
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
                    <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Button
                            variant="contained"
                            color="success" style={{marginTop: '-10px'}} onClick = {handleAddLanguage}
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
                                padding: '2px 70px', // Изменение размера кнопки
                                fontFamily: 'Archive', // Изменение шрифта текста
                                ...textStyle,
                            }}
                        >
                            Add language
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
                            <TableCell sx={textStyle}>Nationality</TableCell>
                            <TableCell sx={textStyle}>Longitude</TableCell>
                            <TableCell sx={textStyle}>Latitude</TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries
                            .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .slice(startIndex, startIndex + 2)
                            .map(country => (
                                <TableRow key={country.id}>
                                    <TableCell sx={textStyle}>{country.id}</TableCell>
                                    <TableCell sx={textStyle}>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Name"
                                                value = {tempName}
                                                onChange={e => setTempName(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                                sx={textStyle}
                                            />
                                        ) : (
                                            country.name
                                        )}
                                    </TableCell>
                                    <TableCell sx={textStyle}>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Nationality"
                                                value = {tempNationality}
                                                onChange={e => setTempNationality(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                                sx={textStyle}
                                            />
                                        ) : (
                                            country.nationality
                                        )}
                                    </TableCell>
                                    <TableCell sx={textStyle}>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Nationality"
                                                value = {tempLongitude}
                                                onChange={e => setTempLongitude(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                                sx={textStyle}
                                            />
                                        ) : (
                                            country.longitude
                                        )}
                                    </TableCell>
                                    <TableCell sx={textStyle}>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Latitude"
                                                value = {tempLatitude}
                                                onChange={e => setTempLatitude(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                                sx={textStyle}
                                            />
                                        ) : (
                                            country.latitude
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleClick(country.id)}
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
                                        {editing === country.id ? (
                                            <>
                                                <Button 
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
                                                variant="contained" 
                                                color="inherit" 
                                                onClick={() => handleEdit(country)}
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
                                    <TableCell sx={textStyle}>
                                        <Button variant = "contained" color = "warning"
                                                onClick={() => handleOpenCities(country)}
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
                                                    ...textStyle,
                                                }}
                                        >
                                            Cities
                                        </Button>
                                        <Dialog onClose = {handleCloseCities} open={openCities !== null} sx={{backgroundColor: 'rgba(163,138,138,0.95)'}}>
                                            <DialogTitle sx={{borderColor: '#AE3668',borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#716464',color: '#ff8989', fontFamily: 'Archive'}}>List of cities</DialogTitle>
                                            <DialogContent sx={{backgroundColor: '#716464', borderColor: '#AE3668',borderWidth: '3px', borderStyle: 'solid'}}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Id</TableCell>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Name</TableCell>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Longitude</TableCell>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Latitude</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {openCities?.cities.map(value => (
                                                            <TableRow key={value.id}>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.id}</TableCell>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.name}</TableCell>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.longitude}</TableCell>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.latitude}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell sx={textStyle}>
                                        <Button variant = "contained" color = "warning"
                                                onClick={() => handleOpenLanguages(country)}
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
                                                    ...textStyle,
                                                }}
                                        >
                                            Languages
                                        </Button>
                                        <Dialog onClose = {handleCloseLanguages} open={openLanguages !== null} sx={{backgroundColor: 'rgba(163,138,138,0.95)'}}>
                                            <DialogTitle sx={{borderColor: '#AE3668', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#716464', color: '#ff8989', fontFamily: 'Archive'}}>List of languages</DialogTitle>
                                            <DialogContent sx={{backgroundColor: '#716464', borderColor: '#AE3668',borderWidth: '3px', borderStyle: 'solid'}}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Id</TableCell>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Name</TableCell>
                                                            <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>Code</TableCell>
                                                            <TableCell> </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {openLanguages?.languages.map(value => (
                                                            <TableRow key={value.id}>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.id}</TableCell>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.name}</TableCell>
                                                                <TableCell sx={{color: '#ff8989', fontFamily: 'Archive'}}>{value.code}</TableCell>
                                                                <TableCell>
                                                                    <Button variant="contained" color="secondary" onClick={() => handleClickRemoveLanguage(value)}
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
                                                                        &#x1F480;
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <IconButton onClick={handlePreviousPage} disabled={startIndex === 0}>
                    <ArrowBack/>
                </IconButton>
                <IconButton onClick={handleNextPage} disabled={startIndex + 2 >= countries.length}>
                    <ArrowForward/>
                </IconButton>
            </TableContainer>
        </Container>
        </div>
    );
}
