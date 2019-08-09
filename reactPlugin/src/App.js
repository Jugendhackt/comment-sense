import React from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App" >
            <Header brand="CommentSense" />
            <Main />
            <Footer />
        </div>
    );
}

export default App;