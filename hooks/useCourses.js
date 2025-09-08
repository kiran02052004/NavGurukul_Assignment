import { useState, useEffect } from 'react';
import { fetchCourses } from '../services/courseService';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const getCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount.

  return { courses, isLoading, error };
};
