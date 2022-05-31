import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';
import { Graph } from './Graph';
import { People } from './People';
import { ShowQuery } from './ShowQuery';

interface MovieProps {
  title: string;
}

export const Movie: React.FC<MovieProps> = ({ title }) => {
  const query = `MATCH (m:Movie)
    WHERE m.title CONTAINS $title
    RETURN m`;

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
    <div className="movie">
      <ShowQuery query={query} />
      <div className="info">
        <img
          src={`${process.env.PUBLIC_URL}/img/movies/${title}.jpg`}
          alt={title}
          width={100}
          style={{ float: 'left' }}
        />
        <div>
          <h2>{title}</h2>
          <div title="Tagline">{tagline}</div>
          <div title="Released">{released.low}</div>
        </div>
      </div>
      <h3>People</h3>
      <People movieTitle={title} />
      <Graph
        containerId="teste"
        query={`MATCH (m:Movie)-[relatedTo]-(p:Person) WHERE m.title CONTAINS "${title}" RETURN *`}
      />
    </div>
  );
};
