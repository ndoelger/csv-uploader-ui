import { useState } from 'react';
import { csvParse } from '../utilities/papa';
import { TextField } from '@mui/material';

type Props = { userId?: string; getData?: () => Promise<void> };

const UploadCSV: React.FC<Props> = ({ userId, getData }) => {
  const [formData, setFormData] = useState({
    json: '',
    title: '',
    userId: userId,
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newData);
  };

  const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    console.log(evt.target.files?.[0]);

    const file = evt.target.files?.[0];
    if (!file) {
      console.log('no file submitted');
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = ({ target }) => {
      console.log('running fileReader');
      if (!target?.result) return;
      console.log(target.result);
      const csv = target.result as string;
      console.log(csv);

      const parsedJSON = csvParse(csv);

      setFormData({ ...formData, json: JSON.stringify(parsedJSON.data) });
    };

    fileReader.readAsText(file);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(JSON.stringify(formData));

    const payload = {
      json: formData.json,
      title: formData.title,
      user_id: formData.userId,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const body = await response.json();

      console.log(body);
      getData?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          justifyContent: 'center',
          paddingBottom: '10px',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          onChange={handleChange}
          style={{ width: '100%', background: "white" }}
        />
        <input
          style={{ display: 'inline-block' }}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UploadCSV;
