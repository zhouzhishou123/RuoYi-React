import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { addUser, deleteUser, getUserList, updateUser } from '@/api/user';
import { getAccessToken } from '@/utils/storage';

const { Option } = Select;

// 用户状态选项
const statusOptions = [
  { label: '正常', value: '0' },
  { label: '停用', value: '1' },
];

function User() {
  // 状态定义
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [searchForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增用户');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 获取用户列表
  const fetchUserList = async (params = {}) => {
    setLoading(true);

    try {
      const res = await getUserList(params);

      if (res.code === 200) {
        setUserList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
    } catch (error) {
      console.error('获取用户列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchUserList();
  }, []);

  // 搜索处理
  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    fetchUserList(values);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchUserList();
  };

  // 打开新增用户模态框
  const handleAdd = () => {
    setModalTitle('新增用户');
    setCurrentUser(null);
    userForm.resetFields();
    setModalVisible(true);
  };

  // 打开编辑用户模态框
  const handleEdit = (record: any) => {
    setModalTitle('编辑用户');
    setCurrentUser(record);
    userForm.setFieldsValue({
      userId: record.userId,
      userName: record.userName,
      nickName: record.nickName,
      deptId: record.deptId,
      phonenumber: record.phonenumber,
      email: record.email,
      sex: record.sex,
      status: record.status,
      remark: record.remark,
      roleIds: record.roles?.map((role: any) => role.roleId) || [],
    });
    setModalVisible(true);
  };

  // 删除用户
  const handleDelete = async (userId: string) => {
    try {
      const res = await deleteUser(userId);
      if (res.code === 200) {
        message.success('删除成功');
        fetchUserList(searchForm.getFieldsValue());
      }
    } catch (error) {
      console.error('删除用户失败', error);
    }
  };

  // 提交用户表单
  const handleSubmit = async () => {
    try {
      const values = await userForm.validateFields();

      if (currentUser) {
        // 更新用户
        const res = await updateUser({
          ...values,
          userId: currentUser.userId,
        });

        if (res.code === 200) {
          message.success('更新成功');
          setModalVisible(false);
          fetchUserList(searchForm.getFieldsValue());
        }
      } else {
        // 新增用户
        const res = await addUser(values);

        if (res.code === 200) {
          message.success('新增成功');
          setModalVisible(false);
          fetchUserList(searchForm.getFieldsValue());
        }
      }
    } catch (error) {
      console.error('提交表单失败', error);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
    },
    {
      title: '用户名称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '部门',
      dataIndex: 'dept',
      key: 'dept',
      render: (dept: any) => dept?.deptName || '-',
    },
    {
      title: '手机',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '0' ? 'green' : 'red'}>{status === '0' ? '正常' : '停用'}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time: string) => (time ? new Date(time).toLocaleString() : '-'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          {record.userName !== 'admin' && (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => handleEdit(record)}
              >
                编辑
              </Button>
              <Popconfirm
                title="确定删除该用户吗？"
                onConfirm={() => handleDelete(record.userId)}
                okText="确定"
                cancelText="取消"
              >
                <Button danger icon={<DeleteOutlined />} size="small">
                  删除
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        {/* 搜索表单 */}
        <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }}>
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={6}>
              <Form.Item name="userName" label="用户名称">
                <Input placeholder="用户名称/昵称" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="phonenumber" label="手机号码">
                <Input placeholder="请输入手机号码" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="用户状态">
                <Select placeholder="请选择状态" allowClear>
                  {statusOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增
          </Button>
        </div>

        {/* 用户表格 */}
        <Table
          columns={columns}
          dataSource={userList}
          rowKey="userId"
          loading={loading}
          pagination={{
            total,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 用户表单模态框 */}
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={700}
      >
        <Form form={userForm} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {currentUser && (
            <Form.Item name="userId" hidden>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="userName"
            label="登录名称"
            rules={[{ required: true, message: '请输入登录名称' }]}
          >
            <Input placeholder="请输入登录名称" />
          </Form.Item>

          <Form.Item
            name="nickName"
            label="用户名称"
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>

          {!currentUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          <Form.Item
            name="phonenumber"
            label="手机号码"
            rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ type: 'email', message: '请输入正确的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item name="sex" label="性别">
            <Select placeholder="请选择性别">
              <Option value="0">男</Option>
              <Option value="1">女</Option>
              <Option value="2">未知</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" defaultValue="0">
              <Option value="0">正常</Option>
              <Option value="1">停用</Option>
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

export default User;
