import React from 'react';
import Dropdown from '@components/ui/Dropdown';

import { ChevronDownIcon } from '@heroicons/react/solid';
import { useUI } from '@components/ui/context';
import Button from '@components/ui/Button';
import Select from '@components/ui/Select';

const genders = [
  {
    key: 'gender0',
    label: '선택',
    value: null,
  },
  {
    key: 'gender1',
    label: '남성',
    value: 'male',
  },
  {
    key: 'gender2',
    label: '여성',
    value: 'female',
  },
  {
    key: 'gender3',
    label: '기타',
    value: 'other',
  },
];

const IndexPage = () => {
  const { showModal, closeModal, showNoti } = useUI();
  const [gender, setGender] = React.useState<{
    key: string;
    label: string;
    value: string | null;
  }>(genders[0]);

  return (
    <div className="mx-auto max-w-screen-lg text-2xl pt-4 h-[1200px] flex justify-center">
      {/* <p className="text-xl">hello world</p> */}
      <div className="space-y-4">
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
        <Select
          label="성별"
          items={genders}
          selectedValue={gender.value}
          onSelect={(item) => setGender(item as never)}
        />
        <div>
          <Button
            onClick={() =>
              showModal({
                variant: 'alert',
                title: '댓글을 완전히 삭제할까요?',
                content:
                  '삭제된 댓글은 복구할 수 없습니다. 댓글에 달린 모든 답글도 함께 삭제됩니다.',
                actionButton: {
                  label: '삭제',
                  onClick: () => {
                    closeModal();
                  },
                },
                cancelButton: {
                  label: '취소',
                  onClick: () => closeModal(),
                },
              })
            }
          >
            open alert modal
          </Button>
        </div>

        <div>
          <Button
            onClick={() =>
              showModal({
                title: '댓글을 완전히 복구?',
                content:
                  '복구된 댓글은 삭제할 수 없습니다. 댓글에 달린 모든 답글도 함께 복구됩니다.',
                actionButton: {
                  label: '복구',
                  onClick: () => {
                    closeModal();
                  },
                },
                cancelButton: {
                  label: '취소',
                  onClick: () => closeModal(),
                },
              })
            }
          >
            open modal
          </Button>
        </div>
        <div>
          <Button
            onClick={() => showNoti({ title: '알람입니다.', variant: 'alert' })}
          >
            alert Noti
          </Button>
        </div>
        <div className="space-y-4">
          <Button onClick={() => showNoti({ title: '기본입니다.' })}>
            default Noti
          </Button>
          <div>
            <Button size="sm">작은버튼</Button>
          </div>
          <div>
            <Button size="base">기본버튼</Button>
          </div>
          <div>
            <Button size="lg">큰버튼</Button>
          </div>
          <div>
            <Button full>긴</Button>
          </div>
          <div>
            <Button color="red" size="lg">
              빨간샥버튼
            </Button>
          </div>
          <div>
            <Button color="white">하얀색버튼</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
