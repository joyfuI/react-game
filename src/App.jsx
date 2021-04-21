import React, { useState, useEffect } from 'react';
import { useLocation, Link, Switch, Route, Redirect } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import './App.css';
import Baduk from './baduk';
import Omok from './omok';
import Othello from './othello';
import Tictactoe from './tictactoe';
import Chess from './chess';

const App = () => {
  const [menu, setMenu] = useState(false);
  const [game, setGame] = useState(null);

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

  const GameList = () => (
    <div className="list" role="presentation" onClick={() => setMenu(false)}>
      <List>
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
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenu(true)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Link to="/">
            <Typography variant="h6" color="inherit">
              Game
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={menu} onClose={game ? () => setMenu(false) : null}>
        <GameList />
      </Drawer>

      <Switch>
        <Route path="/" exact />
        <Route path="/baduk" component={Baduk} />
        <Route path="/omok" component={Omok} />
        <Route path="/othello" component={Othello} />
        <Route path="/tictactoe" component={Tictactoe} />
        <Route path="/chess" component={Chess} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
