import { useState } from 'react';
import { Button, Card, Space, message } from 'antd';
import { userApi, roleApi, menuApi } from '@/api/system';

function ApiTest() {
  const [loading, setLoading] = useState(false);

  const testUserApi = async () => {
    setLoading(true);
    try {
      console.log('测试用户API...');
      const response = await userApi.getList();
      console.log('用户API响应:', response);
      if (response.code === 200) {
        const userList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        message.success(`用户API成功，获取到 ${userList.length} 条数据`);
      } else {
        message.error(`用户API失败: ${response.message || response.msg}`);
      }
    } catch (error: any) {
      console.error('用户API错误:', error);
      if (error.response) {
        message.error(
          `用户API错误: ${error.response.status} - ${error.response.data?.msg || error.message}`,
        );
      } else if (error.request) {
        message.error('用户API: 请求无响应，检查后端服务');
      } else {
        message.error(`用户API错误: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testRoleApi = async () => {
    setLoading(true);
    try {
      console.log('测试角色API...');
      const response = await roleApi.getList();
      console.log('角色API响应:', response);
      if (response.code === 200) {
        const roleList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        message.success(`角色API成功，获取到 ${roleList.length} 条数据`);
      } else {
        message.error(`角色API失败: ${response.message || response.msg}`);
      }
    } catch (error: any) {
      console.error('角色API错误:', error);
      if (error.response) {
        message.error(
          `角色API错误: ${error.response.status} - ${error.response.data?.msg || error.message}`,
        );
      } else if (error.request) {
        message.error('角色API: 请求无响应，检查后端服务');
      } else {
        message.error(`角色API错误: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testMenuApi = async () => {
    setLoading(true);
    try {
      console.log('测试菜单API...');
      const response = await menuApi.getList();
      console.log('菜单API响应:', response);
      if (response.code === 200) {
        const menuList = Array.isArray(response.data) ? response.data : response.data?.list || [];
        message.success(`菜单API成功，获取到 ${menuList.length} 条数据`);
      } else {
        message.error(`菜单API失败: ${response.message || response.msg}`);
      }
    } catch (error: any) {
      console.error('菜单API错误:', error);
      if (error.response) {
        message.error(
          `菜单API错误: ${error.response.status} - ${error.response.data?.msg || error.message}`,
        );
      } else if (error.request) {
        message.error('菜单API: 请求无响应，检查后端服务');
      } else {
        message.error(`菜单API错误: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testAllApis = async () => {
    await testUserApi();
    await testRoleApi();
    await testMenuApi();
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="API测试页面" style={{ maxWidth: 600, margin: '0 auto' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" onClick={testAllApis} loading={loading} block>
            测试所有API
          </Button>

          <Button onClick={testUserApi} loading={loading} block>
            测试用户API (/api/system/user)
          </Button>

          <Button onClick={testRoleApi} loading={loading} block>
            测试角色API (/api/role/list)
          </Button>

          <Button onClick={testMenuApi} loading={loading} block>
            测试菜单API (/api/menu/list)
          </Button>
        </Space>

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
          <h4>说明：</h4>
          <p>1. 确保后端服务正在运行 (端口3000)</p>
          <p>2. 确保已登录系统获取有效token</p>
          <p>3. 检查浏览器控制台查看详细日志</p>
          <p>4. 如果返回401错误，需要重新登录</p>
        </div>
      </Card>
    </div>
  );
}

export default ApiTest;
