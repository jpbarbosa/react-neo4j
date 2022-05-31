import { useState } from 'react';

interface ShowQueryProps {
  query: string;
}

export const ShowQuery: React.FC<ShowQueryProps> = ({ query }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="showQuery">
      {show ? (
        <pre className="query" onClick={() => setShow(false)}>
          {query}
        </pre>
      ) : (
        <pre className="show" onClick={() => setShow(true)}>
          Show Query
        </pre>
      )}
    </div>
  );
};
