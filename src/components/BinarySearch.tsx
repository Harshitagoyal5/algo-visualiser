import React, { useState, useEffect } from 'react';
import { Box, Button, Slider, TextField, Typography, Paper } from '@mui/material';

const BinarySearch: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [mid, setMid] = useState<number>(0);
  const [found, setFound] = useState<boolean | null>(null);
  const [size, setSize] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(500);
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    generateArray();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const generateArray = () => {
    const newArray = Array.from({ length: size }, (_, i) => i * 2);
    setArray(newArray);
    setLeft(0);
    setRight(newArray.length - 1);
    setMid(Math.floor((0 + newArray.length - 1) / 2));
    setFound(null);
    setExplanation('Array generated. Click "Search" to start the binary search.');
  };

  const binarySearch = async () => {
    let l = 0;
    let r = array.length - 1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setLeft(l);
      setRight(r);
      setMid(m);

      setExplanation(`Searching... Left: ${l}, Right: ${r}, Mid: ${m}, Current value: ${array[m]}`);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (array[m] === target) {
        setFound(true);
        setExplanation(`Target ${target} found at index ${m}!`);
        return;
      }

      if (array[m] < target) {
        setExplanation(`${array[m]} is less than ${target}. Moving to the right half.`);
        l = m + 1;
      } else {
        setExplanation(`${array[m]} is greater than ${target}. Moving to the left half.`);
        r = m - 1;
      }
    }

    setFound(false);
    setExplanation(`Target ${target} not found in the array.`);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Binary Search
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <TextField
          type="number"
          label="Target"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          sx={{ mr: 2, width: '100px' }}
        />
        <Button variant="contained" onClick={binarySearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ width: '200px', mr: 4 }}>
          <Typography gutterBottom>Array Size: {size}</Typography>
          <Slider
            value={size}
            onChange={(_, newValue) => setSize(newValue as number)}
            min={5}
            max={20}
          />
        </Box>
        <Box sx={{ width: '200px' }}>
          <Typography gutterBottom>Speed: {speed}ms</Typography>
          <Slider
            value={speed}
            onChange={(_, newValue) => setSpeed(newValue as number)}
            min={100}
            max={1000}
          />
        </Box>
      </Box>
      <Paper elevation={3} sx={{ p: 2, mb: 2, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
          {array.map((num, index) => (
            <Box
              key={index}
              sx={{
                width: '30px',
                height: '30px',
                border: '1px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  index === mid
                    ? 'primary.main'
                    : index >= left && index <= right
                    ? 'secondary.main'
                    : 'inherit',
                fontSize: '0.8rem',
              }}
            >
              {num}
            </Box>
          ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1">{explanation}</Typography>
      </Paper>
      {found !== null && (
        <Typography variant="h6">
          {found ? 'Target found!' : 'Target not found.'}
        </Typography>
      )}
    </Box>
  );
};

export default BinarySearch;