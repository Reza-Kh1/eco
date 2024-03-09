import XLSX from 'xlsx';
const workbook = XLSX.readFile('./F100.xlsx', { encoding: 'utf-8' });


const sheet_name_list = workbook.SheetNames;
const sheet = workbook.Sheets[sheet_name_list[0]];

// Convert the sheet to an array of objects
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Extract column headers from the first row
const headers = data[0];

// Remove the first row (header row) from the data array
data.shift();

// Convert the data to an array of objects
const formattedData = data.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
        obj[header] = row[index];
    });
    return obj;
});

console.log(formattedData);
