import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';

interface PeopleProps {
  movieTitle: string;
}

export const People: React.FC<PeopleProps> = ({ movieTitle }) => {
  const query = `MATCH (p:Person)-[relatedTo]-(m:Movie { title: $title })
    RETURN p, type(relatedTo)
    ORDER BY type(relatedTo)`;

  const params = { title: movieTitle };

  const { error, loading, records, run } = useReadCypher(query, params);

  useEffect(() => {
    run({ title: movieTitle });
  }, [movieTitle]);

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ul>
        {records?.map((record) => (
          <li
            key={
              record.get('p').properties.name +
              '_' +
              record.get('type(relatedTo)')
            }
          >
            {record.get('p').properties.name}, {record.get('type(relatedTo)')}
          </li>
        ))}
      </ul>
    </div>
  );
};
