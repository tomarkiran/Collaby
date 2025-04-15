import React, { useEffect, useContext } from 'react';
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Collabs from "./components/Collab/Collabs";
import CollabDetails from "./components/Collab/CollabDetails";
import MyCollabs from "./components/Collab/MyCollabs";
import PostCollabs from "./components/Collab/PostCollabs";
import MyCollabration from "./components/Collabration/MyCollabration";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Auth/Register";
import Collabration from "./components/Collabration/Collabration";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/getUser", { withCredentials: true });
                setUser(response.data.user);
                setIsAuthorized(true);
            } catch {
                setIsAuthorized(false);
            }
        };
        fetchUser();
    }, [isAuthorized]);

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/collab/getall" element={<Collabs />} />
                    <Route path="/collab/:id" element={<CollabDetails />} />
                    <Route path="/collab/post" element={<PostCollabs />} />
                    <Route path="/collab/me" element={<MyCollabs />} />
                    <Route path="/collabration/:id" element={<Collabration />} />
                    <Route path="/collabration/me" element={<MyCollabration />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
            <Toaster />
        </>
    );
};

export default App;