import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';

interface DropdownItem {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface Props {
  button: React.ReactNode;
  dropdownItems: DropdownItem[];
}

const Dropdown: React.FC<Props> = ({ button, dropdownItems }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="rounded-md">{button}</Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
            >
              {dropdownItems.map(({ icon, label, onClick }, idx) => (
                <Menu.Item key={`dropdownItem-${idx}-${label}`}>
                  {({ active }) => (
                    <button
                      className={cn(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'w-full flex items-center px-4 py-2 text-sm',
                      )}
                      onClick={onClick}
                    >
                      {icon}
                      <span className={cn({ 'ml-3': icon !== undefined })}>
                        {label}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
