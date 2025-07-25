import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Tree,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setRoutes } from '@/store/appSlice';
import { cloneDeep } from 'lodash-es';

const { Option } = Select;

// 菜单类型选项
const menuTypeOptions = [
  { label: '目录', value: 'M' },
  { label: '菜单', value: 'C' },
  { label: '按钮', value: 'F' },
];

// 菜单状态选项
const statusOptions = [
  { label: '正常', value: '0' },
  { label: '停用', value: '1' },
];

// 显示状态选项
const visibleOptions = [
  { label: '显示', value: '0' },
  { label: '隐藏', value: '1' },
];

function Menu() {
  // Redux
  const dispatch = useDispatch();
  const rawRoutes = useSelector((state: any) => state.app.rawRoutes);
  const menus = useSelector((state: any) => state.app.menus);

  // 状态定义
  const [loading, setLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchForm] = Form.useForm();
  const [menuForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增菜单');
  const [currentMenu, setCurrentMenu] = useState<any>(null);

  // 过滤菜单树
  const filterMenuTree = (menuData: any[], searchText: string) => {
    if (!searchText) return menuData;

    const filtered = menuData.filter(menu => {
      const matchName = menu.label && menu.label.toLowerCase().includes(searchText.toLowerCase());
      const hasMatchingChildren =
        menu.children && filterMenuTree(menu.children, searchText).length > 0;
      return matchName || hasMatchingChildren;
    });

    return filtered.map(menu => {
      if (menu.children) {
        return {
          ...menu,
          children: filterMenuTree(menu.children, searchText),
        };
      }
      return menu;
    });
  };

  // 搜索处理
  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    setSearchValue(values.menuName || '');
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setSearchValue('');
  };

  // 打开新增菜单模态框
  const handleAdd = (parentMenu?: any) => {
    setModalTitle('新增菜单');
    setCurrentMenu(null);
    menuForm.resetFields();

    // 如果有父菜单，则设置父菜单ID
    if (parentMenu) {
      menuForm.setFieldsValue({
        parentId: parentMenu.key,
      });
    }

    setModalVisible(true);
  };

  // 打开编辑菜单模态框
  const handleEdit = (menu: any) => {
    setModalTitle('编辑菜单');
    setCurrentMenu(menu);

    // 找到原始路由数据
    const originalRoute = rawRoutes.find((route: any) => route.menuId === menu.key);

    if (originalRoute) {
      menuForm.setFieldsValue({
        menuId: originalRoute.menuId,
        menuName: originalRoute.menuName,
        parentId: originalRoute.parentId,
        orderNum: originalRoute.orderNum,
        path: originalRoute.path,
        component: originalRoute.component,
        menuType: originalRoute.menuType,
        perms: originalRoute.perms,
        icon: originalRoute.icon,
        visible: originalRoute.visible,
        status: originalRoute.status,
        remark: originalRoute.remark,
      });
    }

    setModalVisible(true);
  };

  // 删除菜单
  const handleDelete = (menuId: string) => {
    // 检查是否有子菜单
    const hasChildren = checkHasChildren(menus, menuId);
    if (hasChildren) {
      message.error('该菜单下有子菜单，不能删除');
      return;
    }

    // 删除菜单
    const newRawRoutes = rawRoutes.filter((route: any) => route.menuId !== menuId);
    dispatch(setRoutes(newRawRoutes));
    message.success('删除成功');
  };

  // 检查是否有子菜单
  const checkHasChildren = (menuData: any[], menuId: string): boolean => {
    for (const menu of menuData) {
      if (menu.key === menuId && menu.children && menu.children.length > 0) {
        return true;
      }
      if (menu.children && menu.children.length > 0) {
        if (checkHasChildren(menu.children, menuId)) {
          return true;
        }
      }
    }
    return false;
  };

  // 更新菜单状态
  const handleStatusChange = (menuId: string, status: string) => {
    const newStatus = status === '0' ? '1' : '0';
    const newRawRoutes = cloneDeep(rawRoutes);

    for (let i = 0; i < newRawRoutes.length; i++) {
      if (newRawRoutes[i].menuId === menuId) {
        newRawRoutes[i].status = newStatus;
        break;
      }
    }

    dispatch(setRoutes(newRawRoutes));
    message.success(`${newStatus === '0' ? '启用' : '停用'}成功`);
  };

  // 提交菜单表单
  const handleSubmit = async () => {
    try {
      const values = await menuForm.validateFields();
      const newRawRoutes = cloneDeep(rawRoutes);

      if (currentMenu) {
        // 更新菜单
        for (let i = 0; i < newRawRoutes.length; i++) {
          if (newRawRoutes[i].menuId === values.menuId) {
            newRawRoutes[i] = {
              ...newRawRoutes[i],
              ...values,
              updateTime: new Date().toISOString(),
            };
            break;
          }
        }
      } else {
        // 新增菜单
        const newMenuId = String(Date.now()); // 简单生成一个唯一ID
        const newMenu = {
          ...values,
          menuId: newMenuId,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
        };
        newRawRoutes.push(newMenu);
      }

      dispatch(setRoutes(newRawRoutes));
      setModalVisible(false);
      message.success(currentMenu ? '更新成功' : '新增成功');
    } catch (error) {
      console.error('提交表单失败', error);
    }
  };

  // 渲染操作按钮
  const renderActions = (menu: any) => (
    <Space size="small">
      <Button type="primary" size="small" onClick={() => handleAdd(menu)}>
        新增
      </Button>
      <Button type="primary" size="small" onClick={() => handleEdit(menu)}>
        编辑
      </Button>
      <Popconfirm
        title="确定删除该菜单吗？"
        onConfirm={() => handleDelete(menu.key)}
        okText="确定"
        cancelText="取消"
      >
        <Button danger size="small">
          删除
        </Button>
      </Popconfirm>
      {/* 查找原始路由数据获取状态 */}
      {rawRoutes.map((route: any) => {
        if (route.menuId === menu.key) {
          return (
            <Button
              key={menu.key}
              type={route.status === '0' ? 'default' : 'primary'}
              size="small"
              onClick={() => handleStatusChange(menu.key, route.status)}
            >
              {route.status === '0' ? '停用' : '启用'}
            </Button>
          );
        }
        return null;
      })}
    </Space>
  );

  // 自定义渲染树节点
  const renderTreeNodes = (data: any[]) =>
    data.map(item => {
      // 查找原始路由数据获取菜单类型和状态
      const originalRoute = rawRoutes.find((route: any) => route.menuId === item.key);
      const menuType = originalRoute ? originalRoute.menuType : '';
      const status = originalRoute ? originalRoute.status : '0';

      const title = (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>
            {menuType === 'M' && '📁 '}
            {menuType === 'C' && '📄 '}
            {menuType === 'F' && '🔘 '}
            {item.label}
            {status === '1' && (
              <Tag color="red" style={{ marginLeft: 8 }}>
                停用
              </Tag>
            )}
          </span>
          <span>{renderActions(item)}</span>
        </div>
      );

      if (item.children && item.children.length) {
        return {
          ...item,
          title,
          children: renderTreeNodes(item.children),
        };
      }

      return {
        ...item,
        title,
      };
    });

  // 过滤后的菜单树
  const filteredMenuTree = filterMenuTree(menus, searchValue);

  return (
    <div>
      <Card>
        {/* 搜索表单 */}
        <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }}>
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={6}>
              <Form.Item name="menuName" label="菜单名称">
                <Input placeholder="请输入菜单名称" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    搜索
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* 操作按钮 */}
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>
            新增
          </Button>
        </div>

        {/* 菜单树 */}
        <div style={{ background: '#fff', padding: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>加载中...</div>
          ) : filteredMenuTree.length > 0 ? (
            <Tree
              showLine
              blockNode
              defaultExpandAll
              expandedKeys={expandedKeys}
              onExpand={keys => setExpandedKeys(keys)}
              treeData={renderTreeNodes(filteredMenuTree)}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>暂无数据</div>
          )}
        </div>
      </Card>

      {/* 菜单表单模态框 */}
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={700}
      >
        <Form form={menuForm} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {currentMenu && (
            <Form.Item name="menuId" hidden>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="menuType"
            label="菜单类型"
            rules={[{ required: true, message: '请选择菜单类型' }]}
            initialValue="M"
          >
            <Select placeholder="请选择菜单类型">
              {menuTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="menuName"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item name="parentId" label="上级菜单" initialValue="0">
            <Select placeholder="请选择上级菜单">
              <Option value="0">顶级菜单</Option>
              {rawRoutes
                .filter((route: any) => route.menuType !== 'F') // 按钮不能作为父菜单
                .map((route: any) => (
                  <Option key={route.menuId} value={route.menuId}>
                    {route.menuName}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="orderNum"
            label="显示顺序"
            rules={[{ required: true, message: '请输入显示顺序' }]}
            initialValue={1}
          >
            <InputNumber placeholder="请输入显示顺序" min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="path"
            label="路由地址"
            rules={[
              {
                required: form => form.getFieldValue('menuType') !== 'F',
                message: '请输入路由地址',
              },
            ]}
          >
            <Input placeholder="请输入路由地址" />
          </Form.Item>

          <Form.Item
            name="component"
            label="组件路径"
            rules={[
              {
                required: form => form.getFieldValue('menuType') === 'C',
                message: '请输入组件路径',
              },
            ]}
          >
            <Input placeholder="请输入组件路径" />
          </Form.Item>

          <Form.Item
            name="perms"
            label="权限标识"
            rules={[
              {
                required: form => form.getFieldValue('menuType') === 'F',
                message: '请输入权限标识',
              },
            ]}
          >
            <Input placeholder="请输入权限标识" />
          </Form.Item>

          <Form.Item name="icon" label="菜单图标">
            <Input placeholder="请输入菜单图标" />
          </Form.Item>

          <Form.Item name="visible" label="显示状态" initialValue="0">
            <Select placeholder="请选择显示状态">
              {visibleOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="菜单状态" initialValue="0">
            <Select placeholder="请选择菜单状态">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Menu;
