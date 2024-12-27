import { BrowserRouter } from "react-router-dom";
import Web from "../routes/web";
import "./App.css";
import ToastProvider from "./utility/Toaster";

function App() {
  return (
    <div className="bg-white  min-h-screen">
       <ToastProvider />
      <BrowserRouter>
        <Web />
      </BrowserRouter>
    </div>
  );
}

export default App;
