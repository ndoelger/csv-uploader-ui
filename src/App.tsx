import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { Stack, Paper, styled } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import UploadCSV from './components/UploadCSV';
import { useState, useEffect } from 'react';
import ExistingCSVComponent from './components/ExistingCSVComponent';

function App() {
  const { user, isAuthenticated } = useAuth0();

  const [csvData, setCsvData] = useState([]);

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

  const getData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/${user?.sub?.split('|')[1]}`
      );

      const body = await response.json();
      // console.log(body)
      setCsvData(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  return !isAuthenticated ? (
    <LoginButton />
  ) : (
    <>
      <LogoutButton />
      <UploadCSV  />
      <Stack spacing={2}>
        {csvData?.map((entry: string, index: number) => {
          const textToSlice = `${user?.sub?.split('|')[1]}/`;
          return (
            <Item>
              <ExistingCSVComponent
                title={entry.slice(
                  entry.indexOf(textToSlice) + textToSlice.length
                )}
                userId={user?.sub?.split('|')[1]}
                key={index}
              />
            </Item>
          );
        })}
      </Stack>
    </>
  );
}

export default App;
