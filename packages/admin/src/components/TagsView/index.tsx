import { useAppDispatch, useAppSelector } from '@/store';
import { removeTagView, setTagsView } from '@/store/appSlice';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useMemo } from 'react';
import { RootState } from '@/store';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import styles from './tagsView.module.scss';

function TagsView() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
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
    <div className={styles.tagsViewContainer}>
      {sortedTagsView.map(item => (
        <div
          key={item.pathname}
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
