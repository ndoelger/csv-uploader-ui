import Papa, { ParseResult } from 'papaparse';

export const csvParse = (file: string): ParseResult<unknown> => {
  const json = Papa.parse(file, {
    dynamicTyping: true,
    skipEmptyLines: true,
    header: true,
  });

  console.log(json)

  return json;
};
