import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './forbidden.module.scss';

function Forbidden() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.forbiddenContainer}>
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问此页面"
        extra={
          <Button type="primary" onClick={handleBackHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default Forbidden;
