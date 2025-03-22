import React, { FC, useEffect, useState } from 'react';

interface Port {
  protocol: string;
  localAddress: string;
  state: string;
}

const ListeningPortsTable: FC = () => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const response = await fetch('api/listening-ports');
        if (!response.ok) {
          setError(`Error: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setPorts(data.ports);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className='listening-ports-table'>
      <caption>Listening Ports</caption>
      <thead>
        <tr>
          <th>Protocol</th>
          <th>Local Address</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {ports.map((port, index) => (
          <tr key={index}>
            <td>{port.protocol}</td>
            <td>{port.localAddress}</td>
            <td>{port.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListeningPortsTable;
