import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';
import { ListItem } from './ListItem';
import { ShowQuery } from './ShowQuery';

interface ListProps {
  movieTitle?: string;
  setMovieTitle: Function;
}

export const List: React.FC<ListProps> = ({ movieTitle, setMovieTitle }) => {
  //const query = `MATCH (m:Movie) RETURN m`;
  //const params = { title: 'The Matrix' };

  const query = `MATCH (movie:Movie)
    OPTIONAL MATCH (movie)<-[r1:ACTED_IN]-(person: Person)-[r2:ACTED_IN]->(currentMovie {title: $title})
    RETURN movie,collect(person) AS relations
    ORDER BY movie.title`;

  const params = { title: movieTitle || '' };

  const { error, loading, records, run } = useReadCypher(query, params);

  useEffect(() => {
    run({ title: movieTitle || '' });
  }, [movieTitle]);

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="list">
      <h2>Movies</h2>
      <ShowQuery query={query} />
      <div className="relations">
        <span className="relations">(*)</span> selected movie relations
      </div>
      <ul>
        {records?.map((record) => (
          <ListItem
            record={record}
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}
            key={record.get('movie').properties.title}
          />
        ))}
      </ul>
    </div>
  );
};
