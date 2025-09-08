import React, { useState, useEffect, useRef } from 'react';

const StudentForm = ({ studentToEdit, courses, onSave, onCancel, isProcessing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseId: 0, // Use 0 to indicate "not selected"
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const blobUrlRef = useRef(null);

  // Effect to clean up the blob URL when the component unmounts
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Revoke any existing temporary URL when context changes
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        email: studentToEdit.email,
        courseId: studentToEdit.courseId,
        imageUrl: studentToEdit.imageUrl,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        courseId: 0,
        imageUrl: '',
      });
    }
    setErrors({});
  }, [studentToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }
    if (!formData.courseId || formData.courseId === 0) newErrors.courseId = 'Please select a course.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalStudentData = {
        name: formData.name,
        email: formData.email,
        courseId: Number(formData.courseId),
        imageUrl:
          formData.imageUrl ||
          `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`,
      };

      if (studentToEdit) {
        onSave({ ...studentToEdit, ...finalStudentData });
      } else {
        onSave(finalStudentData);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      const newBlobUrl = URL.createObjectURL(file);
      blobUrlRef.current = newBlobUrl;
      setFormData((prev) => ({ ...prev, imageUrl: newBlobUrl }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image</label>
          <div className="mt-1 flex items-center space-x-4">
            <img
              src={
                formData.imageUrl ||
                `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`
              }
              alt="Profile Preview"
              className="h-20 w-20 rounded-full object-cover bg-gray-200 dark:bg-gray-600"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Change Image
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Course
          </label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
            aria-required="true"
            aria-invalid={!!errors.courseId}
            aria-describedby={errors.courseId ? 'course-error' : undefined}
          >
            <option value={0} disabled>
              Select a course...
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <p id="course-error" className="text-red-500 text-xs mt-1" role="alert">
              {errors.courseId}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing && (
              <svg
                aria-hidden="true"
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isProcessing ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
