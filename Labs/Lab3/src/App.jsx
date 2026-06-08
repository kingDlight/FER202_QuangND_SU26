import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AppNavbar from './components/AppNavbar'
import ChangePasswordPage from './pages/ChangePasswordPage'
import UserListPage from './pages/UserListPage'

function App() {
  const { state } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div>
      {state.isAuthenticated && <AppNavbar onNavigate={setCurrentPage} />}
      <div className="container mt-4">
        {!state.isAuthenticated ? (
          <LoginPage />
        ) : currentPage === 'users' ? (
          <UserListPage onBack={() => setCurrentPage('dashboard')} />
        ) : currentPage === 'change-password' ? (
          <ChangePasswordPage onBack={() => setCurrentPage('dashboard')} />
        ) : (
          <DashboardPage />
        )}
      </div>
    </div>
  )
}

export default App
