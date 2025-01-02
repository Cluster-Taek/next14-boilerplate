import { ISODateString } from './common';

export type InfluencerType = 'INFLUENCER' | 'CELEBRITY';
export type Gender = 'M' | 'F';

export interface IInfluencer {
  id: React.Key;
  snsId: string;
  name: string;
  type: InfluencerType;
  category: string;
  gender: Gender;
  followers: number;
  birthDate: ISODateString;
  project: string;
  memo: string;
  amount: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  createdBy: React.Key;
}
