import { AllFilterButton } from '../../Dashboard/plan/plantLog/AllFiltersButton';
import { MultiSelect } from '../MultiSelect';
import { useState } from 'react';
import { FilterController, FilterGroupConfig } from './filterConfig';
import { Dropdown } from '../Dropdown';

interface FilterBarProps {
  groups: FilterGroupConfig[];
  controller: FilterController;
  bgAccent: string;
  onOpenFilters: () => void;
  altCheckedBgAccent?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  groups,
  controller,
  bgAccent,
  onOpenFilters,
  altCheckedBgAccent,
}) => {
  type PanelKey = string;

  const [openKey, setOpenKey] = useState<PanelKey | null>(null);
  const toggle = (key: PanelKey) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };
  const closeAll = () => setOpenKey(null);

  return (
    <div className='flex items-center gap-2 flex-wrap mb-6'>
      {groups.map((group) => {
        if (group.type === 'multi') {
          const selectedIds = (controller.values[group.key] as string[]) ?? [];
          const optionItems = group.options.map((optionId) => ({
            id: optionId,
            label: optionId,
          }));

          return (
            <MultiSelect
              key={group.key}
              label={`All ${group.label}`}
              options={optionItems}
              selectedIds={selectedIds}
              onChange={(nextIds) => controller.setValue(group.key, nextIds)}
              open={openKey === group.key}
              onButtonClick={() => toggle(group.key)}
              onClose={closeAll}
              bgAccent={bgAccent}
              altCheckedBgAccent={altCheckedBgAccent}
            />
          );
        }

        return (
          <Dropdown
            key={group.key}
            label={`All ${group.label}s`}
            value={(controller.values[group.key] as string) ?? null}
            options={group.options}
            bgAccent={bgAccent}
            onChange={(newSelection) =>
              controller.setValue(group.key, newSelection)
            }
            open={openKey === group.key}
            onButtonClick={() => toggle(group.key)}
            onClose={closeAll}
          />
        );
      })}

      <AllFilterButton onClick={onOpenFilters} />
      <button
        type='button'
        onClick={() => {
          controller.clearAll();
          closeAll();
        }}
        disabled={!controller.hasActive}
        className='px-3 py-2 text-sm text-gray-700 font-bold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#478143] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Clear
      </button>
    </div>
  );
};
