import EnhanceRootProvider from '@/components/EnhanceRootProvider';
import useStore from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
/**
 * 应用入口组件
 * 提供Redux状态和路由配置
 */
function App() {
  const { store, persistor } = useStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EnhanceRootProvider />
      </PersistGate>
    </Provider>
  );
}

export default App;
