import { Stack, styled, Paper } from '@mui/material';

import { useState, useEffect } from 'react';

import ExistingCSVComponent from './ExistingCSVComponent';

import UploadCSV from './UploadCSV';

type Props = { userId?: string };

const CSVList: React.FC<Props> = ({ userId }) => {
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <div>
      <UploadCSV userId={userId} getData={getData} />

      <Stack spacing={2}>
        {csvData?.map((entry: string, index: number) => {
          const textToSlice = `${userId}/`;
          return (
            <Item>
              <ExistingCSVComponent
                title={entry.slice(
                  entry.indexOf(textToSlice) + textToSlice.length
                )}
                userId={userId}
                key={index}
              />
            </Item>
          );
        })}
      </Stack>
    </div>
  );
};

export default CSVList;
