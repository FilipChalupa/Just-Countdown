import dynamic from 'next/dynamic'
import { FullScreenLoading } from '../components/FullScreenLoading'

const DynamicControl = dynamic(
	() => import('../components/Control').then(({ Control }) => Control),
	{
		loading: () => <FullScreenLoading />,
		ssr: false,
	},
)

export default function Control() {
	return <DynamicControl />
}
