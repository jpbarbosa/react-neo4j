import React, { useState } from 'react';
import { List } from './List';
import { Movie } from './Movie';

function App() {
  const [movieTitle, setMovieTitle] = useState(undefined);

  return (
    <div className="App">
      <h1>Neo4j Sandbox</h1>
      <div style={{ display: 'flex' }}>
        <List setMovieTitle={setMovieTitle} />
        {movieTitle && (
          <div>
            <h2>{movieTitle}</h2>
            <Movie title={movieTitle} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
