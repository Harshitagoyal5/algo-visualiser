import React, { useState, useEffect } from 'react';
import { Box, Button, Slider, Typography, Paper, Grid } from '@mui/material';

const NQueen: React.FC = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [size, setSize] = useState<number>(8);
  const [speed, setSpeed] = useState<number>(500);
  const [solving, setSolving] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [currentSolution, setCurrentSolution] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    initializeBoard();
  }, [size]);

  const initializeBoard = () => {
    const newBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
    setBoard(newBoard);
    setSolutions([]);
    setCurrentSolution(0);
    setExplanation('Board initialized. Click "Solve" to find all solutions.');
  };

  const isSafe = (board: number[][], row: number, col: number): boolean => {
    for (let i = 0; i < col; i++) {
      if (board[row][i]) return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }

    for (let i = row, j = col; j >= 0 && i < size; i++, j--) {
      if (board[i][j]) return false;
    }

    return true;
  };

  const solveNQueenUtil = async (board: number[][], col: number): Promise<boolean> => {
    if (col >= size) {
      setSolutions(prev => [...prev, board.map(row => [...row])]);
      setExplanation(`Solution ${solutions.length + 1} found!`);
      await new Promise((resolve) => setTimeout(resolve, speed));
      return true;
    }

    for (let i = 0; i < size; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        setBoard([...board]);
        setExplanation(`Placing queen at row ${i + 1}, column ${col + 1}`);
        await new Promise((resolve) => setTimeout(resolve, speed));

        await solveNQueenUtil(board, col + 1);

        board[i][col] = 0;
        setBoard([...board]);
        setExplanation(`Backtracking: Removing queen from row ${i + 1}, column ${col + 1}`);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }

    return false;
  };

  const solveNQueen = async () => {
    setSolving(true);
    setSolutions([]);
    setCurrentSolution(0);
    initializeBoard();
    await solveNQueenUtil(board, 0);
    setSolving(false);
    setExplanation(`All solutions found. Total solutions: ${solutions.length}`);
  };

  const showNextSolution = () => {
    setCurrentSolution((prev) => (prev + 1) % solutions.length);
  };

  const showPrevSolution = () => {
    setCurrentSolution((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        N-Queen Problem
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={solveNQueen} disabled={solving}>
            {solving ? 'Solving...' : 'Solve'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={showPrevSolution} disabled={solutions.length === 0}>
            Previous Solution
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={showNextSolution} disabled={solutions.length === 0}>
            Next Solution
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Board Size: {size}</Typography>
          <Slider
            value={size}
            onChange={(_, newValue) => setSize(newValue as number)}
            min={4}
            max={12}
            disabled={solving}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Speed: {speed}ms</Typography>
          <Slider
            value={speed}
            onChange={(_, newValue) => setSpeed(newValue as number)}
            min={100}
            max={1000}
            disabled={solving}
          />
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'inline-block', backgroundColor: 'grey.900' }}>
        <Box sx={{ display: 'inline-block', border: '2px solid gold', padding: '4px' }}>
          {(solutions[currentSolution] || board).map((row, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex' }}>
              {row.map((cell, cellIndex) => (
                <Box
                  key={cellIndex}
                  sx={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: (rowIndex + cellIndex) % 2 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: cell ? 'gold' : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    },
                  }}
                >
                  {cell ? '♛' : ''}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2, maxWidth: '600px', margin: 'auto' }}>
        <Typography variant="body1">{explanation}</Typography>
      </Paper>
      {solutions.length > 0 && (
        <Typography variant="h6">
          Solution {currentSolution + 1} of {solutions.length}
        </Typography>
      )}
    </Box>
  );
};

export default NQueen;