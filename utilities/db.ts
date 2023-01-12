import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
	apiKey: 'AIzaSyAFRhXa-Ee7NedXKui45AndsNH-7l9Ntrg',
	authDomain: 'just-countdown.firebaseapp.com',
	databaseURL: 'https://just-countdown.firebaseio.com',
	projectId: 'just-countdown',
	storageBucket: 'just-countdown.appspot.com',
	messagingSenderId: '830337397960',
	appId: '1:830337397960:web:650a8f8bc4e933d78461fd',
})

export const db = getFirestore(app)
