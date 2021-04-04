const Course = ({ course }) => {

  const partMap = (part => {
    return <p key={part.id}>{part?.name} {part.exercises}</p>
  })

  return (
    <div>
      <h1>{course?.name}</h1>
      {course?.parts?.map(partMap)}
      <strong>total of {course.parts.reduce((s, p) => s + (p.exercises || 0), 0)} exercises</strong>
    </div>
  )
}

export default Course