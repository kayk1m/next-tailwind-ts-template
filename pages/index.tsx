import React from 'react';
import NextImage from 'next/image';
import Dropdown from '@components/ui/Dropdown';

import { ChevronDownIcon } from '@heroicons/react/solid';

const IndexPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg text-2xl pt-4">
      {/* <p className="text-xl">hello world</p> */}
      <div>
        <Dropdown
          button={
            <div className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              options
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </div>
          }
          dropdownItems={[
            { label: 'hello', onClick: () => {} },
            { label: 'world', onClick: () => {} },
          ]}
        />
      </div>
    </div>
  );
};

export default IndexPage;
