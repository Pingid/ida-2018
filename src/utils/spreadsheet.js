import gsjson from 'google-spreadsheet-to-json';

const spreadsheetID = '1O0w-7e63K_V4ho8jcbL4JlnaFCV_BIBMQWI7XlAC0ck';

export const getSheet = n => gsjson({ spreadsheetId: spreadsheetID });
