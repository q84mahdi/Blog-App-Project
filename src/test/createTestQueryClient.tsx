import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren, ReactElement } from "react";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const createQueryWrapper = (queryClient: QueryClient) => {
  const TestQueryWrapper = ({ children }: PropsWithChildren): ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return TestQueryWrapper;
};
