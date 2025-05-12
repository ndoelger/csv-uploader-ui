import { useState } from 'react';
import { Modal, Box } from '@mui/material';

type Props = { title?: string };

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ExistingCSVComponent: React.FC<Props> = ({ title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>{title}</div>
      <button onClick={handleOpen}>Edit Button</button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form action="">
            <input type="text" name="title" value={title?.split(".")[0]}></input>
            <input type="file" accept=".csv"></input>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ExistingCSVComponent;
