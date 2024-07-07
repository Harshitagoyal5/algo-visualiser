import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import BinarySearch from './components/BinarySearch';
import NQueen from './components/NQueen';
import BubbleSort from './components/BubbleSort';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Algorithm Visualizer
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Binary Search" />
              <Tab label="N-Queen" />
              <Tab label="Bubble Sort" />
            </Tabs>
          </Paper>
          <Paper elevation={3} sx={{ p: 4 }}>
            {activeTab === 0 && <BinarySearch />}
            {activeTab === 1 && <NQueen />}
            {activeTab === 2 && <BubbleSort />}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;