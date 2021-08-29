/**
 * @template PageComponent
 */

import { useState } from 'react';

import { Button } from '@components/ui';

import { fetcher } from '@lib/fetcher';
import { useModal } from '@lib/hooks/use-modal';
import { useNoti } from '@lib/hooks/use-noti';

export default function IndexPage() {
  const { showModal, closeModal } = useModal();
  const { showNoti, showAlert } = useNoti();
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-screen-lg text-2xl pt-4 h-[1200px] flex justify-center">
      {/* <p className="text-xl">hello world</p> */}
      <div className="space-y-4 w-full">
        <div
          className="w-20 h-20 bg-black sm:bg-red-500 md:bg-yellow-500 lg:bg-blue-500 xl:bg-green-500 2xl:bg-blue-500"
          aria-hidden="true"
        />
        <div
          className="w-20 h-20 bg-black/40 sm:bg-red-500/40 md:bg-yellow-500/40 lg:bg-blue-500/40 xl:bg-green-500/40 2xl:bg-blue-500/40"
          aria-hidden="true"
        />
        <div className="w-20 h-20 bg-gradient-to-br from-black/40 to-white/60" aria-hidden="true" />
        <div>
          <Button
            color="red"
            onClick={() =>
              showModal({
                variant: 'alert',
                title: '댓글을 완전히 삭제할까요?',
                content:
                  '삭제된 댓글은 복구할 수 없습니다. 댓글에 달린 모든 답글도 함께 삭제됩니다.',
                actionButton: {
                  label: 'Delete',
                  onClick: closeModal,
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
                  label: 'Restore',
                  onClick: closeModal,
                },
              })
            }
          >
            open modal
          </Button>
        </div>
        <div>
          <Button
            color="white"
            onClick={() => showNoti({ title: '알람입니다.', variant: 'alert' })}
          >
            alert Noti
          </Button>
        </div>
        <div className="space-x-4">
          <Button
            onClick={() => {
              fetcher.get('/api').text().then(setResult).catch(showAlert);
            }}
          >
            STATUS
          </Button>
          <Button
            color="red"
            onClick={() => {
              fetcher.get('/api/error').text().then(setResult).catch(showAlert);
            }}
          >
            ERROR
          </Button>
          <Button
            color="white"
            onClick={() => {
              setResult(null);
            }}
          >
            CLEAR
          </Button>
        </div>
        <p className="text-lg">{result || 'null'}</p>
      </div>
    </div>
  );
}
