import React, { useState } from 'react';
import './App.css';
import Baduk from './baduk';

const App = () => {
  const [game, setGame] = useState(null);

  switch (game) {
    case 'baduk':
      return <Baduk back={() => setGame(null)} />;

    default:
      return (
        <div className="App">
          <p>
            <a href="#" onClick={() => setGame('baduk')}>
              바둑판
            </a>
          </p>
        </div>
      );
  }
};

export default App;
