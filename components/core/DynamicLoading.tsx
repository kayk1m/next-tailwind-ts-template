import dynamic from 'next/dynamic';
const Loading = dynamic(() => import('@components/dynamic/Loading'), {
  loading: () => <p>loading...</p>,
});

export default function DynamicLoading() {
  return <Loading />;
}
