Sonia Emporium - Luxury Fashion E-commerce Platform

Overview
Sonia Emporium is a luxury fashion e-commerce application designed to provide a premium shopping experience for users. This application features a fully responsive design, comprehensive user and admin functionalities, and Firebase integration for database management, authentication, and dynamic content rendering. 


Features
User Features
-Shop Page: Explore luxury fashion items by category (Luxury Dresses, Resort Wear, Haute Couture, Bespoke Suits, and Accessories).
- Product Details: View detailed information about products and related recommendations.
- Cart Management: Add, update quantities, and remove items from the cart. The total price is dynamically calculated, including a 10% delivery fee.
- Checkout: Secure checkout functionality that requires user authentication. Collects delivery details and payment preferences.
- Profile Management: View personal information like name and email. Option to log out.
- Appointment Booking: Book appointments for personalized fashion consultations.

Admin Features
- Admin Dashboard: 
  - Access all collections in the database.
  - Manage inventory (add, delete, or update items).
  - Cancel bookings.
  - Delete users.
  - View sales data, including total revenue, items sold, and number of sales.
- Authentication: Restricted access to the admin dashboard with specific credentials (`admin@sonia.com` / `sonia123`).

Responsive Design
- Mobile, tablet, and desktop-friendly layouts for all pages.


Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Firebase (Firestore, Authentication)
- Testing: Jest

Pages and Functionalities
1. Home Page
   - Showcases the brand and highlights featured collections.

2. Shop Page
   - Displays categories in a scrollable sidebar.
   - Dynamically loads products from Firebase Firestore.

3. Product Details Page
   - Displays details about a selected product.
   - Recommends similar items based on the product's category.

4. Cart Page
   - Lists selected items with their details.
   - Calculates total price, including a delivery fee.
   - Allows users to update quantities or remove items.

5. Checkout Page
   - Collects delivery address, payment method, and other details.
   - Accessible only to logged-in users with a non-empty cart.

6. Profile Page
   - Displays user information and provides a logout option.

7. Contact Us Page
   - Allows users to book appointments for item personalization.

8. Admin Dashboard
   - Accessible only to admin users.
   - Manage inventory, bookings, and user data.
   - View sales statistics.


Setup and Installation
Requirements
- Node.js
- Firebase Project

Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/sonia-emporium.git
   cd sonia-emporium
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project and configure Firestore, Authentication, and Rules.
   - Replace the Firebase configuration in `firebaseConfig.js` with your project settings.

4. Start the application:
   ```bash
   npm start
   ```

5. Run unit tests:
   ```bash
   npm test
   ```

Firebase Configuration
Ensure Firebase Firestore is set up with the following collections:
- `products`: Stores product details.
- `cart`: Tracks items added by each user.
- `users`: Contains user profiles.
- `checkout`: Stores completed purchase details.
- `booking`: Tracks user appointment bookings.


Admin Credentials
- Email: `admin@sonia.com`
- Password: `sonia123`


Testing
- Jest is used to validate all key functionalities, including:
  - Product loading and filtering.
  - Cart operations (add, update, remove).
  - Checkout process.
  - Admin functionalities (inventory and bookings management).
  - User authentication.
