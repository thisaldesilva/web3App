# ANZ Skill Test Application

This section of the repository (monolithic - repo) contains a backend of a blockchain-Powered agricultural Supply Chain Prototype application done using NestJS, organized into several modules, each focusing on a specific domain of functionality. Below is an overview of the top-level directories and their components.

## Directories

### Auth Module
Handles authentication-related functionalities.
- **Controller**: Manages incoming requests related to authentication.
- **Service**: Contains the business logic for authentication operations.
- **Module**: Orchestrates the authentication-related components.
- **dto**: Data Transfer Objects for authentication requests.
- **Schemas**: Database schemas for authentication data.
- **strategies**: Implementation of authentication strategies (JWT).

### Common Module
Includes shared utilities, and middleware used across the application (rabbitMQ, smart-contract-service etc).

### Config Module
Contains configuration files and settings for various environments (development, production, etc.).


### Orders Module
Responsible for order management.
- **Controller**: Handles requests related to orders.
- **Service**: Contains business logic for managing orders.
- **Module**: Groups all order-related components.
- **dto**: Data Transfer Objects for order operations.
- **Schemas**: Database schemas for order data.

### Users Module
Manages user-related functionalities.
- **Controller**: Manages incoming requests related to users.
- **Service**: Contains the business logic for user operations.
- **Module**: Groups all user-related components.
- **dto**: Data Transfer Objects for user operations.
- **Schemas**: Database schemas for user data.

## Data Validation and DTOs as Interfaces

In this application, Data Transfer Objects (DTOs) are extensively used for data validation and also act as interfaces.

### Using DTOs for Data Validation
DTOs are equipped with decorators from libraries like `class-validator`, enabling robust runtime validation of data. This ensures that incoming data, such as API request payloads, adheres to the defined structure and constraints before being processed. By utilizing DTOs in this way, the application enhances its reliability and security.

### DTOs as Interfaces
While traditionally interfaces are used to define the shape of data, in our NestJS application, DTOs also fulfill this role. They provide compile-time type checking and are extended with runtime validation features, thus often replacing the need for separate interfaces. This approach simplifies the codebase and reduces redundancy.
