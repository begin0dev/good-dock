import { RecoilRoot } from "recoil";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";

import InitNavigation from "./src/navigations/InitNavigation";
import { Toast } from "./src/components/common/toast";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
});

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Toast />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <InitNavigation />
        </QueryClientProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;
