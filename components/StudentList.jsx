import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ 
  students, 
  courses, 
  onEditStudent, 
  onDeleteStudent, 
  selectedStudentIds, 
  onToggleSelection, 
  isSearchActive 
}) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">
          {isSearchActive 
            ? "No students match your search." 
            : "No students found. Add one to get started!"}
        </p>
      </div>
    );
  }

  // Quick lookup map for courses
  const courseMap = new Map(courses.map(c => [c.id, c.name]));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
      {students.map(student => (
        <StudentCard
          key={student.studentId}
          student={student}
          courseName={courseMap.get(student.courseId) || 'Unknown Course'}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
          isSelected={selectedStudentIds.has(student.studentId)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </div>
  );
};

export default StudentList;
