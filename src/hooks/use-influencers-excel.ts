import useExcel from './use-excel';
import { INFLUENCER_HEADER_MAP } from '@/constants/influencer-constants';
import { IInfluencer } from '@/types/influencer';

const useInfluencersExcel = () => {
  const { getSheet, sheetToJSON } = useExcel();

  const convertExcelToInfluencers = async (file: File) => {
    const data = await sheetToJSON(file, {
      headerMap: INFLUENCER_HEADER_MAP,
      headerIndex: 2,
      rowStart: 4,
      columnStart: 2,
    });

    return data;
  };

  const convertInfluencersToExcel = async (data: IInfluencer[], fileName?: string) => {
    await getSheet({
      data: [
        {
          'No.': '-',
          지역: '서울, 인천, 경기, 충청, 전라, 경상, 제주, 해외',
          연령대: '10대, 20대, 30대, 40대, 50대',
          프로젝트: '시딩, 기프팅, 이벤트, 정보성',
          카테고리: '인플루언서, 유튜버, 파워블로거, 셀러브리티, 스타일리스트, SNS 채널',
          타겟: '패션, 뷰티, 리빙, 공간, 업계, 스포츠, 반려동물, 키즈, F&B, 정보성, 아이돌, 배우',
          성별: '여성, 남성',
          직업: '-',
          '이름 / 채널명': '-',
          'SNS URL': '-',
          '팔로워 수': '0-1,000 / 1,000-10,000 / 10,000-50,000 / 50,000 - 100,000 +',
          'Blog URL': '-',
          '일일 방문자 수': '0-1,000 / 1,000-5,000 / 5,000-10,000 / 10,000 +',
          '포스팅 비용':
            '무가 / 10-30만원 / 30-90만원 / 100-200만원 / 200-300만원 / 300-500만원 / 500-1,000만원 / 1,000~',
          연락처: '-',
        },
        ...data.map((influencer, index) => {
          return {
            'No.': index + 1,
            지역: influencer.region,
            연령대: influencer.ageGroup,
            프로젝트: influencer.projectType,
            카테고리: influencer.category,
            타겟: influencer.target,
            성별: influencer.gender,
            직업: influencer.profession,
            '이름 / 채널명': influencer.channelName,
            'SNS URL': influencer.snsUrl,
            '팔로워 수': influencer.followerCount,
            'Blog URL': influencer.blogUrl,
            '일일 방문자 수': influencer.dailyVisitorCount,
            '포스팅 비용': influencer.postingCost,
            연락처: influencer.contact,
          };
        }),
      ],
      fileName: `${fileName}.xlsx`,
      sheetName: fileName,
      rowWidth: [20, 20, 20, 20, 20, 20, 20, 20],
      headerIndex: 2,
    });
  };

  return {
    convertExcelToInfluencers,
    convertInfluencersToExcel,
  };
};
export default useInfluencersExcel;
