import { useState } from "react";
import { useQuery } from "react-query";
import { UserSubscribeType } from "../../types/userToSubscribe";
import { getUserMonthSubscribesApi } from "../../services/subscribes";

export function useMonthSubscribes(subscribeType: UserSubscribeType) {
  const [month, setMonth] = useState<Date>(new Date());

  const {} = useQuery(["getUserMonthSubscribesApi", subscribeType, month], () =>
    getUserMonthSubscribesApi({ type: subscribeType, date: month }),
  );

  return {};
}
