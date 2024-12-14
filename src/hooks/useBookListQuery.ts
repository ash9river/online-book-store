import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/http/getData';
import {
  RetrieveBookListParams,
  RetrieveBookListResponseBody,
} from 'types/Mockup';

function useBookListQuery(
  req: RetrieveBookListParams,
  select?: (
    data: RetrieveBookListResponseBody,
  ) => RetrieveBookListResponseBody | undefined,
) {
  // undefined 값을 제거한 객체 생성
  const filteredReq = Object.fromEntries(
    Object.entries(req).filter(([_, value]) => value !== undefined),
  );

  // 필터링된 객체를 쿼리 파라미터로 변환
  const queryParams = new URLSearchParams(filteredReq);

  return useQuery({
    queryKey: ['books', req],
    queryFn: ({ signal }) =>
      getData<RetrieveBookListResponseBody>(`books?${queryParams}`, signal),
    select,
  });
}

export default useBookListQuery;
