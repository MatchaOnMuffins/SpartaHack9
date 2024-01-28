import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";import HeroPage from './Components/Hero';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Components/Dashboard';
import CoursePage from './Components/CoursePage';
import CourseAdd from './Components/CourseAdd';

const theme = createTheme({
  palette: {
    primary: {
      main: '#81689D', // Change the primary color to green
    },
    secondary: {
      main: '#E9F6FF', // Change the secondary color to deep orange
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
        <Route path = "/" element={<HeroPage/>}/>
        <Route path = "/dash" element={<Dashboard/>}/>
        <Route path = "/coursepage" element={<CoursePage/>}/>
        <Route path='/courseadd' element={<CourseAdd/>}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
