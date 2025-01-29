import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { QuestionContext } from "../../context/questionContext";
import Swal from "sweetalert2";


const QuestionList = () => {
  const { update_question, delete_question, questions } = useContext(QuestionContext);
  
  // State for editing a question
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  
  const handleEdit = (question) => {
    setEditQuestion(question);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editQuestion) {
      update_question(editQuestion._id, editQuestion);
      setOpenEditDialog(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
        title:"Do you need to Delete this Question?",
        text:"Cannot revert this later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:"primary",
        cancelButtonColor:"danger",
        confirmButtonText:"Yes, Delete it!",
        cancelButtonText:"No, Cancel it!",
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
      }).then((result)=>result.isConfirmed && delete_question(id));
    
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Choices</TableCell>
            <TableCell>Correct Answer(s)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, index) => (
            <TableRow key={index}>
              <TableCell>{question._id}</TableCell>
              <TableCell>{question.questionText}</TableCell>
              <TableCell>{question.choices.map(choice => choice.text).join(", ")}</TableCell>
              <TableCell>{question.choices.filter(choice => choice.isCorrect).map(choice => choice.text).join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(question)} color="primary">Edit</Button>
                <Button onClick={() => handleDelete(question._id)} color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          {editQuestion && (
            <>
              <TextField
                label="Question Text"
                fullWidth
                value={editQuestion.questionText}
                onChange={(e) =>
                  setEditQuestion({ ...editQuestion, questionText: e.target.value })
                }
                margin="dense"
              />
              {editQuestion.choices.map((choice, index) => (
                <TextField
                  key={index}
                  label={`Choice ${index + 1}`}
                  fullWidth
                  value={choice.text}
                  onChange={(e) => {
                    const updatedChoices = [...editQuestion.choices];
                    updatedChoices[index].text = e.target.value;
                    setEditQuestion({ ...editQuestion, choices: updatedChoices });
                  }}
                  margin="dense"
                />
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default QuestionList;
