import { ISODateString } from './common';
import { IInfluencer } from './influencer';
import { IStory } from './stories';

export interface IEvent {
  id: React.Key;
  eventType: string[];
  title: string;
  description: string;
  startDate: ISODateString;
  endDate: ISODateString;
  recruitment_count: number;
  label: string;
  category: string;
  brand: string;
  createdAt: ISODateString;
  createdBy: string;
  memo: string;
  influencers: IInfluencer[];
  stories: IStory[];
}
