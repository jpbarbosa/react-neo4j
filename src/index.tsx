import React from 'react';
import ReactDOM from 'react-dom/client';
import { Neo4jProvider, createDriver } from 'use-neo4j';
import './index.css';
import App from './components/App';

const driver = createDriver(
  'neo4j',
  String(process.env.REACT_APP_GRAPHDB_HOST),
  String(process.env.REACT_APP_GRAPHDB_PORT),
  String(process.env.REACT_APP_GRAPHDB_USER),
  String(process.env.REACT_APP_GRAPHDB_PASS)
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>
);
