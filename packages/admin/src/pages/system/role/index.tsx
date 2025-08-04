import React, { useEffect, useState } from 'react';
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
  Table,
  Tag,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { addRole, deleteRole, getRoleList, updateRole, updateRoleStatus } from '@/api/role';

const { Option } = Select;

// 角色数据类型定义
interface RoleData {
  roleId: string;
  roleName: string;
  roleKey: string;
  roleSort: number;
  status: string;
  remark?: string;
  createTime?: string;
  updateTime?: string;
}

// 搜索参数类型
interface SearchParams {
  roleName?: string;
  roleKey?: string;
  status?: string;
  pageNum?: number;
  pageSize?: number;
}

// 角色状态选项
const statusOptions = [
  { label: '正常', value: '0' },
  { label: '停用', value: '1' },
];

function Role() {
  // 状态定义
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState<RoleData[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchForm] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增角色');
  const [currentRole, setCurrentRole] = useState<RoleData | null>(null);

  // 获取角色列表
  const fetchRoleList = async (params: SearchParams = {}) => {
    setLoading(true);

    const requestParams = {
      ...params,
      pageNum: params.pageNum || pageNum,
      pageSize: params.pageSize || pageSize,
    };

    try {
      const res = await getRoleList(requestParams);
      if (res.code === 200) {
        setRoleList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
    } catch (error) {
      console.error('获取角色列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchRoleList();
  }, []);

  // 搜索处理
  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    setPageNum(1); // 重置到第一页
    fetchRoleList({ ...values, pageNum: 1, pageSize });
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setPageNum(1);
    fetchRoleList({ pageNum: 1, pageSize });
  };

  // 分页变化处理
  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  }) => {
    const { current = 1, pageSize: newPageSize = 10 } = pagination;
    const searchValues = searchForm.getFieldsValue();

    setPageNum(current);
    setPageSize(newPageSize);

    fetchRoleList({
      ...searchValues,
      pageNum: current,
      pageSize: newPageSize,
    });
  };

  // 打开新增角色模态框
  const handleAdd = () => {
    setModalTitle('新增角色');
    setCurrentRole(null);
    roleForm.resetFields();
    setModalVisible(true);
  };

  // 打开编辑角色模态框
  const handleEdit = (record: RoleData) => {
    setModalTitle('编辑角色');
    setCurrentRole(record);
    roleForm.setFieldsValue({
      roleId: record.roleId,
      roleName: record.roleName,
      roleKey: record.roleKey,
      roleSort: record.roleSort,
      status: record.status,
      remark: record.remark,
    });
    setModalVisible(true);
  };

  // 删除角色
  const handleDelete = async (roleId: string) => {
    try {
      const res = await deleteRole(roleId);
      if (res.code === 200) {
        message.success('删除成功');
        // 如果当前页没有数据了，回到上一页
        if (roleList.length === 1 && pageNum > 1) {
          const newPageNum = pageNum - 1;
          setPageNum(newPageNum);
          fetchRoleList({
            ...searchForm.getFieldsValue(),
            pageNum: newPageNum,
            pageSize,
          });
        } else {
          fetchRoleList({
            ...searchForm.getFieldsValue(),
            pageNum,
            pageSize,
          });
        }
      }
    } catch (error) {
      console.error('删除角色失败', error);
    }
  };

  // 更新角色状态
  const handleStatusChange = async (roleId: string, status: string) => {
    try {
      const newStatus = status === '0' ? '1' : '0';
      const res = await updateRoleStatus(roleId, newStatus);
      if (res.code === 200) {
        message.success(`${newStatus === '0' ? '启用' : '停用'}成功`);
        fetchRoleList({
          ...searchForm.getFieldsValue(),
          pageNum,
          pageSize,
        });
      }
    } catch (error) {
      console.error('更新角色状态失败', error);
    }
  };

  // 提交角色表单
  const handleSubmit = async () => {
    try {
      const values = await roleForm.validateFields();

      if (currentRole) {
        // 更新角色
        const res = await updateRole({
          ...values,
          roleId: currentRole.roleId,
        });

        if (res.code === 200) {
          message.success('更新成功');
          setModalVisible(false);
          fetchRoleList({
            ...searchForm.getFieldsValue(),
            pageNum,
            pageSize,
          });
        }
      } else {
        // 新增角色
        const res = await addRole(values);

        if (res.code === 200) {
          message.success('新增成功');
          setModalVisible(false);
          fetchRoleList({
            ...searchForm.getFieldsValue(),
            pageNum,
            pageSize,
          });
        }
      }
    } catch (error) {
      console.error('提交表单失败', error);
    }
  };

  // 表格列定义
  const columns = [
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
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
      key: 'roleKey',
    },
    {
      title: '显示顺序',
      dataIndex: 'roleSort',
      key: 'roleSort',
      sorter: (a: RoleData, b: RoleData) => a.roleSort - b.roleSort,
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: RoleData) => (
        <Space>
          <Tag color={status === '0' ? 'green' : 'red'}>{status === '0' ? '正常' : '停用'}</Tag>
          {record.roleKey !== 'admin' && (
            <Button
              type="link"
              size="small"
              onClick={() => handleStatusChange(record.roleId, status)}
            >
              {status === '0' ? '停用' : '启用'}
            </Button>
          )}
        </Space>
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
      render: (_: unknown, record: RoleData) => (
        <Space>
          {record.roleKey !== 'admin' && (
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
                title="确定删除该角色吗？"
                onConfirm={() => handleDelete(record.roleId)}
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
              <Form.Item name="roleName" label="角色名称">
                <Input placeholder="请输入角色名称" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="roleKey" label="权限字符">
                <Input placeholder="请输入权限字符" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="角色状态">
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

        {/* 角色表格 */}
        <Table
          columns={columns}
          dataSource={roleList}
          rowKey="roleId"
          loading={loading}
          pagination={{
            current: pageNum,
            pageSize: pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条记录`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
        />
      </Card>

      {/* 角色表单模态框 */}
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={roleForm} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {currentRole && (
            <Form.Item name="roleId" hidden>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="roleKey"
            label="权限字符"
            rules={[{ required: true, message: '请输入权限字符' }]}
          >
            <Input placeholder="请输入权限字符" />
          </Form.Item>

          <Form.Item
            name="roleSort"
            label="显示顺序"
            rules={[{ required: true, message: '请输入显示顺序' }]}
          >
            <InputNumber placeholder="请输入显示顺序" min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="status" label="状态" initialValue="0">
            <Select placeholder="请选择状态">
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

export default Role;
