import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import other Firebase services as needed

const FirebasePlugin = {
	install(app) {
		const firebaseConfig = {
			apiKey: 'AIzaSyDaiNAm8P2kssBmqHQrYbZXfmAvZPjF6iQ',
			authDomain: 'memorytests-2788d.firebaseapp.com',
			databaseURL: 'https://memorytests-2788d-default-rtdb.firebaseio.com',
			projectId: 'memorytests-2788d',
			storageBucket: 'buckets/memorytests-2788d.appspot.com',
			messagingSenderId: '843804225888',
			appId: '1:843804225888:web:5d755d447c43a782edae05',
			measurementId: 'G-8KK4E4E1RE'
		};

		const firebaseApp = initializeApp(firebaseConfig);
		const fireStore = getFirestore(firebaseApp);

		// Add Firebase services to the Vue app instance
		app.config.globalProperties.$firebaseApp = firebaseApp;
		app.config.globalProperties.$auth = getAuth(firebaseApp);
		app.config.globalProperties.$fireStore = fireStore;
	}
};

export default FirebasePlugin;
