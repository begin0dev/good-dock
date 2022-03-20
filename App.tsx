import { RecoilRoot } from "recoil";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";

import InitNavigation from "./src/navigations/InitNavigation";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
});

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <InitNavigation />
        </QueryClientProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;
