import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { userApi, roleApi, User, Role, CreateUserDto, UpdateUserDto } from '@/api/system';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getList();
      if (response.code === 200) {
        // 兼容数组和list格式
        const userList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        setUsers(userList);
      } else {
        message.error(response.message || response.msg || '获取用户列表失败');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        message.error('登录已过期，请重新登录');
      } else if (error.response) {
        message.error(`获取用户列表失败: ${error.response.status}`);
      } else if (error.request) {
        message.error('网络错误，请检查后端服务');
      } else {
        message.error('获取用户列表失败');
      }
    } finally {
      setLoading(false);
    }
  };

  // 获取角色列表
  const fetchRoles = async () => {
    try {
      const response = await roleApi.getList();
      if (response.code === 200) {
        const roleList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        setRoles(roleList);
      }
    } catch (error) {
      console.error('获取角色列表失败:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // 处理新增/编辑
  const handleSubmit = async (values: CreateUserDto | UpdateUserDto) => {
    try {
      if (editingUser) {
        // 编辑用户
        // 如果密码为空，不发送密码字段
        const updateData: UpdateUserDto = {
          ...values,
          userId: editingUser.userId,
        };
        // 如果密码为空字符串，删除该字段
        if (!updateData.password || updateData.password.trim() === '') {
          delete updateData.password;
        }

        const response = await userApi.update(editingUser.userId, updateData);
        if (response.code === 200) {
          message.success('用户更新成功');
          setModalVisible(false);
          fetchUsers();
        } else {
          message.error(response.message || response.msg || '用户更新失败');
        }
      } else {
        // 新增用户
        const response = await userApi.create(values as CreateUserDto);
        if (response.code === 200) {
          message.success('用户创建成功');
          setModalVisible(false);
          fetchUsers();
        } else {
          message.error(response.message || response.msg || '用户创建失败');
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
      const response = await userApi.delete(id);
      if (response.code === 200) {
        message.success('用户删除成功');
        fetchUsers();
      } else {
        message.error(response.message || response.msg || '用户删除失败');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message || '删除失败');
      console.error(error);
    }
  };

  // 打开新增/编辑模态框
  const showModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        ...user,
        password: '', // 编辑时不显示密码
        roleIds: user.roles ? user.roles.map(role => parseInt(role.roleId.toString())) : [],
      });
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 表格列定义
  const columns: ColumnsType<User> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 120,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      width: 120,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 80,
      render: (sex: string) => {
        const sexMap = {
          '0': '未知',
          '1': '男',
          '2': '女',
        };
        return sexMap[sex as keyof typeof sexMap] || '未知';
      },
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
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.userId)}
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

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          新增用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="userId"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
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
            sex: '0',
            status: '0',
          }}
        >
          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {!editingUser ? (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          ) : (
            <Form.Item name="password" label="密码" help="留空则不修改密码">
              <Input.Password placeholder="留空则不修改密码" />
            </Form.Item>
          )}

          <Form.Item
            name="nickName"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item name="phonenumber" label="手机号">
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item name="sex" label="性别">
            <Select>
              <Option value="0">未知</Option>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Select>
              <Option value="0">正常</Option>
              <Option value="1">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item name="roleIds" label="角色">
            <Select mode="multiple" placeholder="请选择角色" allowClear>
              {roles.map(role => (
                <Option key={role.roleId} value={parseInt(role.roleId.toString())}>
                  {role.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagement;
