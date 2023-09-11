import React from 'react';
import {ThemeProvider} from "react-jss";
import Leaderboard from "./components/Leaderboard";

const App = () => {
    const theme = {
        background: "#ffffff",
        color: "#24292e"
    };
    return (
        <ThemeProvider theme={theme}>
            <Leaderboard/>
        </ThemeProvider>
    );
};

export default App;