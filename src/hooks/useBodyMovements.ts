import * as React from 'react';
import {Pedometer} from 'expo-sensors';
import {
  PedometerUpdateCallback,
  Subscription,
} from 'expo-sensors/build/Pedometer';

const useBodyMovements = () => {
  const [bodyMovementCount, setBodyMovementCount] = React.useState<number>(0);
  const [pedometerIsAvailable, setPedometerIsAvailable] =
    React.useState<boolean>(false);

  let movementsSubscription: Subscription | null;

  React.useEffect(() => {
    Pedometer.isAvailableAsync().then(result => {
      console.log('Pedometer Result', result);
      return setPedometerIsAvailable(result);
    });
  }, []);

  const startMoving = async () => {
    movementsSubscription = Pedometer.watchStepCount(result => {
      console.log('result', result);
      return setBodyMovementCount(result.steps);
    });
  };

  const stopMoving = async () => {
    if (movementsSubscription) {
      movementsSubscription.remove();
    }
    return (movementsSubscription = null);
  };

  return {bodyMovementCount, startMoving, stopMoving, pedometerIsAvailable};
};

export default useBodyMovements;
