export const TaskSidebar: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const section = compact ? 'mb-4' : 'mb-6';
  const title = 'mb-2 text-sm font-semibold';

  return (
    <aside className='rounded-lg border bg-white p-4 shadow-sm dark:bg-dark-bg space-y-6'>
      {/* Progress mini-stats (optional) */}
      <div className={section}>
        <h3 className={title}>Progress</h3>
        {/* <MiniStats tasks={tasks} /> */}
      </div>

      {/* Due Soon (placeholder for now) */}
      <div className={section}>
        <h3 className={title}>Due Soon</h3>
        <ul className='space-y-2 text-sm'>
          <li className='flex items-center justify-between'>
            <span>Check the watering</span>
            <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs'>
              Today
            </span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Prune &amp; deadhead</span>
            <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs'>
              This week
            </span>
          </li>
        </ul>
      </div>

      {/* Manage Defaults (stub) */}
      <div className='flex items-center justify-between'>
        <button className='rounded-lg border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5'>
          Manage Defaults
        </button>
        <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs'>
          2 hidden
        </span>
      </div>
    </aside>
  );
};
