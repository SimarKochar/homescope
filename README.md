# HomeScope

HomeScope is a modern real estate listing web application focused on housing predictability and property listings near VIT Bhopal. The frontend is built with React.js and demonstrates advanced features for property browsing, filtering, comparison, and more—all with a user-friendly, responsive interface.

![HomeScope Homepage](image.png)

## Features

- **Browse Properties:** View featured and all available properties.
- **Property Details:** See address, price (in INR), beds, baths, sqft, and description for each listing.
- **Filtering & Sorting:** Filter by minimum bedrooms, sort by price or bedrooms, and search by address/description keywords.
- **Favorites:** Save favorite properties using browser local storage and view them on a dedicated page.
- **Property Comparison:** Compare up to 3 properties side-by-side.
- **Dark/Light Mode:** Toggle between dark and light themes.
- **Mortgage Calculator:** Calculate estimated monthly payments (EMI) in INR.
- **Rent Estimation (ML Model):** Estimate property rent using a Python machine learning form (see below).
- **Chatbot Interface:** Basic chatbot functionality for user queries.
- **Responsive Design:** Works across devices with modern UI.
- **Routing:** Seamless navigation via React Router DOM.
- **Modals:** Login/Sign Up forms shown in modals (placeholders).
- **Google Maps:** Embedded map on the contact page.

## Machine Learning Rent Estimator

HomeScope integrates a Python-based machine learning form to estimate the rent of properties in the region.  
- **Local Dataset:** The training data for the rent estimation model was **manually collected** from properties in Kothri, Ashata, and Sehore areas.
- **Usage:** Users can input property features into the form, and the model provides an estimated rent based on local trends.
- **Integration:** The ML form runs locally; for usage instructions, see below.

### Running the Rent Estimator (Locally)

1. **Navigate to the ML directory:**
    ```bash
    cd ml_rent_estimator
    ```
2. **Install Python dependencies:**  
    (Recommended: Use a virtual environment)
    ```bash
    pip install -r requirements.txt
    ```
3. **Start the ML form (example using Flask):**
    ```bash
    python app.py
    ```
4. **Interact with the form:**  
    Open [http://localhost:5000](http://localhost:5000) in your browser.

> **Note:** The ML model uses local features (beds, baths, sqft, location, etc.) and is designed for the Kothri, Ashata, Sehore region. The dataset was manually gathered and curated for accurate results.

## Getting Started

Follow these steps to run HomeScope locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)
- [Python 3.x](https://python.org/) (for rent estimator)

### Installation & Running

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SimarKochar/homescope.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd homescope
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Start the development server:**
    ```bash
    npm start
    ```

The application will open at `http://localhost:3000` in your browser.

## Available Scripts

- `npm start` — Runs the app in development mode.
- `npm test` — Launches the test runner.
- `npm run build` — Builds the app for production.
- `npm run eject` — Removes the single build dependency (rarely needed).

## Built With

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS (with CSS Variables for theming)
- Create React App
- **Python (Flask, scikit-learn, pandas) for ML rent estimator**

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

Maintainer: SimarKochar  
Project Link: [https://github.com/SimarKochar/homescope](https://github.com/SimarKochar/homescope)
