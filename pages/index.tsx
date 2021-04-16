import React from 'react';
import NextImage from 'next/image';

const IndexPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg text-2xl pt-4">
      <p className="text-xl">hello world</p>
      <NextImage
        src="/images/preparing.png"
        layout="intrinsic"
        width={500}
        height={463}
      />
    </div>
  );
};

export default IndexPage;
