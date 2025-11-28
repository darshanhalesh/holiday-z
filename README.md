# 🌍 holidayz

<img src="https://github.com/user-attachments/assets/e8059385-3570-49ab-a20b-127ad6b83ada" height=200  width=300 alt="WL"/>

holidayz is a comprehensive travel platform designed for adventurers and explorers who want to discover and share extraordinary places around the world. Built with the powerful MERN (MongoDB, Express, React, and Node.js) stack, holidayz offers a seamless and secure user experience for both casual travelers and serious wanderers.

Our platform allows users to:✨

* Create and Manage Listings: Add new travel destinations with rich details and photos, and keep track of your own adventures.<br>
* Explore Listings: Discover unique spots shared by other users, complete with interactive maps powered by Mapbox.<br>
* Review and Rate Experiences: Share your thoughts on destinations you've visited or learn from the experiences of others through our review system.<br>
* Secure Authentication: Enjoy a safe browsing and sharing environment with user authentication handled by Passport.<br>
* Interactive Maps: Visualize locations effortlessly with Mapbox integration, making it easier to plan your next getaway.<br>
holidayz is all about making travel planning fun, efficient, and collaborative. Whether you’re adding a hidden gem or exploring a bustling city, our platform connects you to a global community of travelers. ✈️✨<br>

Live Link: https://holidayz-2024-tkqf.onrender.com/listing

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">


