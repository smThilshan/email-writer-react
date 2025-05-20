import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Paper,
} from "@mui/material";

const tones = ["Formal", "Informal", "Friendly", "Professional"];

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateReply = async () => {
    setLoading(true);
    setError("");
    setGeneratedReply("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      // setGeneratedReply(response.data.reply);
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to generate reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Email Reply Generator
      </Typography>

      <Typography variant="body1" gutterBottom>
        Enter the email content and select the tone for the reply.
      </Typography>

      <TextField
        label="Email Content"
        multiline
        rows={6}
        fullWidth
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Tone"
        select
        fullWidth
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        margin="normal"
      >
        {tones.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleGenerateReply}
        disabled={!emailContent.trim() || loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Generate Reply"}
      </Button>

      {error && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Paper
          style={{
            padding: "20px",
            marginTop: "30px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">Generated Reply:</Typography>
          <Typography
            variant="body1"
            style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}
          >
            {generatedReply}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            style={{ marginTop: "10px" }}
            onClick={() => {
              navigator.clipboard.writeText(generatedReply);
            }}
          >
            Copy to Clipboard
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default App;
