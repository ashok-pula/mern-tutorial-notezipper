import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import MyNotes from "./screens/MyNotes/MyNotes";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import MyProfile from "./screens/MyProfile/MyProfile";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/myprofile" element={<MyProfile/>} />
          <Route path="/createnote" element={<CreateNote/>}/>
          <Route path="/notes/:id" element={<SingleNote/>} />
          <Route path="/mynotes" element={<MyNotes  search={search}/>} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
