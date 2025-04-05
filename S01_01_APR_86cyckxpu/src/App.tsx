import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";

const Container = styled(Paper)`
  width: 310px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  text-align: center;
`;

const StyledInput = styled(TextField)`
  width: 90%;
  margin-bottom: 15px;
  input {
    font-size: 24px;
    text-align: right;
    color: white;
    background-color: #34495e;
    border-radius: 8px;
    padding: 15px;
  }
`;

const StyledButton = styled(Button)<{ bgcolor?: string }>`
  && {
    font-size: 20px;
    padding: 15px;
    background-color: ${({ bgcolor }) => bgcolor || "#ecf0f1"};
    color: ${({ bgcolor }) => (bgcolor ? "white" : "black")};
    border-radius: 8px;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
    setError("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (/^[0-9+\-*/.%]$/.test(key)) {
      event.preventDefault();
      setInput((prev) => prev + key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Backspace") {
      event.preventDefault();
      handleBackspace();
    } else {
      event.preventDefault();
    }
  };

  const clearInput = () => {
    setInput("");
    setError("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      if (input.includes("/0")) {
        setError("Cannot divide by zero");
        return;
      }
      const result = eval(input);
      if (isNaN(result)) {
        setError("Invalid Calculation");
      } else {
        setInput(result.toString());
        setError("");
      }
    } catch {
      setError("Invalid Expression");
    }
  };

  const calculateSquareRoot = () => {
    try {
      const number = parseFloat(input);
      if (isNaN(number)) {
        setError("Enter a valid number");
        return;
      }
      if (number < 0) {
        setError("Cannot calculate square root of a negative number");
        return;
      }
      setInput(Math.sqrt(number).toString());
      setError("");
    } catch {
      setError("Error calculating square root");
    }
  };

  return (
    <Container theme={theme} elevation={10}>
      <StyledInput
        variant="outlined"
        value={input}
        onChange={(e) =>
          setInput(e.target.value.replace(/[^0-9+\-*/.%]/g, ""))
        }
        onKeyDown={handleKeyPress}
      />
      {error && (
        <Typography color="error" sx={{ marginBottom: "10px" }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={1}>
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "%", "+"].map(
          (char) => (
            <Grid item xs={3} key={char}>
              <StyledButton onClick={() => handleClick(char)} fullWidth>
                {char}
              </StyledButton>
            </Grid>
          )
        )}
        <Grid item xs={3}>
          <StyledButton onClick={calculateSquareRoot} fullWidth>
            √
          </StyledButton>
        </Grid>
        <Grid item xs={3}>
          <StyledButton onClick={handleBackspace} bgcolor="#f39c12" fullWidth>
            ⌫
          </StyledButton>
        </Grid>
        <Grid item xs={3}>
          <StyledButton onClick={calculateResult} bgcolor="#2ecc71" fullWidth>
            =
          </StyledButton>
        </Grid>
        <Grid item xs={12}>
          <StyledButton onClick={clearInput} bgcolor="red" fullWidth>
            Clear
          </StyledButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculator;
