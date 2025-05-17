import { generateMenu, buildRouteTree } from '@/permission/generateRoutes';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';
import { removeAccessToken } from '@/utils/storage';

const initialState = {
  collapsed: false,
  userInfo: {},
  rawRoutes: [],
  roles: [],
  routes: [],
  menus: [],
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
    },
  },
});

export const { setUserInfo, setRoles, logout, setRoutes, setCollapsed } = appSlice.actions;
export default appSlice.reducer;
