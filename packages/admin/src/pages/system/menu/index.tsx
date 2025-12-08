import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { menuApi, Menu as MenuType, CreateMenuDto, UpdateMenuDto } from '@/api/system';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

function MenuManagement() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuType | null>(null);
  const [form] = Form.useForm();

  // 获取菜单列表
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await menuApi.getList();
      if (response.code === 200) {
        // 兼容数组和list格式
        const menuList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        setMenus(menuList);
      } else {
        message.error(response.message || response.msg || '获取菜单列表失败');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        message.error('登录已过期，请重新登录');
      } else {
        message.error('获取菜单列表失败');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // 将菜单数据转换为树形结构用于选择父菜单
  const convertToTreeData = (menuList: MenuType[], excludeId?: number) => {
    return menuList
      .filter(menu => menu.menuId !== excludeId) // 排除自身（编辑时）
      .map(menu => ({
        value: menu.menuId,
        title: `${menu.menuName} (${menu.menuType})`,
        children: menu.children ? convertToTreeData(menu.children, excludeId) : [],
      }));
  };

  // 处理新增/编辑
  const handleSubmit = async (values: CreateMenuDto | UpdateMenuDto) => {
    try {
      if (editingMenu) {
        // 编辑菜单
        const updateData: UpdateMenuDto = {
          ...values,
          menuId: editingMenu.menuId.toString(),
          parentId: values.parentId ? values.parentId.toString() : '0',
        };
        const response = await menuApi.update(editingMenu.menuId.toString(), updateData);
        if (response.code === 200) {
          message.success('菜单更新成功');
          setModalVisible(false);
          form.resetFields();
          fetchMenus();
        } else {
          message.error(response.message || response.msg || '菜单更新失败');
        }
      } else {
        // 新增菜单
        const createData: CreateMenuDto = {
          ...values,
          parentId: values.parentId ? values.parentId.toString() : '0',
        };
        const response = await menuApi.create(createData);
        if (response.code === 200) {
          message.success('菜单创建成功');
          setModalVisible(false);
          form.resetFields();
          fetchMenus();
        } else {
          message.error(response.message || response.msg || '菜单创建失败');
        }
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message || '操作失败');
      console.error(error);
    }
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      const response = await menuApi.delete(id.toString());
      if (response.code === 200) {
        message.success('菜单删除成功');
        fetchMenus();
      } else {
        message.error(response.message || response.msg || '菜单删除失败');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message || '删除失败');
      console.error(error);
    }
  };

  // 打开新增/编辑模态框
  const showModal = (menu?: MenuType) => {
    if (menu) {
      setEditingMenu(menu);
      form.setFieldsValue({
        menuName: menu.menuName,
        parentId: menu.parentId ? parseInt(menu.parentId.toString()) : 0,
        orderNum: menu.orderNum,
        path: menu.path,
        component: menu.component,
        isFrame: menu.isFrame?.toString() || '1',
        menuType: menu.menuType,
        visible: menu.visible,
        status: menu.status,
        perms: menu.perms,
        icon: menu.icon,
        remark: menu.remark,
      });
    } else {
      setEditingMenu(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 表格列定义
  const columns: ColumnsType<MenuType> = [
    {
      title: '菜单ID',
      dataIndex: 'menuId',
      key: 'menuId',
      width: 80,
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: 120,
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      width: 100,
      render: (menuType: string) => {
        const typeMap = {
          M: '目录',
          C: '菜单',
          F: '按钮',
        };
        return typeMap[menuType as keyof typeof typeMap] || menuType;
      },
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      width: 150,
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      width: 150,
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      key: 'perms',
      width: 120,
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      key: 'orderNum',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <Tag color={status === '0' ? 'success' : 'error'}>{status === '0' ? '正常' : '停用'}</Tag>
      ),
    },
    {
      title: '可见',
      dataIndex: 'visible',
      key: 'visible',
      width: 80,
      render: (visible: string) => (
        <Tag color={visible === '0' ? 'blue' : 'default'}>{visible === '0' ? '显示' : '隐藏'}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个菜单吗？"
            onConfirm={() => handleDelete(record.menuId)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const parentMenuOptions = convertToTreeData(menus, editingMenu?.menuId);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          新增菜单
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={menus}
        rowKey="menuId"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
        }}
        expandable={{
          childrenColumnName: 'children',
          defaultExpandAllRows: true,
        }}
      />

      <Modal
        title={editingMenu ? '编辑菜单' : '新增菜单'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            parentId: 0,
            orderNum: 0,
            isFrame: '0',
            menuType: 'C',
            visible: '0',
            status: '0',
          }}
        >
          <Form.Item
            name="menuName"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item name="parentId" label="父菜单">
            <Select
              placeholder="请选择父菜单"
              treeData={[{ value: 0, title: '根目录' }, ...parentMenuOptions]}
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item
            name="orderNum"
            label="显示顺序"
            rules={[{ required: true, message: '请输入显示顺序' }]}
          >
            <Input type="number" placeholder="请输入显示顺序" />
          </Form.Item>

          <Form.Item name="path" label="路由地址">
            <Input placeholder="例如：/system/user" />
          </Form.Item>

          <Form.Item name="component" label="组件路径">
            <Input placeholder="例如：system/user/index" />
          </Form.Item>

          <Form.Item name="perms" label="权限标识">
            <Input placeholder="例如：system:user:list" />
          </Form.Item>

          <Form.Item
            name="menuType"
            label="菜单类型"
            rules={[{ required: true, message: '请选择菜单类型' }]}
          >
            <Select>
              <Option value="M">目录</Option>
              <Option value="C">菜单</Option>
              <Option value="F">按钮</Option>
            </Select>
          </Form.Item>

          <Form.Item name="isFrame" label="是否外链">
            <Select>
              <Option value="0">是</Option>
              <Option value="1">否</Option>
            </Select>
          </Form.Item>

          <Form.Item name="visible" label="显示状态">
            <Select>
              <Option value="0">显示</Option>
              <Option value="1">隐藏</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="菜单状态">
            <Select>
              <Option value="0">正常</Option>
              <Option value="1">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item name="icon" label="菜单图标">
            <Input placeholder="例如：user-outlined" />
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MenuManagement;
