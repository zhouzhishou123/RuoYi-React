import { useAppDispatch, useAppSelector } from '@/store';
import { removeTagView, setTagsView } from '@/store/appSlice';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useRef } from 'react';
import { RootState } from '@/store';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import styles from './tagsView.module.scss';

function TagsView() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTagRef = useRef<HTMLDivElement>(null);

  const tagView = useMemo(() => {
    return matches.findLast(item => item.pathname === location.pathname);
  }, [matches, location.pathname]);
  const tagsView = useAppSelector((state: RootState) => state.app.tagsView);
  const sortedTagsView = useMemo(() => {
    return [...tagsView].sort((a, b) => {
      if (a.pathname === '/') return -1;
      if (b.pathname === '/') return 1;
      return 0;
    });
  }, [tagsView]);

  // 滚轮横向滚动处理函数
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      // 阻止默认的垂直滚动行为
      e.preventDefault();

      // 计算滚动距离，根据滚轮方向决定滚动方向
      const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;

      // 执行横向滚动
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 滚动到活动标签
  useEffect(() => {
    if (activeTagRef.current && containerRef.current) {
      // 获取容器和活动标签的位置信息
      const container = containerRef.current;
      const activeTag = activeTagRef.current;
      const containerWidth = container.offsetWidth;
      const activeTagLeft = activeTag.offsetLeft;
      const activeTagWidth = activeTag.offsetWidth;

      // 计算滚动位置，使活动标签居中显示
      const scrollLeft = activeTagLeft - containerWidth / 2 + activeTagWidth / 2;

      // 平滑滚动到计算的位置
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (tagView?.handle?.menuName) {
      dispatch(
        setTagsView({
          ...tagView,
          title: tagView.handle?.menuName,
          path: tagView.pathname,
        }),
      );
    }
  }, [location.pathname, dispatch, tagView]);

  return (
    <div className={styles.tagsViewContainer} ref={containerRef} onWheel={handleWheel}>
      {sortedTagsView.map(item => (
        <div
          key={item.pathname}
          ref={item.pathname === location.pathname ? activeTagRef : null}
          className={
            item.pathname === location.pathname
              ? `${styles.tagsViewItem} ${styles.active}`
              : styles.tagsViewItem
          }
          onClick={() => {
            if (item.pathname !== location.pathname) {
              navigate(item.pathname);
            }
          }}
        >
          {item.title}
          {item.pathname !== '/' && (
            <CloseOutlined
              style={{
                color: item.pathname === location.pathname ? '#fff' : '#000',
              }}
              className={styles.closeIcon}
              onClick={e => {
                e.stopPropagation();
                dispatch(removeTagView(item.pathname));
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
export default TagsView;
