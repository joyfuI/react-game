import React, { useState } from 'react';
import './App.css';
import Baduk from './baduk';
import Omok from './omok';
import Othello from './othello';

const App = () => {
  const [game, setGame] = useState(null);

  switch (game) {
    case 'baduk':
      return <Baduk back={() => setGame(null)} />;

    case 'omok':
      return <Omok back={() => setGame(null)} />;

    case 'othello':
      return <Othello back={() => setGame(null)} />;

    default:
      return (
        <div className="App">
          <p>
            <button
              className="link-button"
              type="button"
              onClick={() => setGame('baduk')}
            >
              바둑판
            </button>
          </p>
          <p>
            <button
              className="link-button"
              type="button"
              onClick={() => setGame('omok')}
            >
              오목
            </button>
          </p>
          <p>
            <button
              className="link-button"
              type="button"
              onClick={() => setGame('othello')}
            >
              오델로
            </button>
          </p>
        </div>
      );
  }
};

export default App;
