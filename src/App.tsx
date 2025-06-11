import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import CSVList from './components/CSVList';
import UploadCSV from './components/UploadCSV';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated } = useAuth0();



  return !isAuthenticated ? (
    <LoginButton />
  ) : (
    <>
      <LogoutButton />
      <CSVList userId={user?.sub?.split('|')[1]} />
    </>
  );
}

export default App;
