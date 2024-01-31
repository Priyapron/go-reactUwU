import React, { useState, useEffect } from "react";


const Student = ({ id }) => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log("id from form =" + id);
        const response = await fetch(`http://localhost:5000/students/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data = " + JSON.stringify(data));
        setStudent(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student: {error}</p>;
  if (!student) return <p>No student found for ID {id}</p>;

  return (
    <div>
      <h2>Student Details</h2>
      <p>
        <strong>ID:</strong> {student.id}
      </p>
      <p>
        <strong>First Name:</strong> {student.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {student.last_name}
      </p>
      <p>
        <strong>Age:</strong> {student.age}
      </p>
      <p>
        <strong>Grade:</strong> {student.grade}
      </p>
      {/* Render other student properties as needed */}
    </div>
  );
};

export default Student;
