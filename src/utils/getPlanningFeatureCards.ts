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
      image: '/images/garden-bed-icon.png',
      viewKey: ViewKey.Beds,
    },
    {
      title: 'Plant Log',
      description: `${plantingRecordCount} ${
        plantingRecordCount === 1 ? 'Entry' : 'Entries'
      }`,
      image: '/images/planting-icon.png',
      viewKey: ViewKey.PlantLog,
    },
    {
      title: 'Compost',
      description: `${compostBinCount} ${
        compostBinCount === 1 ? 'Bin' : 'Bins'
      }`,
      image: '/images/compost-icon3.png',
      viewKey: ViewKey.Compost,
    },
    {
      title: 'Tasks',
      description:
        taskCount === 0
          ? 'All caught up'
          : `${taskCompleteCount} of ${taskCount} Done`,
      image: '/images/task-icon.png',
      viewKey: ViewKey.Tasks,
    },
  ];
};
