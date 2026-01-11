import { Spinner } from '@/shared/ui';

export default function Loading() {
	return (
		<div className='flex justify-center items-center h-full'>
			<Spinner />
		</div>
	);
}
