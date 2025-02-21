import { Navigate } from 'react-router-dom';

interface ProtectedRoute extends React.PropsWithChildren {
  isAllowed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ isAllowed, children }) => {
  if (isAllowed) {
    return <Navigate to={'login'} />;
  }

  return children;
};

export default ProtectedRoute;
