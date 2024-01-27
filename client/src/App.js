import './App.css';
import Header from './Components/Header';
import HeroPage from './Components/Hero';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E0CCBE', // Change the primary color to green
    },
    secondary: {
      main: '#EEEDEB', // Change the secondary color to deep orange
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <HeroPage/>
    </ThemeProvider>
  );
}

export default App;
