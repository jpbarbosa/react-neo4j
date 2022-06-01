import React, { useState } from 'react';
import { AllMovies } from './AllMovies';
import { List } from './List';
import { Movie } from './Movie';

function App() {
  const [movieTitle, setMovieTitle] = useState(undefined);

  return (
    <div className="App">
      <header>
        <h1 onClick={() => setMovieTitle(undefined)}>Neo4j Demo App</h1>
        <a href="https://github.com/jpbarbosa/react-neo4j/">
          github.com/jpbarbosa/react-neo4j
        </a>
      </header>
      <div style={{ display: 'flex' }}>
        <List movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
        {movieTitle ? <Movie title={movieTitle} /> : <AllMovies />}
      </div>
    </div>
  );
}

export default App;
