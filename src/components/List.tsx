import React from 'react';
import { useReadCypher } from 'use-neo4j';

interface ListProps {
  setMovieTitle: Function;
}

export const List: React.FC<ListProps> = ({ setMovieTitle }) => {
  const query = `MATCH (m:Movie) RETURN m`;
  //const params = { title: 'The Matrix' };

  const { loading, records } = useReadCypher(query);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h2>Movies</h2>
      <ul className="list">
        {records?.map((record) => (
          <li
            key={record.get('m').properties.title}
            onClick={() => setMovieTitle(record.get('m').properties.title)}
          >
            {record.get('m').properties.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
