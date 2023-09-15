import React from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {TodoListsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import CustomizedSnackbars from "../components/errorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodoListsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>

        </div>
    );
}


export default App;
