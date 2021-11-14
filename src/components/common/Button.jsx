import Button from '@mui/material/Button';

export default function BasicButtons({ handleAction, title }) {
  return (
    <Button variant="contained" onClick={handleAction}>
      {title}
    </Button>
  );
}
