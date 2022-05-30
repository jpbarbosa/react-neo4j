import React, { useEffect, useRef } from 'react';
import Neovis from 'neovis.js';

interface NeoGraphProps {
  width: number;
  height: number;
  containerId: string;
  backgroundColor: string;
  query: string;
}

const Graph: React.FC<NeoGraphProps> = (props) => {
  const { width, height, containerId, backgroundColor, query } = props;

  const visRef = useRef<any>();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: 'neo4j://e6f36053.databases.neo4j.io:7687',
      server_user: String(process.env.REACT_APP_GRAPHDB_USER),
      server_password: String(process.env.REACT_APP_GRAPHDB_PASS),
      labels: {
        Movie: {
          caption: 'title',
          font: { size: '10' },
        },
        Person: {
          caption: 'name',
          font: { size: '10' },
        },
      },
      relationships: {
        ACTED_IN: {
          caption: false,
          thickness: '1',
        },
        DIRECTED: {
          caption: false,
          thickness: '1',
        },
        WROTE: {
          caption: false,
          thickness: '1',
        },
        REVIEWED: {
          caption: false,
          thickness: '1',
        },
        PRODUCED: {
          caption: false,
          thickness: '1',
        },
      },
      initial_cypher: query,
    };
    const vis = new Neovis(config);
    vis.render();
  }, [query]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

export { Graph };
