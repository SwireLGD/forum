import { Container, Typography } from '@mui/material';
import AppToolbar from './components/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Threads from './features/threads/Threads';
import Register from './features/users/Register';
import NewThread from './features/threads/NewThread';
import Login from './features/users/Login';

const App = () => {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Threads/>} />
            <Route path="/add_thread" element={<NewThread />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Typography variant="h2">Not found!</Typography>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;