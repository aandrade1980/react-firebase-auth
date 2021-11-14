import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Components
import Button from './Button';

export default function BasicTextFields({
  handleAction,
  setEmail,
  setPassword,
  title
}) {
  return (
    <div>
      <div className="heading-container">
        <h3>{title} Form</h3>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Box>

      <Button title={title} handleAction={handleAction} />
    </div>
  );
}
