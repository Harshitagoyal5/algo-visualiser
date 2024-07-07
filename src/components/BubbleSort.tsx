import React, { useState, useEffect } from 'react';
import { Box, Button, Slider, Typography, Paper, Grid } from '@mui/material';

const BubbleSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [size, setSize] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(500);
  const [sorting, setSorting] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>('');
  const [currentCompare, setCurrentCompare] = useState<[number, number] | null>(null);
  const [sortedIndex, setSortedIndex] = useState<number>(-1);

  useEffect(() => {
    generateArray();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const generateArray = () => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setExplanation('New array generated. Click "Sort" to start bubble sort.');
    setCurrentCompare(null);
    setSortedIndex(-1);
  };

  const bubbleSort = async () => {
    setSorting(true);
    const n = array.length;
    const sortedArray = [...array];

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        setCurrentCompare([j, j + 1]);
        setExplanation(`Comparing ${sortedArray[j]} and ${sortedArray[j + 1]}`);
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (sortedArray[j] > sortedArray[j + 1]) {
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
          setArray([...sortedArray]);
          setExplanation(`Swapped ${temp} and ${sortedArray[j]}`);
          swapped = true;
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }

      setSortedIndex(n - i - 1);

      if (!swapped) {
        break;
      }
    }

    setCurrentCompare(null);
    setSortedIndex(-1);
    setSorting(false);
    setExplanation('Array sorted!');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Bubble Sort
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={bubbleSort}
            disabled={sorting}
            sx={{ mr: 2 }}
          >
            {sorting ? 'Sorting...' : 'Sort'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={generateArray} disabled={sorting}>
            Generate New Array
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Array Size: {size}</Typography>
          <Slider
            value={size}
            onChange={(_, newValue) => setSize(newValue as number)}
            min={5}
            max={50}
            disabled={sorting}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Speed: {speed}ms</Typography>
          <Slider
            value={speed}
            onChange={(_, newValue) => setSpeed(newValue as number)}
            min={50}
            max={1000}
            disabled={sorting}
          />
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 2, mb: 2, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '300px', minWidth: 'max-content' }}>
          {array.map((num, index) => (
            <Box
              key={index}
              sx={{
                width: `${Math.max(600 / size, 15)}px`,
                height: `${(num / 100) * 100}%`,
                backgroundColor: 
                  currentCompare?.includes(index)
                    ? 'secondary.main'
                    : index > sortedIndex
                    ? 'primary.main'
                    : 'success.main',
                margin: '0 1px',
                transition: 'height 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2, maxWidth: '600px', margin: 'auto' }}>
        <Typography variant="body1">{explanation}</Typography>
      </Paper>
    </Box>
  );
};

export default BubbleSort;