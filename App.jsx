import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Modal from './components/Modal';
import StudentForm from './components/StudentForm';
import Spinner from './components/Spinner';
import SortControls from './components/SortControls';
import ConfirmationModal from './components/ConfirmationModal';
import { useCourses } from './hooks/useCourses';
import { useStudents } from './hooks/useStudents';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, toggleTheme] = useTheme();
  const { courses, isLoading: coursesLoading, error: coursesError } = useCourses();
  const { students, isProcessing, addStudent, updateStudent, deleteStudent, deleteMultipleStudents } = useStudents();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentsToDelete, setStudentsToDelete] = useState(new Set());

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState(new Set());

  const handleAddStudentClick = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };
  
  const handleEditStudent = useCallback((student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingStudent(null);
  };

  const handleSaveStudent = async (studentData) => {
    if ('studentId' in studentData) {
      await updateStudent(studentData);
    } else {
      await addStudent(studentData);
    }
    handleCloseFormModal();
  };
  
  const handleDeleteStudentClick = useCallback((student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  }, []);
  
  const handleBulkDeleteClick = useCallback(() => {
    setStudentsToDelete(new Set(selectedStudentIds));
    setIsDeleteModalOpen(true);
  }, [selectedStudentIds]);

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
    setStudentsToDelete(new Set());
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete.studentId);
    } else if (studentsToDelete.size > 0) {
      await deleteMultipleStudents(studentsToDelete);
      setSelectedStudentIds(new Set());
    }
    handleCancelDelete();
  };

  const handleSortChange = useCallback((newConfig) => {
    setSortConfig(prevConfig => ({ ...prevConfig, ...newConfig }));
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  
  const handleToggleSelection = useCallback((studentId) => {
    setSelectedStudentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  }, []);

  const filteredAndSortedStudents = useMemo(() => {
    const courseMap = new Map(courses.map(c => [c.id, c.name]));
    
    const filtered = students.filter(s => {
        const courseName = courseMap.get(s.courseId)?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        return s.name.toLowerCase().includes(query) ||
               s.email.toLowerCase().includes(query) ||
               courseName.includes(query);
    });

    return [...filtered].sort((a, b) => {
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      const valueA = sortConfig.key === 'name' ? a.name : courseMap.get(a.courseId) || '';
      const valueB = sortConfig.key === 'name' ? b.name : courseMap.get(b.courseId) || '';
      return valueA.localeCompare(valueB) * direction;
    });
  }, [students, courses, sortConfig, searchQuery]);

  const handleSelectAll = useCallback(() => {
    if (selectedStudentIds.size === filteredAndSortedStudents.length) {
      setSelectedStudentIds(new Set());
    } else {
      setSelectedStudentIds(new Set(filteredAndSortedStudents.map(s => s.studentId)));
    }
  }, [selectedStudentIds.size, filteredAndSortedStudents]);

  const isAllVisibleSelected = selectedStudentIds.size > 0 && selectedStudentIds.size === filteredAndSortedStudents.length;

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <Header
        onAddStudent={handleAddStudentClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {coursesLoading ? (
          <div className="pt-20">
            <Spinner />
          </div>
        ) : coursesError ? (
          <div className="text-center text-red-500 bg-red-100 dark:bg-red-900 p-4 rounded-lg">
            {coursesError}
          </div>
        ) : (
          <>
            <SortControls
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              numSelected={selectedStudentIds.size}
              onSelectAll={handleSelectAll}
              isAllSelected={isAllVisibleSelected}
              onBulkDelete={handleBulkDeleteClick}
            />
            <StudentList
              students={filteredAndSortedStudents}
              courses={courses}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudentClick}
              selectedStudentIds={selectedStudentIds}
              onToggleSelection={handleToggleSelection}
              isSearchActive={searchQuery.length > 0}
            />
          </>
        )}
      </main>
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          studentToEdit={editingStudent}
          courses={courses}
          onSave={handleSaveStudent}
          onCancel={handleCloseFormModal}
          isProcessing={isProcessing}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        isProcessing={isProcessing}
      >
        {studentToDelete
          ? `Are you sure you want to delete the student "${studentToDelete?.name}"? This action cannot be undone.`
          : `Are you sure you want to delete the ${studentsToDelete.size} selected students? This action cannot be undone.`}
      </ConfirmationModal>
    </div>
  );
}

export default App;
