import React, { CSSProperties } from 'react';
import './SvgIcon.css';

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  prefix?: string;
  color?: string | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  spin?: boolean;
}

export default function SvgIcon({
  name,
  prefix = 'icon',
  color = '#333',
  size,
  className = '',
  style = {},
  spin = false,
  ...props
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`;

  // 定义主题颜色
  const themeColors = {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
  };

  // 处理颜色值
  const fillColor = themeColors[color as keyof typeof themeColors] || color;

  // 计算样式
  const svgStyle: CSSProperties = {
    width: size ? (typeof size === 'number' ? `${size}px` : size) : '1em',
    height: size ? (typeof size === 'number' ? `${size}px` : size) : '1em',
    verticalAlign: '-0.15em',
    fill: 'currentColor',
    overflow: 'hidden',
    ...style,
  };

  // 旋转动画类名
  const spinClass = spin ? 'svg-icon-spin' : '';

  return (
    <svg
      {...props}
      aria-hidden="true"
      className={`svg-icon ${spinClass} ${className}`}
      style={svgStyle}
    >
      <use href={symbolId} fill={fillColor} />
    </svg>
  );
}
