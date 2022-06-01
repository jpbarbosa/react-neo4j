import React, { useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';
import { ShowQuery } from './ShowQuery';

interface PeopleProps {
  movieTitle: string;
}

export const People: React.FC<PeopleProps> = ({ movieTitle }) => {
  const query = `MATCH (p:Person)-[r:ACTED_IN]->(m:Movie { title: $title })
    RETURN DISTINCT(p)
    ORDER BY p.name`;

  const params = { title: movieTitle };

  const { error, loading, records, run } = useReadCypher(query, params);

  useEffect(() => {
    run({ title: movieTitle });
  }, [movieTitle]);

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="people">
      <ShowQuery query={query} />
      <ul>
        {records?.map((record) => (
          <li key={record.get('p').properties.name}>
            {record.get('p').properties.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
