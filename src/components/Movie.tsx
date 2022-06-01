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
    return <div className="loading">Loading...</div>;
  }

  const movie = first?.get('m');

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { tagline, released } = first?.get('m').properties;

  const graphQuery = `MATCH (m:Movie {title: '${title}'})<-[r1:ACTED_IN]-(p:Person)
    OPTIONAL MATCH (p:Person)-[r2:ACTED_IN]->(otherMovies:Movie)
    RETURN *`;

  return (
    <div className="movie">
      <div className="info">
        <div className="basicinfo">
          <ShowQuery query={query} />
          <div className="image-text">
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
        </div>
        <div className="moreinfo">
          <div>
            <h3>Actors</h3>
            <People movieTitle={title} />
          </div>
        </div>
      </div>
      <div className="graph">
        <Graph containerId="teste" query={graphQuery} />
      </div>
    </div>
  );
};
