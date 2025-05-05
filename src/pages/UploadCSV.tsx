import { useEffect, useState } from 'react';
import { csvParse } from '../utilities/papa';
import LogoutButton from '../components/LogoutButton';

function UploadCSV({ userId }) {
  const [formData, setFormData] = useState({
    json: '',
    title: '',
    userId: userId,
  });

  const [csvData, setCsvData] = useState('');

  const getData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/');

      const body = await response.json();

      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

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
      setCsvData(csv);
    };

    fileReader.readAsText(file);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const parsedJSON = csvParse(csvData);
    console.log(parsedJSON);

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: JSON.stringify(parsedJSON.data),
        headers: { 'Content-Type': 'application/json' },
      });

      const body = await response.json();

      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button>Submit</button>
      </form>
      <LogoutButton />
    </div>
  );
}

export default UploadCSV;
