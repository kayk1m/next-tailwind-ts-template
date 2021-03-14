import React from 'react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';

interface Props {
  className?: string;
  label?: string;
  items: SelectItem[];
  currentItem: SelectItem;
  onSelect: (item: SelectItem) => void;
}

// https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
const Select: React.FC<Props> = ({
  className,
  label,
  items,
  currentItem,
  onSelect,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(
    items.findIndex((item) => item.value === currentItem.value), // the index of highlighted item. (hover or keyboard event)
  );

  React.useEffect(() => {
    const handler = () => {
      if (open) setOpen(false);
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [open]);

  React.useEffect(() => {
    // highlighten currentItem on open
    if (open) {
      const newIndex = items.findIndex(
        (item) => item.value === currentItem.value,
      );
      setIndex(newIndex);
    }
  }, [items, currentItem, open]);

  const handleSelectItem: (item: SelectItem) => void = React.useCallback(
    (item) => {
      onSelect(item);
      // if (closeOnSelect) setOpen(false);
    },
    [onSelect],
  );

  return (
    <div className={className} {...props}>
      {label !== undefined && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className={cn(
            'bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm',
            'focus-visible:ring-1 focus:border-primary',
          )}
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (!open) return;

            e.preventDefault();

            switch (e.key) {
              case 'Escape':
                setOpen(false);
                break;
              case 'ArrowUp':
                setIndex((prev) => Math.max(prev - 1, 0));
                break;
              case 'ArrowDown':
                setIndex((prev) => Math.min(prev + 1, items.length - 1));
                break;
              case 'Home':
                setIndex(0);
                break;
              case 'End':
                setIndex(items.length - 1);
                break;
              case 'Enter':
                handleSelectItem(items[index]);
                setOpen(false);
                break;
              default:
                break;
            }
          }}
          // TODO: close onBlur?
        >
          <span className="block truncate">{currentItem.label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {/* <!-- Heroicon name: solid/selector --> */}
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <Transition
          className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
          show={open}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {items.map((item, idx) => (
              <li
                key={`selectItem-${item.label}-${idx}`}
                id={`${label ?? 'listbox'}-option-${idx}`}
                role="option"
                className={cn(
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                  {
                    'text-white bg-primary': idx === index,
                    'text-gray-900': idx !== index,
                  },
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectItem(item);
                }}
                onMouseEnter={() => setIndex(idx)}
              >
                <span
                  className={cn('block truncate', {
                    'font-semibold': item.value === currentItem.value,
                    'font-normal': item.value !== currentItem.value,
                  })}
                >
                  {item.label}
                </span>
                {item.value === currentItem.value && (
                  <span
                    className={cn(
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                      {
                        'text-white': idx === index,
                        'text-primary': idx !== index,
                      },
                    )}
                  >
                    {/* <!-- Heroicon name: solid/check --> */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default Select;
