export const fetchCourses = async () => {
  console.log("Fetching courses from API...");

  try {
    const response = await fetch(
      "https://68bd57f3227c48698f844908.mockapi.io/courses"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = await response.json();
    console.log("Courses fetched successfully.");
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    return []; 
  }
};
