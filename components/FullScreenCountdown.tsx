import clsx from 'clsx'
import * as React from 'react'
import { KeepAwake } from 'react-keep-awake'
import { useIsIframe } from '../utilities/useIsIframe'
import styles from './FullScreenCountdown.module.sass'

export interface FullScreenCountdownProps {
	children: React.ReactNode
}

export const FullScreenCountdown: React.FunctionComponent<
	FullScreenCountdownProps
> = (props) => {
	const isIframe = useIsIframe()

	return (
		<>
			<div className={clsx(styles.wrapper, isIframe && 'is-iframe')}>
				{props.children}
			</div>
			<KeepAwake />
		</>
	)
}
