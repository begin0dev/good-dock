import { last, flatten } from "lodash";
import { useInfiniteQuery } from "react-query";
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppTextInput, CustomText } from "../common";
import { themeColors } from "../../styles/colors";
import { getSubscribesApi } from "../../services/subscribes";
import SearchItem from "./SearchItem";

function SearchList() {
  const limit = 15;

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["getSubscribesApi"],
    ({ pageParam }) =>
      getSubscribesApi({ limit, after: pageParam }).then((res) => res.data.payload),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < limit) return undefined;
        const lastItem = last(lastPage);
        if (!lastItem) return undefined;
        return `${lastItem.ko}_${lastItem.en}`;
      },
    },
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.titleWrapper}>
              <CustomText type="h1">정기 결제 항목을 선택해주세요</CustomText>
              <CustomText type="subText">
                검색 후, 아래 항목에 없을 시 직접 입력 후 확인을 눌러주세요.
              </CustomText>
            </View>
            <AppTextInput placeholder="검색" />
          </>
        }
        ListHeaderComponentStyle={styles.listHeader}
        stickyHeaderIndices={[0]}
        data={flatten(data?.pages)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SearchItem item={item} />}
        onEndReached={() => !isLoading && hasNextPage && fetchNextPage()}
        scrollEnabled
      />
    </SafeAreaView>
  );
}

export default SearchList;

const paddingSize = 25;
const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    padding: paddingSize,
    minHeight: "100%",
  },
  titleWrapper: {
    paddingBottom: 16,
  },
  listHeader: {
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    marginBottom: 20,
  },
});
