import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';

interface ListProps {
  movieTitle?: string;
  setMovieTitle: Function;
}

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const List: React.FC<ListProps> = ({ movieTitle, setMovieTitle }) => {
  //const query = `MATCH (m:Movie) RETURN m`;
  //const params = { title: 'The Matrix' };

  const query = `MATCH (movie:Movie)
    OPTIONAL MATCH (movie)<-[relation1]-(person: Person)-[relation2]->(currentMovie {title: $title})
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
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h2>Movies</h2>
      <ul className="list">
        {records?.map((record) => (
          <li
            key={record.get('movie').properties.title}
            onClick={() => setMovieTitle(record.get('movie').properties.title)}
          >
            {record.get('movie').properties.title}
            {record.get('relations').length > 0 && (
              <span
                title={`also with ${record
                  .get('relations')
                  .map((item: any) => item.properties.name)
                  .filter(onlyUnique)
                  .join(', ')}`}
              >
                &nbsp;({record.get('relations').length})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
