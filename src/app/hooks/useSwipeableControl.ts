import { useSwipeable } from "react-swipeable";

type SwipeDirection = "left" | "right" | "up" | "down";

type UseSwipeableControlProps = {
  onSwipe?: (direction: SwipeDirection) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  delta?: number;
};

export function useSwipeableControl({
  onSwipe,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  delta = 30,
}: UseSwipeableControlProps) {
  return useSwipeable({
    onSwipedLeft: () => {
      onSwipe?.("left");
      onSwipeLeft?.();
    },
    onSwipedRight: () => {
      onSwipe?.("right");
      onSwipeRight?.();
    },
    onSwipedUp: () => {
      onSwipe?.("up");
      onSwipeUp?.();
    },
    onSwipedDown: () => {
      onSwipe?.("down");
      onSwipeDown?.();
    },
    delta,
    trackTouch: true,
    trackMouse: false,
  });
}
