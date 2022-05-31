import React, { useState } from 'react';
import { AllMovies } from './AllMovies';
import { List } from './List';
import { Movie } from './Movie';

function App() {
  const [movieTitle, setMovieTitle] = useState(undefined);

  return (
    <div className="App">
      <h1 onClick={() => setMovieTitle(undefined)}>Neo4j Sandbox</h1>
      <div style={{ display: 'flex' }}>
        <List movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
        {movieTitle ? <Movie title={movieTitle} /> : <AllMovies />}
      </div>
    </div>
  );
}

export default App;
