import { useSoilRecordContext } from '../../../../context/SoilRecordContext';
import { getSoilTestStatusCounts } from '../../../../utils/getSoilTestStatusCounts ';

export const SoilTestStatus: React.FC = () => {
  const { soilRecords } = useSoilRecordContext();

  const bedsTested = soilRecords.filter(
    (record) => record.tests && record.tests.length > 0,
  ).length;

  return (
    <div className='rounded-lg border border-neutral-200 p-4 flex flex-col n'>
      <h3 className='text-sm font-bold text-[#c28b3c]'> Tests</h3>

      <ul className='mt-3 space-y-2 text-sm text-neutral-800'>
        <li className='flex justify-between'>
          <span>Beds tested</span>
          <span>
            {bedsTested} / {soilRecords.length}
          </span>
        </li>

        <li className='flex justify-between'>
          <span>Beds needing nutrients</span>
          <span>
            {getSoilTestStatusCounts(soilRecords).needsNutrientsCount || 0}
          </span>
        </li>
      </ul>
    </div>
  );
};
