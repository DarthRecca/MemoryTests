import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import other Firebase services as needed

const FirebasePlugin = {
	install(app) {
		const firebaseConfig = {
			apiKey: import.meta.env.VITE_firebase_api_key,
			authDomain: import.meta.env.VITE_firebase_auth_domain,
			databaseURL: import.meta.env.VITE_firebase_database_url,
			projectId: import.meta.env.VITE_firebase_project_id,
			storageBucket: import.meta.env.VITE_firebase_storage_bucket,
			messagingSenderId: import.meta.env.VITE_firebase_messaging_sender_id,
			appId: import.meta.env.VITE_firebase_app_id,
			measurementId: import.meta.env.VITE_firebase_measurement_id
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
