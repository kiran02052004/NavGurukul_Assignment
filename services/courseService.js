const COURSES = [
  { id: 1, name: "HTML Basics" },
  { id: 2, name: "CSS Mastery" },
  { id: 3, name: "JavaScript Pro" },
  { id: 4, name: "React In Depth" },
  { id: 5, name: "Advanced TypeScript" },
  { id: 6, name: "UI/UX Design Fundamentals" }
];

/**
 * Fetches a list of available courses after a simulated network delay.
 * @returns A promise that resolves to an array of courses.
 */
export const fetchCourses = async () => {
  console.log("Fetching courses...");

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Courses fetched successfully.");
      resolve(COURSES);
    }, 1000); // Simulate 1-second network delay
  });
};
