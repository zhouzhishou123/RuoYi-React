import { generateMenu, generateRoutes } from '@/permission/generateRoutes';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';

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
      state.routes = generateRoutes(routes);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { setUserInfo, setRoles, setMenus, setRoutes, setCollapsed } = appSlice.actions;
export default appSlice.reducer;
