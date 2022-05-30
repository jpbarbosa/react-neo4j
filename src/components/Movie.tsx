import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';
import { Graph } from './Graph';
import { People } from './People';

interface MovieProps {
  title: string;
}

export const Movie: React.FC<MovieProps> = ({ title }) => {
  const query = `MATCH (m:Movie) WHERE m.title CONTAINS $title RETURN m`;

  const params = { title };

  const { loading, first, run } = useReadCypher(query, params);

  useEffect(() => {
    run({ title });
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const movie = first?.get('m');

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { tagline, released } = first?.get('m').properties;

  return (
    <div className="App">
      <div>Tagline: {tagline}</div>
      <div>Released year: {released.low}</div>
      <h3>People:</h3>
      <People movieTitle={title} />
      <Graph
        backgroundColor="white"
        width={600}
        height={600}
        containerId="teste"
        query={`MATCH (m:Movie)-[relatedTo]-(p:Person) WHERE m.title CONTAINS "${title}" RETURN *`}
      />
    </div>
  );
};
