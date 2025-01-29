import React, { useState, useContext } from "react";
import { Button, Radio, Checkbox, Card, FormControlLabel } from "@mui/material";
import { QuestionContext } from "../context/questionContext";
import Swal from "sweetalert2";

const StudentDashboard = () => {
  const { studentQues,submit_answer } = useContext(QuestionContext);

  console.log("studentQues", studentQues);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectAnswer = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId, // Store selected choice ID
    });
  };

  const handleMultiSelectAnswer = (questionId, choiceId) => {
    setSelectedAnswers(prev => {
      const updatedAnswers = prev[questionId] ? [...prev[questionId]] : [];
      if (updatedAnswers.includes(choiceId)) {
        return { ...prev, [questionId]: updatedAnswers.filter(ans => ans !== choiceId) };
      } else {
        return { ...prev, [questionId]: [...updatedAnswers, choiceId] };
      }
    });
  };

  const handleSubmitAnswer = () => {
    Swal.fire({
      title: "Submit Answer?",
      text: "You cannot change this later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit!",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentQuestionIndex < studentQues.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          console.log("Final Answers:", selectedAnswers);
          Swal.fire("Quiz Completed!", "Thank you for taking the test!", "success");
        }
      }
    });
  };

  if (!studentQues.length) return <p>Loading questions...</p>;

  const currentQuestion = studentQues[currentQuestionIndex];

  return (
    <Card sx={{ padding: 3, maxWidth: 600, margin: "auto", marginTop: 4 }}>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.questionText}</p>

      {currentQuestion.type === "single"
        ? currentQuestion.choices.map((choice) => (
            <FormControlLabel
              key={choice._id}
              control={
                <Radio
                  checked={selectedAnswers[currentQuestion._id] === choice._id}
                  onChange={() => handleSelectAnswer(currentQuestion._id, choice._id)}
                />
              }
              label={choice.text}
            />
          ))
        : currentQuestion.choices.map((choice) => (
            <FormControlLabel
              key={choice._id}
              control={
                <Checkbox
                  checked={selectedAnswers[currentQuestion._id]?.includes(choice._id) || false}
                  onChange={() => handleMultiSelectAnswer(currentQuestion._id, choice._id)}
                />
              }
              label={choice.text}
            />
          ))}

      <Button variant="contained" color="primary" onClick={handleSubmitAnswer}>
        {currentQuestionIndex < studentQues.length - 1 ? "Next" : "Finish"}
      </Button>
    </Card>
  );
};

export default StudentDashboard;
