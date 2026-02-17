import { BASE_PATH } from '../constants/basePath';
import { Bed, PlanningFeatureCard, Task, ViewKey } from '../types/types';

export const getPlanningFeatureCards = (
  beds: Bed[],
  plantingRecordCount: number,
  compostBinCount: number,
  tasks: Task[],
): PlanningFeatureCard[] => {
  const taskCompleteCount = tasks.filter((task) => task.completed).length;
  const taskCount = tasks.length;

  return [
    {
      title: 'Beds',
      description: `${beds.length} Active`,
      image: `${BASE_PATH}/images/garden-bed-icon.png`,
      viewKey: ViewKey.Beds,
    },
    {
      title: 'Plant Log',
      description: `${plantingRecordCount} ${
        plantingRecordCount === 1 ? 'Entry' : 'Entries'
      }`,
      image: `${BASE_PATH}/images/planting-icon.png`,
      viewKey: ViewKey.PlantLog,
    },
    {
      title: 'Compost',
      description: `${compostBinCount} ${
        compostBinCount === 1 ? 'Bin' : 'Bins'
      }`,
      image: `${BASE_PATH}/images/compost-icon3.png`,
      viewKey: ViewKey.Compost,
    },
    {
      title: 'Tasks',
      description:
        taskCount === 0
          ? 'All caught up'
          : `${taskCompleteCount} of ${taskCount} Done`,
      image: `${BASE_PATH}/images/task-icon.png`,
      viewKey: ViewKey.Tasks,
    },
  ];
};
