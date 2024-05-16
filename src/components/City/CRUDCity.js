import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Button, Container, Grid, Paper,
    Table, TableCell,
    TableBody, TableRow, TableHead, TableContainer
} from "@mui/material";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';

export default function CRUDCity({onAction}) {

    useEffect(() => {
        fetch("http://localhost:8080/api/cities/all")
            .then(res => res.json())
            .then((result) => {
                    setCities(result);
                }
            )
    }, [])

    const update = (() => {
        fetch("http://localhost:8080/api/cities/all")
            .then(res => res.json())
            .then((result) => {
                    setCities(result);
                }
            )
    })

    const [editing, setEditing] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempLatitude, setTempLatitude] = useState("");
    const [tempLongitude, setTempLongitude] = useState("");

    const [newName, setNewName] = useState("");
    const [newLatitude, setNewLatitude] = useState("");
    const [newLongitude, setNewLongitude] = useState("");
    const [newCountryName, setNewCountryName] = useState("")

    const [searchTerm, setSearchTerm] = useState("");

    const [startIndex, setStartIndex] = useState(0);

    const handleNextPage = () => {
        setStartIndex(startIndex + 2);
    };

    const handlePreviousPage = () => {
        setStartIndex(startIndex - 2);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        let name = newName;
        let countryName = newCountryName;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const city = {name, countryName, latitude, longitude};
        console.log(city);
        fetch("http://localhost:8080/api/cities/create", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(city)
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

    const handleAccept = (e) => {
        e.preventDefault();
        let id = editing;
        let name = tempName;
        let latitude = tempLatitude;
        let longitude = tempLongitude;
        const city = {id, name, longitude, latitude}
        console.log(city);
        fetch("http://localhost:8080/api/cities/updateInfo", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(city)
        }).then(response => {
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
    }

    const handleCancel = () => {
        setEditing(null);
    }

    const handleEdit = (city) => {
        setEditing(city.id);
        setTempName(city.name);
        setTempLatitude(city.latitude);
        setTempLongitude(city.longitude);
    };

    const paperStyle = {
        padding: '50px 20px',
        width: 790,
        margin: "20px auto",
        backgroundColor: 'rgba(113,100,100,0.95)',
        borderRadius: '10px',
        borderColor: 'rgb(174,54,104)',
        borderWidth: '6px',
        borderStyle: 'solid',
    };
    const [cities, setCities] = useState([]);
    const handleClick = (id) => {
        fetch("http://localhost:8080/api/cities/delete/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(update)
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
                        <Grid item xs={3} style={{display: 'flex'}}>
                            <ThemeProvider theme={theme}>
                            <TextField
                                label="Country name"
                                value={newCountryName}
                                onChange={(e) => setNewCountryName(e.target.value)}
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
                        <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="contained" color="success" style={{marginTop: '-10px'}}
                                    onClick={handleCreate}
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
                                <TableCell sx={textStyle}>Longitude</TableCell>
                                <TableCell sx={textStyle}>Latitude</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cities
                                .filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .slice(startIndex, startIndex + 2)
                                .map(city => (
                                    <TableRow key={city.id}>
                                        <TableCell sx={textStyle}>{city.id}</TableCell>
                                        <TableCell sx={textStyle}>
                                            {editing === city.id ? (
                                                <TextField
                                                    label="Name"
                                                    value={tempName}
                                                    onChange={e => setTempName(e.target.value)}
                                                    variant="outlined"
                                                    style={{marginBottom: '10px'}}
                                                    sx={textStyle}
                                                />
                                            ) : (
                                                city.name
                                            )}
                                        </TableCell>

                                        <TableCell sx={textStyle}>
                                            {editing === city.id ? (
                                                <TextField
                                                    label="Longitude"
                                                    value={tempLongitude}
                                                    onChange={e => setTempLongitude(e.target.value)}
                                                    variant="outlined"
                                                    style={{marginBottom: '10px'}}
                                                    sx={textStyle}
                                                />
                                            ) : (
                                                city.longitude
                                            )}
                                        </TableCell>

                                        <TableCell sx={textStyle}>
                                            {editing === city.id ? (
                                                <TextField
                                                    label="Latitude"
                                                    value={tempLatitude}
                                                    onChange={e => setTempLatitude(e.target.value)}
                                                    variant="outlined"
                                                    style={{marginBottom: '10px'}}
                                                    sx={textStyle}
                                                />
                                            ) : (
                                                city.latitude
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                style={{ float: 'right', marginRight: '10px' }} // добавлено marginRight
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleClick(city.id)}
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
                                            {editing === city.id ? (
                                                <>
                                                    <Button
                                                        style={{ float: 'left', marginRight: '10px' }} // добавлено marginRight
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
                                                        style={{ float: 'left', marginRight: '10px' }} // добавлено marginRight
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
                                                    style={{ float: 'left', marginRight: '10px' }} // добавлено marginRight
                                                    variant="contained"
                                                    color="inherit"
                                                        onClick={() => handleEdit(city)}
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
                        <ArrowBack/>
                    </IconButton>
                    <IconButton onClick={handleNextPage} disabled={startIndex + 2 >= cities.length}>
                        <ArrowForward/>
                    </IconButton>
                </TableContainer>
            </Container>
        </div>
    );
}
