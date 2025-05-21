import { buildRouteTree, generateMenu } from '@/permission/generateRoutes';
import { removeAccessToken } from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';

const initialState = {
  collapsed: false,
  userInfo: {},
  rawRoutes: [],
  roles: [],
  routes: [],
  menus: [],
  tagsView: [],
  layoutMode: 'side', // 默认左侧菜单模式
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setRoutes: (state, action) => {
      const routes = cloneDeep(action.payload);
      const menus = cloneDeep(action.payload);
      state.rawRoutes = action.payload;
      state.menus = generateMenu(menus);
      state.routes = buildRouteTree(routes);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    logout: state => {
      removeAccessToken();
      state.userInfo = {};
      state.roles = [];
      state.routes = [];
      state.menus = [];
      state.tagsView = [];
    },
    setTagsView: (state, action) => {
      const { pathname, title } = action.payload;
      const isExist = state.tagsView.some(item => item.pathname === pathname);
      if (!isExist) {
        state.tagsView.push({ pathname, title });
      }
    },
    removeTagView: (state, action) => {
      const pathname = action.payload;
      state.tagsView = state.tagsView.filter(item => item.pathname !== pathname);
    },
    setLayoutMode: (state, action) => {
      state.layoutMode = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setRoles,
  logout,
  setRoutes,
  setCollapsed,
  setTagsView,
  removeTagView,
  setLayoutMode,
} = appSlice.actions;
export default appSlice.reducer;
