import {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useScrollEventsHandlersDefault } from './useScrollEventsHandlersDefault';
import { workletNoop as noop } from '../utilities';
import type { Scrollable } from '../types';
import { NativeScrollEvent } from 'react-native';

export const useScrollHandler = (
  useScrollEventsHandlers = useScrollEventsHandlersDefault,
  onScroll?: (event: NativeScrollEvent) => void
) => {
  // refs
  const scrollableRef = useAnimatedRef<Scrollable>();

  // variables
  const scrollableContentOffsetY = useSharedValue<number>(0);

  // hooks
  const {
    handleOnScroll = noop,
    handleOnBeginDrag = noop,
    handleOnEndDrag = noop,
    handleOnMomentumEnd = noop,
    handleOnMomentumBegin = noop,
  } = useScrollEventsHandlers(
    scrollableRef,
    scrollableContentOffsetY,
    onScroll
  );

  // callbacks
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: handleOnScroll,
      onBeginDrag: handleOnBeginDrag,
      onEndDrag: handleOnEndDrag,
      onMomentumBegin: handleOnMomentumBegin,
      onMomentumEnd: handleOnMomentumEnd,
    },
    [
      handleOnScroll,
      handleOnBeginDrag,
      handleOnEndDrag,
      handleOnMomentumBegin,
      handleOnMomentumEnd,
    ]
  );

  return { scrollHandler, scrollableRef, scrollableContentOffsetY };
};
