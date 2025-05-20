import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useMemo } from 'react';
import { Link, useMatches } from 'react-router-dom';
function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
  );
}

function Breadcrumb() {
  const matches = useMatches();
  const items = useMemo(() => {
    return matches
      .filter(match => match.handle?.menuName)
      .map(match => {
        return {
          title: match.handle?.menuName,
          path: match.pathname,
        };
      });
  }, [matches]);
  return <AntdBreadcrumb itemRender={itemRender} items={items} />;
}

export default Breadcrumb;
