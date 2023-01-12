module.exports = {
	extends: 'next/core-web-vitals',
	plugins: ['react-hooks'],
	rules: {
		'@typescript-eslint/no-empty-function': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
}
