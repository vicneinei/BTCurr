import { useMemo, useState, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { btcPriceQueryOpt } from "./api/btcPrice";

dayjs.extend(relativeTime);
const intervalTimeout = 30 * 1000; // 30 seconds

const TimeFromNow = ({ time }) => {
  const dayjsTime = useMemo(() => dayjs(time), [time]);

  const [_, render] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      render(r => !r);
    }, intervalTimeout);
    return () => clearInterval(interval);
  }, []);

  return <Text allowFontScaling={false} className="pl-2 text-lg ">Last checked: <Text className="font-semibold">{dayjsTime.fromNow()}</Text></Text>;
};

const ListFooter = ({ children }) => {
  const { data, refetch, isFetching } = useQuery(btcPriceQueryOpt);
  return (
    <View className="w-full flex-row items-center bg-white h-9">
      <View className="flex-auto w-80">
        {data?.time && <TimeFromNow time={data.time} />}
      </View>
      <TouchableOpacity onPress={refetch} className="flex-auto w-16 items-center">
        {isFetching ? <ActivityIndicator size="small" color="black" />
          : <AntDesign name="reload1" size={24} color="black" />}
        {children}
      </TouchableOpacity>
    </View>
  );
}

export default ListFooter;