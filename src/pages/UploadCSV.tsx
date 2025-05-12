import { useEffect, useState } from 'react';
import { csvParse } from '../utilities/papa';
import LogoutButton from '../components/LogoutButton';

type Props = { userId?: string };

const UploadCSV: React.FC<Props> = ({ userId }) => {
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

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      const body = await response.json();

      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} />
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button>Submit</button>
      </form>
      <LogoutButton />
    </div>
  );
};

export default UploadCSV;
