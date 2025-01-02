import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';

interface IGetSheetProps {
  data: Object[];
  fileName?: string;
  sheetName?: string;
  headers?: string[];
  rowWidth?: number | number[];
}

const useExcel = () => {
  const getSheet = async ({
    data = [],
    fileName = 'Sheet.xlsx',
    sheetName = 'SheetJS',
    headers,
    rowWidth,
  }: IGetSheetProps) => {
    const wb = new Excel.Workbook();
    const sheet = wb.addWorksheet(sheetName);

    // 헤더 생성
    const headerRow = sheet.addRow(headers ?? Object.keys(data[0]));
    headerRow.height = 25;
    headerRow.eachCell((cell, colNum) => {
      cell.font = { bold: true, size: 14 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEEEEEE' },
      };
      if (typeof rowWidth === 'number') {
        sheet.getColumn(colNum).width = rowWidth ?? 20;
      } else if (Array.isArray(rowWidth)) {
        sheet.getColumn(colNum).width = rowWidth[colNum - 1] ?? 20;
      }
    });

    // 데이터 생성
    data.forEach((row) => {
      const dataRow = sheet.addRow(Object.values(row));
      dataRow.height = 20;
      dataRow.eachCell((cell, colNum) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { size: 12 };
      });
    });

    // 파일 암호화
    // 파일 생성
    const fileData = await wb.xlsx.writeBuffer();
    const blob = new Blob([fileData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  };

  return {
    getSheet,
  };
};
export default useExcel;
