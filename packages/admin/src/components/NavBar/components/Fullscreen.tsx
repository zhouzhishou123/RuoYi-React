import SvgIcon from '../../SvgIcom/SvgIcon';
import { useFullscreen } from '../../../hooks/useFullscreen';

const Fullscreen: React.FC = () => {
  const { isFullscreen, toggle } = useFullscreen();

  return (
    <div style={{ marginRight: '15px', cursor: 'pointer' }}>
      <SvgIcon onClick={toggle} name={isFullscreen ? 'exit-fullscreen' : 'fullscreen'} />
    </div>
  );
};

export default Fullscreen;
