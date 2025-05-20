import { useCallback, useEffect, useMemo, useState } from 'react';

const eventHandlers = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'webkitendfullscreen',
  'mozfullscreenchange',
  'MSFullscreenChange',
];

const defaultDocument = typeof document !== 'undefined' ? window.document : undefined;

export const useFullscreen = (
  target?: HTMLElement | undefined,
  options: {
    document?: Document;
    autoExit?: boolean;
  } = {},
) => {
  const { document = defaultDocument, autoExit = false } = options;

  const targetRef = useMemo(() => {
    return target != null
      ? target?.current
      : document == null
        ? null
        : document.querySelector('html');
  }, [target, document]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestMethod = useMemo(() => {
    return [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'webkitEnterFullscreen',
      'webkitEnterFullScreen',
      'webkitRequestFullScreen',
      'mozRequestFullScreen',
      'msRequestFullscreen',
    ].find(m => (document && m in document) || (targetRef && m in targetRef));
  }, [document, targetRef]);

  const exitMethod = useMemo(() => {
    return [
      'exitFullscreen',
      'webkitExitFullscreen',
      'webkitExitFullScreen',
      'webkitCancelFullScreen',
      'mozCancelFullScreen',
      'msExitFullscreen',
    ].find(m => (document && m in document) || (targetRef && m in targetRef));
  }, [document, targetRef]);

  const fullscreenEnabled = useMemo(() => {
    return [
      'fullScreen',
      'webkitIsFullScreen',
      'webkitDisplayingFullscreen',
      'mozFullScreen',
      'msFullscreenElement',
    ].find(m => (document && m in document) || (targetRef && m in targetRef));
  }, [document, targetRef]);

  const fullscreenElementMethod = [
    'fullscreenElement',
    'webkitFullscreenElement',
    'mozFullScreenElement',
    'msFullscreenElement',
  ].find(m => document && m in document);

  const isSupported = useMemo(() => {
    return (
      targetRef &&
      document &&
      requestMethod !== void 0 &&
      exitMethod !== void 0 &&
      fullscreenEnabled !== void 0
    );
  }, [document, requestMethod, exitMethod, fullscreenEnabled, targetRef]);

  const isCurrentElementFullScreen = useCallback(() => {
    if (fullscreenElementMethod) {
      return (document == null ? void 0 : document[fullscreenElementMethod]) === targetRef;
    }
    return false;
  }, [document, fullscreenElementMethod, targetRef]);

  const isElementFullScreen = useCallback(() => {
    if (fullscreenEnabled) {
      if (document && document[fullscreenEnabled] != null) {
        return document[fullscreenEnabled];
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? void 0 : target2[fullscreenEnabled]) != null) {
          return Boolean(target2[fullscreenEnabled]);
        }
      }
    }
    return false;
  }, [document, fullscreenEnabled, targetRef]);
  const exit = async () => {
    if (!isSupported || !isFullscreen) return;
    if (exitMethod) {
      if ((document == null ? void 0 : document[exitMethod]) != null) {
        await document[exitMethod]();
      } else {
        const target2 = targetRef;
        if ((target2 == null ? void 0 : target2[exitMethod]) != null) {
          await target2[exitMethod]();
        }
      }
    }
    setIsFullscreen(false);
  };
  const enter = async () => {
    if (!isSupported || isFullscreen) return;
    if (isElementFullScreen()) {
      await exit();
    }
    const target2 = targetRef;
    if (requestMethod && (target2 == null ? void 0 : target2[requestMethod]) != null) {
      await target2[requestMethod]();
      setIsFullscreen(true);
    }
  };

  const toggle = async () => {
    if (isFullscreen) {
      await exit();
    } else {
      await enter();
    }
  };

  const handlerCallback = useCallback(() => {
    const isElementFullScreenValue = isElementFullScreen();
    if (!isElementFullScreenValue || (isElementFullScreenValue && isCurrentElementFullScreen()))
      setIsFullscreen(isElementFullScreenValue);
  }, [isElementFullScreen, isCurrentElementFullScreen]);

  useEffect(() => {
    if (isSupported) {
      eventHandlers.forEach(event => {
        document?.addEventListener(event, handlerCallback);
      });
    }

    return () => {
      eventHandlers.forEach(event => {
        document?.removeEventListener(event, handlerCallback);
      });
    };
  }, [isSupported, document, handlerCallback]);

  return {
    isFullscreen,
    isSupported,
    enter,
    exit,
    toggle,
  };
};
