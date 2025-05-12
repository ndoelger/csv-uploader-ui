import { useState, useEffect } from 'react';
import ExistingCSVComponent from '../components/ExistingCSVComponent';

type Props = { userId?: string };

const ExistingCSV: React.FC<Props> = ({ userId }) => {
  const [csvData, setCsvData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/${userId}`);

      const body = await response.json();

      setCsvData(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {csvData.map((entry: string) => {
        const textToSlice = `${userId}/`;
        return (
          <ExistingCSVComponent
            title={entry.slice(entry.indexOf(textToSlice) + textToSlice.length)}
          />
        );
      })}
    </div>
  );
};

export default ExistingCSV;
