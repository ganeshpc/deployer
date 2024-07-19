# Deployer Project

## Overview:
**Deployer** is a web application designed to streamline the deployment process of React projects. By simply logging into the platform and providing a GitHub repository URL, users can deploy their React applications efficiently. The system leverages a microservices architecture to manage the complexities of deployment, ensuring a scalable and maintainable solution.

## Architecture:

### API Server:

* **Role**: Manages user authentication, project details, and deployment processes.
* **Technology**: Node.js
Responsibilities:
* **User management**: Registration, login, and authentication.
* **Project management**: CRUD operations for user projects.
Deployment handling: Initiating and tracking deployment processes.

### Build Server:

* **Role**: Handles the core deployment tasks by fetching, building, and storing React projects.
* **Technology**: Node.js
* **Responsibilities**:
GitHub Integration: Receives GitHub repository URLs via Kafka, clones repositories, and initiates builds.
* **Build Process**: Compiles the React application.
* **Storage**: Pushes the built application to an AWS S3 bucket.
* **Logging**: Sends build logs to MongoDB via Kafka, which the API server retrieves and displays to the user.
* **Deployment**: Uses AWS ECS to spin up containers for each deployment, ensuring isolated and efficient application environments.

### S3 Reverse Proxy:

* **Role**: Serves static content from S3 buckets to users.
* **Technology**: Node.js
* **Responsibilities**:
Efficiently retrieves and serves static files.
Provides a scalable solution for serving application assets.
* **Technologies**:
  * **Frontend**: React.js
  * **Backend Services**: Node.js
  * **Inter-service Communication**: Apache Kafka
  * **Database**: PostgreSQL for application data, MongoDB for build logs
* **Deployment**: AWS ECS for container management, AWS S3 for static file storage
Workflow:

## Workflow

### User Interaction:

* Users log in to the Deployer platform.
* Users submit a GitHub repository URL of their React project.
* Project Handling:

### Project Handling
* The API server receives the repository URL and stores project details.
* A message is sent to the Build Server via Kafka.
Build and Deployment:

### Build and Deployment
* The Build Server clones the repository and builds the React application.
* The built files are pushed to an AWS S3 bucket.
* The Build Server logs the build process and sends these logs to MongoDB via Kafka.
The API server retrieves the logs and displays them to the user.

### Serving the Application:

* The S3 Reverse Proxy serves the static files from the S3 bucket to end-users.
Key Features:

## Key Features

* **Automated Deployment**: Simplifies the deployment process by automating the building and hosting of React applications.
* **Scalable Architecture**: Uses microservices to handle different aspects of the deployment process, ensuring scalability and maintainability.
* **Real-time Logging**: Provides real-time build logs to users, enhancing transparency and debugging capabilities.
* **Efficient Resource Management**: Uses AWS ECS for container management, ensuring efficient resource utilization.

## Future Enhancements:

* **Multi-environment Support**: Introduce staging and production environments.
* **Extended Framework Support**: Expand support to other front-end frameworks like Vue.js and Angular.

Deployer aims to simplify the deployment process for developers, providing a robust and scalable platform for deploying React applications with minimal hassle. By leveraging modern technologies and best practices, Deployer ensures efficient, reliable, and secure application deployments.
