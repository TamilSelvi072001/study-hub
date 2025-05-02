import React, { useState } from "react";
import { Alert, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PeopleProps {
  onSubmit: (count: number) => void;
  onClose: () => void;
}

const People: React.FC<PeopleProps> = ({ onSubmit, onClose }) => {
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (count < 1 || count > 10) {
      setError("Please enter a number between 1 and 10.");
      return;
    }
    setError("");
    onSubmit(count);
    navigate("/hub"); // Navigate to the Hub page
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">
        How many people are visiting this hub?
      </h2>

      <TextField
        label="Number of People"
        type="number"
        fullWidth
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        inputProps={{ min: 1, max: 10 }}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#0c2045",
          color: "white",
          "&:hover": {
            backgroundColor: "#102d5c",
          },
          marginRight: "20px",
        }}
      >
        Confirm
      </Button>

      <Button
        onClick={onClose}
        sx={{
          color: "#0c2045",
          border: "1px solid #0c2045",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default People;
