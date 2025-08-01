import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Routing from "./utilsHelper/Routing";
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routing />
      <Footer />
    </>
  );
};

export default App;
