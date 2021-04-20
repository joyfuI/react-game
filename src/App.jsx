import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Baduk from './baduk';
import Omok from './omok';
import Othello from './othello';
import Tictactoe from './tictactoe';
import Chess from './chess';

const App = () => {
  const menu = () => (
    <div className="App">
      <ul>
        <li>
          <Link to="/baduk">바둑판</Link>
        </li>
        <li>
          <Link to="/omok">오목</Link>
        </li>
        <li>
          <Link to="/othello">오델로</Link>
        </li>
        <li>
          <Link to="/tictactoe">틱택토</Link>
        </li>
        <li>
          <Link to="/chess">체스</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Switch>
      <Route path="/" component={menu} exact />
      <Route path="/baduk" component={Baduk} />
      <Route path="/omok" component={Omok} />
      <Route path="/othello" component={Othello} />
      <Route path="/tictactoe" component={Tictactoe} />
      <Route path="/chess" component={Chess} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
