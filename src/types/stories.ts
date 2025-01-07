import { ISODateString } from './common';

export interface IStory {
  id: React.Key;
  title: string;
  thumbnail?: string;
  url: string;
  createdAt: ISODateString;
  createdBy: string;
}
