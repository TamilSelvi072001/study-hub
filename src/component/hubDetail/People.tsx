import React, { useState } from "react";
import { Alert, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HubService } from "../../apiService/HubService";
import { format } from "date-fns";
import { useStudyHubContext } from "../Context/StudyHubContext";

interface PeopleProps {
  onSubmit: (count: number) => void;
  onClose: () => void;
  availableSeats: number;
  hubId: number;
}

const People: React.FC<PeopleProps> = ({
  hubId,
  onSubmit,
  onClose,
  availableSeats,
}) => {
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTableDetails } = useStudyHubContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const tableData = await HubService(hubId, today);
      setTableDetails(tableData);

      onSubmit(count);
      navigate("/hub", {
        state: { hubId, tableData, numberOfPersons: count, date: today },
      });
    } catch (error) {
      console.error("Failed to fetch hub details:", error);
      setError("Unable to fetch tables. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white" />
      </div>
    );
  }

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
        inputProps={{ min: 1, max: availableSeats }}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex justify-end space-x-4">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#0c2045",
            color: "white",
            "&:hover": {
              backgroundColor: "#102d5c",
            },
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
    </div>
  );
};

export default People;
