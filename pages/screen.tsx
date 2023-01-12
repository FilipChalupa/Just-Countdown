import dynamic from 'next/dynamic'
import { FullScreenLoading } from '../components/FullScreenLoading'

const DynamicScreen = dynamic(
	() => import('../components/Screen').then(({ Screen }) => Screen),
	{
		loading: () => <FullScreenLoading />,
		ssr: false,
	},
)

export default function Screen() {
	return <DynamicScreen />
}
