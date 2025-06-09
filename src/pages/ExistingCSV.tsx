import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExistingCSVComponent from '../components/ExistingCSVComponent';

type Props = { userId?: string };

const ExistingCSV: React.FC<Props> = ({ userId }) => {
  const [csvData, setCsvData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/${userId}`);

      const body = await response.json();

      setCsvData(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {csvData.map((entry: string, index: number) => {
              const textToSlice = `${userId}/`;
              return (
                <TableRow>
                  <ExistingCSVComponent
                    title={entry.slice(
                      entry.indexOf(textToSlice) + textToSlice.length
                    )}
                    userId={userId}
                    key={index}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExistingCSV;
