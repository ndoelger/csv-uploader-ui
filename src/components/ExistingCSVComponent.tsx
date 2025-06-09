import { useState } from 'react';

import { Modal, Box, TableCell } from '@mui/material';

import { csvParse } from '../utilities/papa';

type Props = { title?: string; userId?: string };

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

const ExistingCSVComponent: React.FC<Props> = ({ title, userId }) => {
  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState({
    oldTitle: title?.split('.')[0],
    newTitle: title?.split('.')[0],
    newJson: '',
    userId: userId,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...editData, [evt.target.name]: evt.target.value };
    setEditData(newData);
  };

  const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const file = evt.target.files?.[0];

    if (!file) {
      console.log('no file submitted');
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = ({ target }) => {
      if (!target?.result) return;

      const newCsv = target.result as string;

      const parsedJSON = csvParse(newCsv);

      setEditData({ ...editData, newJson: JSON.stringify(parsedJSON.data) });
    };

    fileReader.readAsText(file);
  };

  const handleSubmit = async (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // CONVERSION TO SNAKE_CASE
    const payload = {
      new_json: editData.newJson,
      old_title: editData.oldTitle,
      new_title: editData.newTitle,
      user_id: editData.userId,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const body = await response.json();

      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableCell>
        <div>{title}</div>
      </TableCell>
      <TableCell align="right">
        <button onClick={handleOpen}>Edit</button>
      </TableCell>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="newTitle"
              value={editData.newTitle}
              onChange={handleChange}
            ></input>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
            ></input>
            <button>Update</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ExistingCSVComponent;
