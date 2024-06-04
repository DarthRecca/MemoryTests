import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import other Firebase services as needed

console.log(process.env)

const FirebasePlugin = {
	install(app) {
		const firebaseConfig = {
			apiKey: process.env.firebase_api_key,
			authDomain: process.env.firebase_auth_domain,
			databaseURL: process.env.firebase_database_URL,
			projectId: process.env.firebase_project_id,
			storageBucket: process.env.firebase_storage_bucket,
			messagingSenderId: process.env.firebase_messaging_sender_id,
			appId: process.env.firebase_app_id,
			measurementId: process.env.firebase_measurement_id
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
