import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { getAppTheme } from './theme';
import ThemeToggle from './components/ThemeToggle';

const AppWrapper = () => {

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <ThemeToggle mode={mode} setMode={setMode} />
      </div>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;

// const AppWrapper = () => {
//     const [mode, setMode] = useState<'light' | 'dark'>('light');
  
//     useEffect(() => {
//       const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
//       if (saved === 'light' || saved === 'dark') {
//         setMode(saved);
//       } else {
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         setMode(prefersDark ? 'dark' : 'light');
//       }
//     }, []);
  
//     useEffect(() => {
//       localStorage.setItem('theme', mode);
//     }, [mode]);
  
//     const theme = useMemo(() => getAppTheme(mode), [mode]);
  
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div style={{ position: 'absolute', top: 10, right: 10 }}>
//           <ThemeToggle mode={mode} setMode={setMode} />
//         </div>
//         <App />
//       </ThemeProvider>
//     );
//   };
  