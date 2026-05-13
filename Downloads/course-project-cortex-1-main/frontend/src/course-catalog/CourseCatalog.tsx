import { useMemo, useState } from 'react'
import { courseCatalog } from './courses'
import './courseCatalog.css'

function CourseCatalog() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All')
  const [level, setLevel] = useState('All')

  const filteredCatalog = useMemo(() => {
    const query = search.trim().toLowerCase()

    return courseCatalog
      .filter((group) => subject === 'All' || group.subject === subject)
      .map((group) => {
        const courses = group.courses.filter((course) => {
          const matchesSearch =
            course.code.toLowerCase().includes(query) ||
            course.title.toLowerCase().includes(query) ||
            group.name.toLowerCase().includes(query)

          const matchesLevel = level === 'All' || course.level === level

          return matchesSearch && matchesLevel
        })

        return { ...group, courses }
      })
      .filter((group) => group.courses.length > 0)
  }, [search, subject, level])

  const totalCourses = courseCatalog.reduce((total, group) => total + group.courses.length, 0)
  const visibleCourses = filteredCatalog.reduce((total, group) => total + group.courses.length, 0)

  function clearFilters() {
    setSearch('')
    setSubject('All')
    setLevel('All')
  }

  return (
    <main className="catalog-page">
      <section className="catalog-header">
        <div>
          <p className="catalog-label">Cortex</p>
          <h1>Course Catalog</h1>
          <p>
            Browse DePaul courses by subject so students can find study rooms connected to their classes.
          </p>
        </div>

        <div className="catalog-stat">
          <strong>{totalCourses}</strong>
          <span>sample courses</span>
        </div>
      </section>

      <section className="catalog-controls">
        <input
          type="search"
          placeholder="Search by course code, title, or subject..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={subject} onChange={(event) => setSubject(event.target.value)}>
          <option value="All">All Subjects</option>
          {courseCatalog.map((group) => (
            <option key={group.subject} value={group.subject}>
              {group.subject} - {group.name}
            </option>
          ))}
        </select>

        <select value={level} onChange={(event) => setLevel(event.target.value)}>
          <option value="All">All Levels</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
        </select>

        <button type="button" onClick={clearFilters}>
          Clear
        </button>
      </section>

      <p className="catalog-results">
        Showing <strong>{visibleCourses}</strong> courses across <strong>{filteredCatalog.length}</strong> subjects
      </p>

      <section className="subject-grid">
        {filteredCatalog.map((group) => (
          <article className="subject-card" key={group.subject}>
            <div className="subject-card-header">
              <div>
                <span>{group.subject}</span>
                <h2>{group.name}</h2>
              </div>
              <p>{group.courses.length} courses</p>
            </div>

            <p className="subject-description">{group.description}</p>

            <div className="course-list">
              {group.courses.map((course) => (
                <div className="course-item" key={course.code}>
                  <div>
                    <strong>{course.code}</strong>
                    <p>{course.title}</p>
                  </div>
                  <small>{course.level}</small>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      {filteredCatalog.length === 0 && (
        <section className="empty-state">
          <h2>No courses found</h2>
          <p>Try changing your filters or search term.</p>
          <button type="button" onClick={clearFilters}>
            Reset filters
          </button>
        </section>
      )}
    </main>
  )
}

export default CourseCatalog
