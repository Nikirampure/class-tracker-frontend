import React from "react";
import Navbar from "./components/Navbar";
import "./Home.css";
import Bookings from "./components/Bookings";
import Header from "./components/Header";
import Classes from "./components/Classes";
import Footer from "./components/Footer";


const Home = () => {

  return (
    <div className="landing-container">

      <Navbar/>

      <Header/>
      
      <Bookings/>

      <Classes/>

      <Footer/>
      
    </div>
  );
};

export default Home;
