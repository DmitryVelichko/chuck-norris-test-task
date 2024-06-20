import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>)
}
