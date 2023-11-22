import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {BrowserRouter as Router, Routes, Route, useLocation, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [userstate, setUserState] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const searchParams = new URLSearchParams(document.location.search);

    useEffect(() => {
        const code = searchParams.get('code');
        console.log('no')
        if (code && !accessToken) {
            axios.get(`${baseUrl}/oauth/cognito?code=${code}`).then((res) => {
                const {data} = res.data;
                setUserState(data);
                setAccessToken(data.access_token);
                localStorage.setItem('ACCESS_TOKEN', data.access_token);
                localStorage.setItem('ID_TOKEN', data.id_token);
                localStorage.setItem('REFRESH_TOKEN', data.refresh_token);
                console.log(data)
                setUserState(data.user);
            }).catch(err => {
                console.error(err);
                setUserState(null);
            });
        }
    }, []);


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            userstate && userstate.email ? (
                                <Profile
                                    setUserState={setUserState}
                                    username={userstate.id}
                                    logoutUrl={userstate.logout}
                                />
                            ) : (
                                <Login setUserState={setUserState}/>
                            )
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login setUserState={setUserState}/>}
                    ></Route>
                    <Route path="/signup" element={<Register/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
