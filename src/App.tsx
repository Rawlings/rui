import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { EditorWorkspace } from './features/workspace'
import { WelcomePage } from './pages/WelcomePage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/editor" element={<EditorWorkspace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App