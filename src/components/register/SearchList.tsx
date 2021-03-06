import { last, flatten } from "lodash";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { useInfiniteQuery } from "react-query";
import { StyleSheet, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton, AppTextInput, CustomText } from "../common";
import { themeColors } from "../../styles/colors";
import { getSubscribesApi } from "../../services/subscribes";
import { useSearchInput } from "../../hooks";
import SearchItem from "./SearchItem";
import { registerFormState } from "./state/form";
import { NavigationProps } from "../../navigations/types";

interface SelectItem {
  ko: string;
  imageUrl?: string;
}

function SearchList() {
  const limit = 15;

  const navigation = useNavigation<NavigationProps>();
  const [formState, setFormState] = useRecoilState(registerFormState);
  const [selected, setSelected] = useState<SelectItem | null>(
    formState.ko ? { ko: formState.ko, imageUrl: formState.imageUrl } : null,
  );
  const { keyword, currentSearch, onChange } = useSearchInput();
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["getSubscribesApi", currentSearch],
    ({ pageParam }) =>
      getSubscribesApi({ limit, after: pageParam, keyword: currentSearch?.toLowerCase() }).then(
        (res) => res.data.payload,
      ),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < limit) return undefined;
        const lastItem = last(lastPage);
        if (!lastItem) return undefined;
        return `${lastItem.ko}_${lastItem.en}`;
      },
    },
  );

  const onPressItem = useCallback((item: SelectItem) => {
    setSelected(item);
  }, []);

  const onPressSubmit = () => {
    if (!selected) return;
    setFormState((prevState) => ({ ...prevState, ko: selected.ko, imageUrl: selected.imageUrl }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={[styles.titleWrapper]}>
              <CustomText type="h1">?????? ?????? ????????? ??????????????????</CustomText>
              <CustomText type="subText">
                ?????? ???, ?????? ????????? ?????? ??? ?????? ?????? ??? ????????? ???????????????.
              </CustomText>
            </View>
            <AppTextInput value={keyword} onChange={onChange} placeholder="??????" />
          </>
        }
        ListHeaderComponentStyle={[styles.listHeader, styles.backgroundColor]}
        contentContainerStyle={styles.listContainer}
        stickyHeaderIndices={[0]}
        data={flatten(data?.pages)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SearchItem
            type="DEFAULT"
            item={item}
            isChecked={item.ko === selected?.ko}
            onPressItem={() => onPressItem(item)}
          />
        )}
        ListEmptyComponent={
          !isLoading && keyword ? (
            <SearchItem
              type="NOT_FOUND"
              item={{ ko: keyword || "" }}
              isChecked={keyword === selected?.ko}
              onPressItem={() => onPressItem({ ko: keyword })}
            />
          ) : undefined
        }
        onEndReached={() => !isLoading && hasNextPage && fetchNextPage()}
        scrollEnabled
      />
      <View style={styles.footerWrapper}>
        <AppButton onPress={onPressSubmit} disabled={!selected}>
          ??????
        </AppButton>
      </View>
    </SafeAreaView>
  );
}

export default SearchList;

const spaceSize = 25;

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  listContainer: {
    paddingHorizontal: spaceSize,
    paddingBottom: 61,
  },
  titleWrapper: {
    paddingBottom: 16,
  },
  listHeader: {
    paddingTop: spaceSize,
    marginBottom: 20,
  },
  backgroundColor: {
    backgroundColor: themeColors.BACKGROUND,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spaceSize,
    paddingBottom: 21,
  },
});
