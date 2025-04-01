import { Box, Button, Checkbox, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { green } from "@mui/material/colors";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newText, setNewText] = useState("");

  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodo = () => {
    setTodos([...todos, { text: newTodos, completed: false, id: Date.now() }]);
    setNewTodos("");
  };

  const deleteTodo = (id) => {
    const filter = todos.filter((e) => e.id !== id);
    setTodos(filter);
  };

  const handelEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewText(todo.text);
    handleOpen();
  };

  const handleChange = (event) => {
    setNewText(event.target.value);
    setDone(true)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo(null);
    setNewText("");
    handleClose();
  };

  const handleCheckChange = (id, checked) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    ));
  };

  const handelDeleteAll = () =>{
    setTodos([])
  }

  const handelDeleteDoneTask = () => {
   const deleteDone =  todos.filter((t) => t.completed === done)
    setTodos(deleteDone)
  }

  return (
    <Box marginX="10rem">
      <Typography variant="h2" align="center">
        TodoInput
      </Typography>
      <Box
        componente="section"
        sx={{
          border: 1,
          borderColor: "grey.500",
          p: "50px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="New Todo"
          value={newTodos}
          onChange={(e) => setNewTodos(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "darkcyan", p: "5px", fontSize: 20, fontWeight: "bold" }}
          onClick={addTodo}
        >
          Add New Task
        </Button>
      </Box>

      <Box component="section" marginY="2rem">
        <Typography variant="h4" align="center" fontWeight="600">
          TodoList
        </Typography>
      </Box>

      <Box component="section">
        {todos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              border: 1,
              borderColor: "grey.500",
              fontSize: 20,
              p: 2,
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {todo.completed ? (
              <Box component="p" sx={{ color: "darkred", textDecoration: "line-through" }}>
                {todo.text}
              </Box>
            ) : (
              <Box component="p">{todo.text}</Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Checkbox
                color="default"
                checked={todo.completed}
                onChange={(event) => handleCheckChange(todo.id, event.target.checked)}
                sx={{
                  color: green[400],
                }}
              />
              {isEditing && todo.id === currentTodo.id ? (
                <>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    <form onSubmit={handleSubmit}>
                      <TextField value={newText} onChange={handleChange} sx={{ bgcolor: "white" }} />
                      <Button type="submit" sx={{bgcolor:"white", py:2, ml:1}}>Save</Button>
                    </form>
                  </Modal>
                </>
              ) : (
                <Button onClick={() => handelEditClick(todo)}>
                  <EditIcon sx={{ color: "darkgoldenrod" }} />
                </Button>
              )}
              <Button onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </Button>
            </Box>         
          </Box>
        ))}
      </Box>
      {
            todos.length > 0 && (
              <Box component="section" sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <Button variant="contained" sx={{bgcolor:"red", width:"40%"}} onClick={handelDeleteDoneTask}>Delete Done Task</Button>
              <Button variant="contained" sx={{bgcolor:"red", width:"40%"}} onClick={handelDeleteAll}>Delete All Task</Button>
              </Box>
            )
          }
    </Box>
  );
};

export default App;