import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

import { UserSubscribeType } from "../../types/userToSubscribe";
import { getUserMonthSubscribesApi } from "../../services/subscribes";
import { getMonthSubscribes } from "../../helpers/utils";

export function useMonthSubscribes(subscribeType: UserSubscribeType) {
  const [month, setMonth] = useState<Dayjs | undefined>();

  const { isLoading, data } = useQuery(
    ["getUserMonthSubscribesApi", subscribeType, month?.toString()],
    () =>
      getUserMonthSubscribesApi({ type: subscribeType, date: month!.toDate() }).then((res) =>
        getMonthSubscribes(month, res.data.payload),
      ),
    {
      enabled: !!month,
      retry: false,
      cacheTime: 60 * 60 * 1000,
    },
  );

  const changeMonth = useCallback((date: Dayjs) => {
    setMonth(date.startOf("M"));
  }, []);

  return { isLoading, data, setMonth: changeMonth };
}
