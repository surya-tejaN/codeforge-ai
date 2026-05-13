import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CourseCatalog from './course-catalog/CourseCatalog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CourseCatalog />
  </StrictMode>,
)
