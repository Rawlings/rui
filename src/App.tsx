import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { EditorWorkspace } from './features/workspace'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<EditorWorkspace />} />
        <Route path="/editor" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App