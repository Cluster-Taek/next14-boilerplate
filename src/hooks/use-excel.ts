import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';

interface IGetSheetProps {
  // eslint-disable-next-line
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
      dataRow.eachCell((cell) => {
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

  const sheetToJSON = async (file: File) => {
    const wb = new Excel.Workbook();
    const reader = new FileReader();

    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        if (!data) {
          reject(new Error('Failed to read file'));
          return;
        }
        wb.xlsx.load(data).then(() => {
          const sheet = wb.getWorksheet(1);
          if (!sheet) {
            reject(new Error('Failed to load sheet'));
            return;
          }
          const rows = sheet.getSheetValues();
          const headers = rows[1];
          const headerLength = headers?.length ?? 0;
          if (!headers) return reject(new Error('Failed to load headers'));
          const result = rows.slice(2).map((row) => {
            // eslint-disable-next-line
            const obj = {} as any;
            for (let i = 2; i < (headerLength as unknown as number); i++) {
              // @ts-expect-error: 타입 이슈로 인해 상단에서 검증
              const key = headers.at(i) as string;
              // @ts-expect-error: 타입 이슈로 인해 상단에서 검증
              obj[key] = row[i];
            }
            return obj;
          });

          resolve(result);
        });
      };
      reader.onerror = reject;
    });

    reader.readAsArrayBuffer(file);
    return promise;
  };

  return {
    sheetToJSON,
    getSheet,
  };
};
export default useExcel;
