# VisionCare Clinic - Frontend

This is the official frontend repository for the **VisionCare Clinic** web application. It is built with React and Tailwind CSS, providing a complete patient-facing website that includes service discovery, appointment booking, and a secure patient portal.

## 🚀 Key Features

* **Modern Homepage:** A clean, professional landing page featuring a full-width hero slider that highlights key services.
* **Dynamic Service Pages:** A browsable grid of all clinic services, where each service links to its own dynamically generated detail page.
* **Centralized Data:** All website content (services, doctor profiles) is managed in a single, easy-to-edit file (`src/api/clinicData.js`).
* **Doctor Profiles:** Service detail pages automatically display the specific doctors who are responsible for that service.
* **Patient Portal:**
    * A combined Login / Register modal for patient authentication.
    * A private dashboard for logged-in patients to view their profile and appointment history.
* **Appointment Booking:** A full booking form for new and existing patients to request an appointment.

## 🛠 Tech Stack

* **React:** Main JavaScript library for building the UI.
* **React Router (`react-router-dom`):** Handles all client-side navigation and dynamic routing (e.g., `/service/:slug`).
* **Tailwind CSS:** Utility-first CSS framework for styling all components.
* **Swiper.js:** Used to power the "big banner" hero slider on the homepage.
* **Vite:** Frontend build tool and development server.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your machine.

### Installation & Running

1.  **Clone the repo:**
    ```bash
    git clone <your-repo-url-here>
    ```

2.  **Navigate to the frontend folder:**
    ```bash
    cd RIM_SDE_PROJECT/vision_care_clinic/frontend
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running on `http://localhost:5173` (or the next available port).

## 📁 Project Structure

Here is a high-level overview of the `src` directory to help you find your way around.

```
frontend/
├── public/
│   └── images/       # 📸 All static images (slider backgrounds, doctor photos) go here.
│
└── src/
    ├── api/
    │   └── clinicData.js # ⭐️ MOST IMPORTANT FILE! All text content, doctor info, and service details are here.
    │
    ├── components/
    │   ├── common/     # Header.jsx, Footer.jsx
    │   └── ui/         # All other components (HeroSlider.jsx, Services.jsx, AppointmentForm.jsx, etc.)
    │
    ├── pages/
    │   ├── AppointmentBooking.jsx  # This is the MAIN HOME PAGE (at path '/')
    │   ├── DashboardPage.jsx       # The patient's private dashboard (at path '/dashboard')
    │   ├── ServiceDetailPage.jsx   # The template for a single service (at path '/service/:slug')
    │   └── LandingPage.jsx         # ⚠️ NOTE: This is the Login/Register MODAL, not a full page.
    │
    ├── styles/           # Global CSS and tailwind.config.js
    │
    └── App.jsx           # 🚦 The main router. It controls which page is shown based on the URL.
```

## ✏️ How to Contribute & Edit Content

This project is set up to be very easy to edit. **You almost never need to change the component `.jsx` files to update content.**

### How to Add/Edit a Doctor

1.  Add the doctor's photo to `public/images/`.
2.  Open **`src/api/clinicData.js`**.
3.  Add a new object to the `export const doctors = [...]` array.
4.  To assign them to a service, add their new `id` to the `doctorIds: []` array for the correct service in the `export const services = [...]` array.

### How to Add/Edit a Service

1.  Open **`src/api/clinicData.js`**.
2.  Add a new object to the `export const services = [...]` array.
3.  Fill in the `slug` (the URL), `icon`, `title`, `desc`, and `longDescription`.
4.  Assign existing doctors to it using the `doctorIds: []` array.

### How to Change the Hero Slider

1.  Add your new slider image to `public/images/`.
2.  Open **`src/components/ui/HeroSlider.jsx`**.
3.  Change the `const slideImages = {...}` object to point to your new image file.
4.  You can change which services are featured by editing the `const featuredServices = ...` filter.