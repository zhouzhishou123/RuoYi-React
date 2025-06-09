import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.notFoundContainer}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={
          <Button type="primary" onClick={handleBackHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
