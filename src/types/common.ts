export type ISODateString = string;

export interface IFile {
  id: React.Key;
  title: string;
  thumbnail?: string;
  url: string;
  createdAt: ISODateString;
  createdBy: string;
}
