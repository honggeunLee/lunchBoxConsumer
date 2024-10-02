import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { IPageResponse } from "../types/reservation.ts";
import { getReservationList } from "../api/reservationAPI.ts";

const initialState = {
    content: [],
    first: false,
    last: false,
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
}

const useReservation = () => {
    const [query] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchMore = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);
        getReservationList(page + 1, size).then(data => {
            setPageResponse(prevData => ({
                ...data,
                content: [...prevData.content, ...data.content], // 기존 데이터에 추가
            }));
            setLoading(false);
            if (data.content.length < size) {
                setHasMore(false); // 더 이상 데이터가 없을 경우
            }
        });
    }, [loading, hasMore, page, size]);

    const moveToRead = (rno: number | undefined) => {
        navigate(`/reservation/read/${rno}`);
    }

    useEffect(() => {
        setLoading(true);
        getReservationList(page, size).then(data => {
            setPageResponse(data);
            setLoading(false);
        });
    }, [query, location.key]);

    return { loading, pageResponse, moveToRead, fetchMore };
}

export default useReservation;
