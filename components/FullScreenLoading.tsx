import { CircularProgress } from '@mui/material'
import type { FunctionComponent } from 'react'
import styles from './FullScreenLoading.module.css'

export const FullScreenLoading: FunctionComponent = () => {
	return (
		<div className={styles.wrapper}>
			<CircularProgress size={100} />
		</div>
	)
}
