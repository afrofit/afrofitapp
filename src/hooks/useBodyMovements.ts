import * as React from 'react';
import {Pedometer} from 'expo-sensors';
import {Subscription} from 'expo-sensors/build/Pedometer';

type MovementCacheType = {
  [key: number]: number;
};

const useBodyMovements = (targetBodyMoves: number) => {
  const [bodyMovementCount, setBodyMovementCount] = React.useState<number>(0);

  const [restarts, setRestarts] = React.useState<number>(0);
  const [cache, setCache] = React.useState<MovementCacheType>(
    {} as MovementCacheType,
  );

  const [pedometerIsAvailable, setPedometerIsAvailable] =
    React.useState<boolean>(false);

  let movementsSubscription: Subscription | null;

  React.useEffect(() => {
    Pedometer.isAvailableAsync().then(result => {
      return setPedometerIsAvailable(result);
    });
  }, []);

  React.useEffect(() => {}, [bodyMovementCount]);

  const startMoving = async () => {
    console.log('Starting movement');
    setRestarts(prevValue => prevValue + 1);
    cache[restarts] = bodyMovementCount;
    movementsSubscription = Pedometer.watchStepCount(result => {
      setBodyMovementCount(result.steps);
      return;
    });
  };

  const stopMoving = async () => {
    console.log('Stopping movement...');
    if (movementsSubscription) {
      movementsSubscription.remove();
    }
    return (movementsSubscription = null);
  };

  return {
    bodyMovementCount,
    startMoving,
    stopMoving,
    pedometerIsAvailable,
  };
};

export default useBodyMovements;
