import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import useAuth from './hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.user ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Header />

    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </div>
);

export default App;