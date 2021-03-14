import React from 'react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';

interface Props {
  className?: string;
  defaultLabel?: string;
  items: SelectItem[];
  currentItem?: SelectItem | null;
  onSelect: (item: SelectItem) => void;
}

const Dropdown: React.FC<Props> = ({
  className,
  defaultLabel = 'Options',
  items,
  currentItem,
  onSelect,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      e.preventDefault();
      if (open) setOpen(false);
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [open]);

  const handleSelectItem: (item: SelectItem) => void = React.useCallback(
    (item) => {
      onSelect(item);
      // setOpen(false);
    },
    [onSelect],
  );

  return (
    <div
      className={cn(className, 'relative inline-block text-left')}
      {...props}
    >
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (open && e.key === 'Escape') setOpen(false);
        }}
        // TODO: close onBlur?
      >
        {currentItem ? currentItem.label : defaultLabel}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition
        show={open}
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="py-1 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {items.map((item) => (
            <a
              key={`dropdownItem-${item.label}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                handleSelectItem(item);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </Transition>
    </div>
  );
};

export default Dropdown;
