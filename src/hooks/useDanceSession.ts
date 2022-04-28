import * as React from 'react';
import {Pedometer} from 'expo-sensors';
import {Subscription} from 'expo-sensors/build/Pedometer';

const useDanceSession = (stepTarget: number) => {
  const [stepCount, setStepCount] = React.useState<number>(0);
  const [countRemainder, setCountRemainder] =
    React.useState<number>(stepTarget);
  const [stepsFinished, setStepsFinished] = React.useState<boolean>(false);
  const [adjustedCount, setAdjustedCount] = React.useState<number>(0);
  const [pedometerIsAvailable, setPedometerIsAvailable] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    Pedometer.isAvailableAsync().then(result => {
      return setPedometerIsAvailable(result);
    });
  }, []);

  React.useEffect(() => {
    if (countRemainder <= 0) return setStepsFinished(true);
  }, [countRemainder]);

  let bodyMovementSubscription: Subscription | null;

  const startMoving = () => {
    bodyMovementSubscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
      setAdjustedCount(Math.floor(result.steps / 12));
      return;
    });
  };

  const stopMoving = () => {
    setCountRemainder(countRemainder - adjustedCount);
    setStepCount(0);
    setAdjustedCount(0);
    bodyMovementSubscription?.remove();
    bodyMovementSubscription = null;
  };

  return {
    startMoving,
    stopMoving,
    stepsFinished,
    adjustedCount,
    pedometerIsAvailable,
    countRemainder,
    stepCount,
    setAdjustedCount,
  };
};

export default useDanceSession;
