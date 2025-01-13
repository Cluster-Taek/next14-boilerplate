export type InfluencerType = 'INFLUENCER' | 'CELEBRITY';
export type Gender = 'M' | 'F';

export interface IInfluencer {
  id: React.Key;
  region?: string;
  ageGroup?: string;
  projectType?: string;
  category?: string;
  target?: string;
  gender?: Gender;
  profession?: string;
  channelName?: string;
  snsUrl?: string;
  followerCount?: number;
  blogUrl?: string;
  dailyVisitorCount?: number;
  postingCost?: number;
  contact?: string;
  type: InfluencerType;
}
