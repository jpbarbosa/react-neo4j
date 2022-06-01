import React from 'react';
import { Record } from 'neo4j-driver';

interface ListItemProps {
  record: Record;
  movieTitle?: string;
  setMovieTitle: Function;
}

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const ListItem: React.FC<ListItemProps> = ({
  record,
  movieTitle,
  setMovieTitle,
}) => {
  const { title } = record.get('movie').properties;
  const relations = record
    .get('relations')
    .map((item: any) => item.properties.name)
    .filter(onlyUnique);

  return (
    <li
      onClick={() => setMovieTitle(title)}
      className={title === movieTitle ? 'active' : ''}
    >
      {title}
      {relations.length > 0 && (
        <span title={`also with ${relations.join(', ')}`}>
          &nbsp;({relations.length})
        </span>
      )}
    </li>
  );
};
