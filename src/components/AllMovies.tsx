import React from 'react';
import { Graph } from './Graph';

export const AllMovies: React.FC = () => {
  return (
    <div className="allMovies">
      <Graph containerId="allMovies" query={`MATCH (m:Movie) RETURN m`} />
    </div>
  );
};