## 📈 GitHub Repository Stats
| 🌟 **Stars** | 🍴 **Forks** | 🐛 **Issues** | 🔔 **Open PRs** | 🔕 **Closed PRs** | 🛠️ **Languages** | ✅ **Contributors** |
|--------------|--------------|---------------|-----------------|------------------|------------------|------------------|
| ![GitHub stars](https://img.shields.io/github/stars/Soujanya2004/wanderlust-2024) | ![forks](https://img.shields.io/github/forks/Soujanya2004/wanderlust-2024) | ![issues](https://img.shields.io/github/issues/Soujanya2004/wanderlust-2024?color=32CD32) | ![pull requests](https://img.shields.io/github/issues-pr/Soujanya2004/wanderlust-2024?color=FFFF8F) | ![Closed PRs](https://img.shields.io/github/issues-pr-closed/Soujanya2004/wanderlust-2024?color=20B2AA) | ![Languages](https://img.shields.io/github/languages/count/Soujanya2004/wanderlust-2024?color=20B2AA) | ![Contributors](https://img.shields.io/github/contributors/Soujanya2004/wanderlust-2024?color=00FA9A) |

## 📚 Table of Contents
- [🤝 How to Contribute](#-how-to-contribute)
- [🛠️ How to Set Up the Project Locally](#️-how-to-set-up-the-project-locally)
- [📬 Contact](#-contact)
- [👀 Our Valuable Contributors](#-our-valuable-contributors-)
  


 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 
## 🤝 How to Contribute

We welcome contributions to help improve **holidayz**! 🚀 Here’s how you can get involved:

1. **Fork the Repository** 🍴
   - Navigate to the [holidayz GitHub page](https://github.com/Soujanya2004/Wanderlust-2024). 🌐
   - Click on the Fork button in the top-right corner of the page to create a copy of the repository in your GitHub account. ➕

2. **Clone Your Forked Repository** 🔄
   - After forking, clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/Wanderlust-2024.git
     ```
   - Navigate to the project directory:
     ```bash
     cd Holidayz 
     ```

3. **Create a New Branch for Your Changes** 🌿
   - Create a new branch for your feature or fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Your Changes** ✏️
   - Add your desired features, fix bugs, or improve documentation. 🛠️

5. **Add Your Changes to the Staging Area** 📦
   - Stage the files you modified or created:
     ```bash
     git add .
     ```

6. **Commit Your Changes** 📝
   - Commit your changes with a descriptive message:
     ```bash
     git commit -m "Add [feature/fix] - description"
     ```

7. **Push Your Changes** ⬆️
   - Push the changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

## 🛠️ How to Set Up the Project Locally

1. **Clone the Repository** 🔍
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/Wanderlust-2024.git
     ```

2. **Navigate to the Project Directory** 📂
   - Change to the directory where the project is located:
     ```bash
     cd holidayz 
     ```

3. **Set Up Your Mapbox Account** 🌐
   - Go to [Mapbox](https://www.mapbox.com) and sign up for a free account. 🆓
   - After logging in, navigate to the Tokens section under your account settings. 🔑
   - Create a new Access Token and copy it. You will need this for the `.env` file. 📄

4. **Set Up Your Cloudinary Account** ☁️
   - Go to [Cloudinary](https://cloudinary.com) and sign up for a free account. 🆓
   - After logging in, navigate to your Dashboard. 📊
   - Copy your Cloud Name, API Key, and API Secret. You will need these for the `.env` file. 🔐

5. **Ensure `.env` and `node_modules/` Are in `.gitignore`** 🛡️
   - Before proceeding, ensure that both `.env` and `node_modules/` are added to your `.gitignore` file to prevent sensitive information and large files from being uploaded to GitHub. 🚫
   - If they are not already there, add them:
     ```bash
     echo .env >> .gitignore
     echo node_modules/ >> .gitignore
     ```

6. **Create a `.env` File** 🗃️
   - In the root directory of the project, create a `.env` file and add the following variables:
     ```plaintext
     MAP_TOKEN=your-mapbox-access-token
     ATLAS_DB_TOKEN=your-mongodb-connection-uri # mongodb://127.0.0.1:27017/wanderlust for running mongodb server locally
     SECRET=your-secret-key
     CLOUD_NAME=your-cloudinary-cloud-name
     CLOUD_API_KEY=your-cloudinary-api-key
     CLOUD_API_SECRET=your-cloudinary-api-secret
     PORT=8080 # Default port for the server
     ```

7. **Install Dependencies** ⚙️
   - Install the required Node.js dependencies:
     ```bash
     npm install
     ```

8. **Start the Server** 🚀
   - You have two options to start the server:
     - Using `npx nodemon` for auto-restarting:
       ```bash
       npx nodemon
       ```
     - Or using `node app.js` to start the server manually:
       ```bash
       node app.js
       ```

9. **Environment Setup** 🔒
   - Ensure that the `.env` file is not uploaded to GitHub by checking that `.gitignore` includes `.env`. 📜 The following code snippet prevents `.env` from being deployed if you're running in development mode:
     ```javascript
     if (process.env.NODE_ENV !== 'production') {
       require('dotenv').config();
     }
     ```
10. **Set Up Your Chatbase Account** ☁️
    - Go to [Chatbase.co](https://www.chatbase.co/) and sign up for a free account. 🆓
    - After logging in, Create your chatbot. 📊
    - Copy your Scrtpt code snippet, You will need theie for the Chat bot implementation in `boilerplate.ejs` file. 🔐


## Feel free to raise issues and contribute to the repository! 🎉💻

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 
 
## 🤝 Join Our Community of Contributors!

<div align="center">
  <img src="https://github.com/user-attachments/assets/35934e5d-4bf8-4add-908c-3ce47c9b1536" height="200" width="300" alt="Wanderlust Logo"/>
</div>

We're excited to have you on board! Whether you're a seasoned developer or just starting out, your skills and ideas can make a significant impact on **holidayz**. Here’s how you can get involved:

- **Share Your Ideas** 💡: Have a feature in mind? Let us know!
- **Fix Bugs** 🐛: Help us improve the project by identifying and fixing issues.
- **Enhance Documentation** 📚: Clear documentation helps everyone. Your contributions can make it even better!

Every contribution, big or small, is valued and appreciated. Together, we can create an amazing platform for travel enthusiasts! 🌍✨

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">




