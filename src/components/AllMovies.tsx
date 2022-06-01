import React from 'react';
import { Graph } from './Graph';
import { ShowQuery } from './ShowQuery';

export const AllMovies: React.FC = () => {
  const graphQuery = `MATCH (m:Movie)<-[r:ACTED_IN]-(person: Person)
    RETURN *`;

  return (
    <div className="allMovies">
      <ShowQuery query={graphQuery} />
      <Graph containerId="allMovies" query={graphQuery} />
    </div>
  );
};
