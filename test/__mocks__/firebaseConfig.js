// __mocks__/firebaseConfig.js
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";

export const db = initializeTestEnvironment({
  projectId: "sonia-emporium-test",
}).then(env => env.firestore());
 