import { Card, Col, Row, Typography } from 'antd';
import styles from './dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.bannerSection}>
        <div className={styles.bannerContent}>
          <Typography.Title level={2}>RuoYi-React后台管理框架</Typography.Title>
          <Typography.Paragraph className={styles.description}>
            RuoYi-React 是一个基于 RuoYi-Vue 思想的前后端分离的后台管理系统，使用React18 +
            NestJS技术栈构建。提供了完善的权限管理、组织架构、系统监控等功能，适用于企业级中后台管理系统快速开发。不需要学习
            Umi Ant Design Pro Dva即可上手，系统陆续在更新，欢迎提出建议！
          </Typography.Paragraph>
          <div className={styles.techStack}>
            <Typography.Title level={4}>技术选型：</Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>前端框架：</Typography.Text> React 18
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>路由系统：</Typography.Text> React Router v6
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>状态管理：</Typography.Text> Redux Toolkit
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>UI组件库：</Typography.Text> Ant Design 5.x
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>后端框架：</Typography.Text> NestJS
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>数据库：</Typography.Text> MySQL
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>构建工具：</Typography.Text> Vite
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.techCard}>
                  <Typography.Text strong>语言：</Typography.Text> TypeScript
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <div>
          <img src="/dashboard-banner.svg" alt="RuoYi Admin Dashboard" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
