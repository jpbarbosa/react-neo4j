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
    const {
      REACT_APP_GRAPHDB_HOST,
      REACT_APP_GRAPHDB_PORT,
      REACT_APP_GRAPHDB_USER,
      REACT_APP_GRAPHDB_PASS,
    } = process.env;

    const encrypted: 'ENCRYPTION_ON' | 'ENCRYPTION_OFF' =
      window.location.protocol === 'https:'
        ? 'ENCRYPTION_ON'
        : 'ENCRYPTION_OFF';

    const config = {
      container_id: visRef.current.id,
      server_url: `neo4j://${String(REACT_APP_GRAPHDB_HOST)}:${String(
        REACT_APP_GRAPHDB_PORT
      )}`,
      server_user: String(REACT_APP_GRAPHDB_USER),
      server_password: String(REACT_APP_GRAPHDB_PASS),
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
      encrypted,
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
