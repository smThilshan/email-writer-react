import { useState } from 'react';
import './App.css';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Paper
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReply = () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');

    // Simulate API call
    setTimeout(() => {
      if (!emailContent || !tone) {
        setError('Please enter email content and select a tone.');
      } else {
        setGeneratedReply(`(Mock Reply in "${tone}" tone)\n\nThank you for your email. I'll get back to you shortly.`);
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '15px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          ✉️ Email Reply Generator
        </Typography>

        <Typography variant="body1" gutterBottom>
          Enter the email content and choose a tone for your AI-generated reply.
        </Typography>

        <TextField
          label="Email Content"
          multiline
          rows={6}
          fullWidth
          margin="normal"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <Select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>Select Tone</MenuItem>
          <MenuItem value="Formal">Formal</MenuItem>
          <MenuItem value="Friendly">Friendly</MenuItem>
          <MenuItem value="Apologetic">Apologetic</MenuItem>
          <MenuItem value="Professional">Professional</MenuItem>
        </Select>

        <Box textAlign="center" marginTop={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReply}
            disabled={loading}
            size="large"
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" align="center" marginTop={2}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box marginTop={4}>
            <Typography variant="h6">Generated Reply:</Typography>
            <Paper elevation={1} style={{ padding: '15px', whiteSpace: 'pre-wrap' }}>
              {generatedReply}
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
