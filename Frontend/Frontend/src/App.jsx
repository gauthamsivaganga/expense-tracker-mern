import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  IconButton,
  Box
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function App() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {

    if (!title || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/expenses", {
      title,
      amount,
      date
    });

    setTitle("");
    setAmount("");
    setDate("");

    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
return (

  <Box
    sx={{
      minHeight: "100vh",
      background:"linear-gradient(135deg,#5f9cff,#9b5de5,#f15bb5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >

    <Container maxWidth="sm">

      <Card
  sx={{
    padding: 4,
    borderRadius: 4,
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.9)"
  }}
>

        <Typography variant="h4" align="center" gutterBottom>
          Expense Tracker
        </Typography>

        <Typography variant="h6" align="center">
          Total Expense: ₹{total}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={3}>

          <TextField
            label="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />

          <TextField
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={addExpense}
          >
            Add Expense
          </Button>

        </Box>

        <List sx={{ mt: 3 }}>

          {expenses.map((e)=>(
            <ListItem
              key={e.id}
              secondaryAction={
                <IconButton onClick={()=>deleteExpense(e.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              {e.title} - ₹{e.amount} - {e.date}
            </ListItem>
          ))}

        </List>

      </Card>

    </Container>

  </Box>

)
}
export default App;