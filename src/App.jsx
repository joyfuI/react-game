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
    </List>
  );

  return (
    <>
      <AppBar className="appBar" position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setMenu(!menu)}
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
        className="drawer"
        open={menu}
        classes={{
          paper: 'drawer'
        }}
        onClose={game ? () => setMenu(false) : null}
      >
        <Toolbar variant="dense" />
        <GameList />
      </Drawer>

      <main className="content">
        <Toolbar variant="dense" />
        <Switch>
          <Route path="/" exact />
          <Route path="/baduk" exact component={Baduk} />
          <Route path="/omok" exact component={Omok} />
          <Route path="/othello" exact component={Othello} />
          <Route path="/tictactoe" exact component={Tictactoe} />
          <Route path="/chess" exact component={Chess} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
