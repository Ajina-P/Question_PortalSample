import React, { useContext, useState } from 'react';
import { Button, TextField, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Box, Grid } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { QuestionContext } from '../context/questionContext';

const CreateQuestionForm = () => {
  const { create_question } = useContext(QuestionContext);

  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [type, setType] = useState("single");

  const handleChangeChoice = (index, event) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswer = (event) => {
    const value = event.target.value;

    if (type === "single") {
      setCorrectAnswer([value]); // Allow only one selected answer
    } else {
      setCorrectAnswer((prevCorrectAnswers) =>
        prevCorrectAnswers.includes(value)
          ? prevCorrectAnswers.filter((answer) => answer !== value)
          : [...prevCorrectAnswers, value]
      );
    }
  };

  const handleSubmit = () => {
    const formattedCorrectAnswers = correctAnswer.map((answer) =>
      answer.toString()
    ); // Convert indices to strings

    const questionData = {
      questionText,
      choices, // Array of strings
      correctAnswer: formattedCorrectAnswers, // Array of correct indices as strings
      type,
    };

    create_question(questionData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Question Text"
            fullWidth
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            multiline
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Question Type</FormLabel>
            <RadioGroup
              row
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCorrectAnswer([]); // Reset correctAnswer when type changes
              }}
            >
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="Single Choice"
              />
              <FormControlLabel
                value="multiple"
                control={<Radio />}
                label="Multiple Choice"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {choices.map((choice, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <TextField
              label={`Choice ${index + 1}`}
              fullWidth
              value={choice}
              onChange={(e) => handleChangeChoice(index, e)}
              required
            />
            {type === "single" ? (
              // For SINGLE CHOICE: Use radio buttons
              <FormControlLabel
                control={<Radio />}
                label="Correct Answer"
                value={index.toString()}
                checked={correctAnswer.includes(index.toString())}
                onChange={handleCorrectAnswer}
              />
            ) : (
              // For MULTIPLE CHOICE: Use checkboxes
              <FormControlLabel
                control={<Checkbox />}
                label="Correct Answer"
                value={index.toString()}
                checked={correctAnswer.includes(index.toString())}
                onChange={handleCorrectAnswer}
              />
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            startIcon={<AddCircle />}
          >
            Add Question
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateQuestionForm;
