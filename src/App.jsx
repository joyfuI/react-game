import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link, Routes, Route, Navigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import './App.css';
import Baduk from './baduk';
import Omok from './omok';
import Othello from './othello';
import Tictactoe from './tictactoe';
import Chess from './chess';
import Minesweeper from './minesweeper';
import Z048 from './2048';
import Connect6 from './connect6';

const App = () => {
  const [menu, setMenu] = useState(false);
  const [game, setGame] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const location = useLocation();

  useEffect(() => {
    const name = location.pathname.slice(1);
    if (name) {
      setGame(name);
    } else {
      setMenu(true);
      setGame(null);
    }
  }, [location]);

  const GameList = useCallback(
    () => (
      <List onClick={() => setMenu(false)}>
        <Link to="/baduk">
          <ListItem button selected={game === 'baduk'}>
            <ListItemText primary="바둑판" />
          </ListItem>
        </Link>
        <Link to="/omok">
          <ListItem button selected={game === 'omok'}>
            <ListItemText primary="오목" />
          </ListItem>
        </Link>
        <Link to="/othello">
          <ListItem button selected={game === 'othello'}>
            <ListItemText primary="오델로" />
          </ListItem>
        </Link>
        <Link to="/tictactoe">
          <ListItem button selected={game === 'tictactoe'}>
            <ListItemText primary="틱택토" />
          </ListItem>
        </Link>
        <Link to="/chess">
          <ListItem button selected={game === 'chess'}>
            <ListItemText primary="체스" />
          </ListItem>
        </Link>
        <Link to="/minesweeper">
          <ListItem button selected={game === 'minesweeper'}>
            <ListItemText primary="지뢰찾기" />
          </ListItem>
        </Link>
        <Link to="/2048">
          <ListItem button selected={game === '2048'}>
            <ListItemText primary="2048" />
          </ListItem>
        </Link>
        <Link to="/connect6">
          <ListItem button selected={game === 'connect6'}>
            <ListItemText primary="육목" />
          </ListItem>
        </Link>
      </List>
    ),
    [game]
  );

  const handleAlertOpen = (msg) => {
    setAlertText(msg);
    setAlertOpen(true);
  };

  const handleAlertClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setAlertOpen(false);
    }
  };

  return (
    <>
      <AppBar
        classes={{
          root: 'appBar',
        }}
        position="fixed"
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={game ? () => setMenu(!menu) : null}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Link to="/">
            <Typography variant="h6" noWrap>
              Game
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        open={menu}
        classes={{
          paper: 'drawer',
        }}
        onClose={game ? () => setMenu(false) : null}
      >
        <Toolbar variant="dense" />
        <GameList />
      </Drawer>

      <main className="content">
        <Toolbar variant="dense" />
        <Routes>
          <Route path="/" />
          <Route path="baduk" element={<Baduk />} />
          <Route path="omok" element={<Omok onAlert={handleAlertOpen} />} />
          <Route
            path="othello"
            element={<Othello onAlert={handleAlertOpen} />}
          />
          <Route
            path="tictactoe"
            element={<Tictactoe onAlert={handleAlertOpen} />}
          />
          <Route path="chess" element={<Chess onAlert={handleAlertOpen} />} />
          <Route
            path="minesweeper"
            element={<Minesweeper onAlert={handleAlertOpen} />}
          />
          <Route path="2048" element={<Z048 onAlert={handleAlertOpen} />} />
          <Route
            path="connect6"
            element={<Connect6 onAlert={handleAlertOpen} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Dialog
        classes={{
          root: 'dialog',
        }}
        open={alertOpen}
        onClose={handleAlertClose}
      >
        <DialogTitle>{alertText}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
