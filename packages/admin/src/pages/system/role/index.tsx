import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Tree,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { roleApi, menuApi, Role, Menu, CreateRoleDto, UpdateRoleDto } from '@/api/system';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';

const { Option } = Select;

function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedMenuKeys, setSelectedMenuKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  // 获取角色列表
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await roleApi.getList();
      if (response.code === 200) {
        // 兼容数组和list格式
        const roleList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        setRoles(roleList);
      } else {
        message.error(response.message || response.msg || '获取角色列表失败');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        message.error('登录已过期，请重新登录');
      } else {
        message.error('获取角色列表失败');
      }
    } finally {
      setLoading(false);
    }
  };

  // 获取菜单列表
  const fetchMenus = async () => {
    setMenuLoading(true);
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
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchMenus();
  }, []);

  // 将菜单数据转换为树形结构
  const convertToTreeData = (menuList: Menu[]): DataNode[] => {
    return menuList.map(menu => ({
      key: menu.menuId.toString(),
      title: `${menu.menuName} (${menu.menuType})`,
      children: menu.children ? convertToTreeData(menu.children) : [],
    }));
  };

  // 处理新增/编辑
  const handleSubmit = async (values: CreateRoleDto | UpdateRoleDto) => {
    try {
      if (editingRole) {
        // 编辑角色
        const updateData: UpdateRoleDto = {
          ...values,
          roleId: editingRole.roleId.toString(),
          menuIds: selectedMenuKeys.map(key => key.toString()),
        };
        const response = await roleApi.update(editingRole.roleId.toString(), updateData);
        if (response.code === 200) {
          message.success('角色更新成功');
          setModalVisible(false);
          form.resetFields();
          setSelectedMenuKeys([]);
          fetchRoles();
        } else {
          message.error(response.message || response.msg || '角色更新失败');
        }
      } else {
        // 新增角色
        const createData: CreateRoleDto = {
          ...values,
          menuIds: selectedMenuKeys.map(key => key.toString()),
        };
        const response = await roleApi.create(createData);
        if (response.code === 200) {
          message.success('角色创建成功');
          setModalVisible(false);
          form.resetFields();
          setSelectedMenuKeys([]);
          fetchRoles();
        } else {
          message.error(response.message || response.msg || '角色创建失败');
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
      const response = await roleApi.delete(id.toString());
      if (response.code === 200) {
        message.success('角色删除成功');
        fetchRoles();
      } else {
        message.error(response.message || response.msg || '角色删除失败');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message || '删除失败');
      console.error(error);
    }
  };

  // 打开新增/编辑模态框
  const showModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      form.setFieldsValue({
        roleName: role.roleName,
        roleKey: role.roleKey,
        roleSort: role.roleSort,
        status: role.status,
        remark: role.remark,
      });
      // 设置选中的菜单
      if (role.menus) {
        setSelectedMenuKeys(role.menus.map(menu => menu.menuId.toString()));
      }
    } else {
      setEditingRole(null);
      form.resetFields();
      setSelectedMenuKeys([]);
    }
    setModalVisible(true);
  };

  // 表格列定义
  const columns: ColumnsType<Role> = [
    {
      title: '角色ID',
      dataIndex: 'roleId',
      key: 'roleId',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 120,
    },
    {
      title: '角色权限字符串',
      dataIndex: 'roleKey',
      key: 'roleKey',
      width: 150,
    },
    {
      title: '显示顺序',
      dataIndex: 'roleSort',
      key: 'roleSort',
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
            title="确定要删除这个角色吗？"
            onConfirm={() => handleDelete(record.roleId)}
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

  const treeData = convertToTreeData(menus);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          新增角色
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="roleId"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
        }}
      />

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: '0',
            roleSort: 0,
          }}
        >
          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="roleKey"
            label="角色权限字符串"
            rules={[{ required: true, message: '请输入角色权限字符串' }]}
          >
            <Input placeholder="例如：admin" />
          </Form.Item>

          <Form.Item
            name="roleSort"
            label="显示顺序"
            rules={[{ required: true, message: '请输入显示顺序' }]}
          >
            <Input type="number" placeholder="请输入显示顺序" />
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Select>
              <Option value="0">正常</Option>
              <Option value="1">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item label="菜单权限">
            <Tree
              checkable
              treeData={treeData}
              checkedKeys={selectedMenuKeys}
              onCheck={checkedKeys => setSelectedMenuKeys(checkedKeys as React.Key[])}
              height={300}
              style={{ border: '1px solid #d9d9d9', padding: 8, borderRadius: 4 }}
            />
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleManagement;
