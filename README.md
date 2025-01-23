# My Blog Project

## Description

This project is a dynamic blog application built using modern web technologies. It includes a robust backend with Node.js and Express.js, and dynamic HTML rendering for the frontend. The application is structured to be modular and maintainable, with features like CRUD operations for posts, reusable templates for the layout, and responsive design.

---

## Features

- **Dynamic Rendering**: Header, footer, and main content dynamically generated with reusable templates.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Responsive Design**: Designed to work seamlessly across devices.
- **Contact Form**: Includes a fully functional contact form.
- **Separation of Concerns**: Organized controllers, models, and routes for better maintainability.
- **Environment Variables**: Securely manages sensitive information with `.env` files.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - TypeScript (with ESM support)
- **Frontend**:
  - HTML5
  - CSS3 (with responsive design)
- **Utilities**:
  - `fs/promises` for file operations
  - Path and URL modules for handling directories
  - Postman for API testing

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/my-blog-project.git
   cd my-blog-project
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary configurations. Example:

   ```env
   PORT=3000
   ```

4. **Run the Application**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
project/
├── controllers/        # Business logic for pages and posts
│   ├── layoutController.ts
│   ├── pageController.ts
│   └── postController.ts
├── models/             # Models representing data structures
│   └── post.ts
├── public/             # Static files like CSS and assets
│   ├── css/
│   │   └── styles.css
│   └── assets/
├── routes/             # Application routes
│   ├── pageRoutes.ts   #Render page index, about, contact, ...
│   └── postsRoutes.ts  #
├── views/              # HTML templates for the layout
│   ├── header.html
│   ├── footer.html
│   ├── 404.html
│   ├── about.html
│   ├── contact.html
├── app.ts              # Main server file
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and dependencies
```

---

## API Endpoints

### General Routes:

- `GET /`: Displays the homepage with the latest posts.
- `GET /about`: Displays the "About Me" page.
- `GET /contact`: Displays the contact form.

### Post Routes:

- `GET /posts`: Retrieves all blog posts.
- `GET /posts/post/:id`: Retrieves a specific blog post by ID.
- `POST /posts`: Creates a new blog post.
- `PUT /posts/post/:id`: Updates a specific blog post by ID.
- `DELETE /posts/post/:id`: Deletes a specific blog post by ID.

---

## Planned Features for Version 1

1. Add CSS improvements for enhanced visual appeal.
2. Render header and footer as reusable components.
3. Upgrade HTML rendering using object-oriented design principles.
4. Add image support for posts.
5. Implement admin and user-specific routes.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

Feel free to reach out if you have any questions or suggestions:

- **Email**: gdevweb@example.com
- **GitHub**: [GDevWeb](https://github.com/GDevWeb)

# My Blog Project

## Description

This project is a dynamic blog application built using modern web technologies. It includes a robust backend with Node.js and Express.js, and dynamic HTML rendering for the frontend. The application is structured to be modular and maintainable, with features like CRUD operations for posts, reusable templates for the layout, and responsive design.

---

## Features

- **Dynamic Rendering**: Header, footer, and main content dynamically generated with reusable templates.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Responsive Design**: Designed to work seamlessly across devices.
- **Contact Form**: Includes a fully functional contact form.
- **Separation of Concerns**: Organized controllers, models, and routes for better maintainability.
- **Environment Variables**: Securely manages sensitive information with `.env` files.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - TypeScript (with ESM support)
- **Frontend**:
  - HTML5
  - CSS3 (with responsive design)
- **Utilities**:
  - `fs/promises` for file operations
  - Path and URL modules for handling directories
  - Postman for API testing

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/my-blog-project.git
   cd my-blog-project
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary configurations. Example:

   ```env
   PORT=3000
   ```

4. **Run the Application**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
project/
├── controllers/        # Business logic for pages and posts
│   ├── layoutController.ts
│   ├── pageController.ts
│   └── postController.ts
├── models/             # Models representing data structures
│   └── post.ts
├── public/             # Static files like CSS and assets
│   ├── css/
│   │   └── styles.css
│   └── assets/
├── routes/             # Application routes
│   ├── generalsRoutes.ts
│   └── postsRoutes.ts
├── views/              # HTML templates for the layout
│   ├── header.html
│   ├── footer.html
│   ├── 404.html
│   ├── about.html
│   ├── contact.html
├── app.ts              # Main server file
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and dependencies
```

---

## API Endpoints

### General Routes:

- `GET /`: Displays the homepage with the latest posts.
- `GET /about`: Displays the "About Me" page.
- `GET /contact`: Displays the contact form.

### Post Routes:

- `GET /posts`: Retrieves all blog posts.
- `GET /posts/post/:id`: Retrieves a specific blog post by ID.
- `POST /posts`: Creates a new blog post.
- `PUT /posts/post/:id`: Updates a specific blog post by ID.
- `DELETE /posts/post/:id`: Deletes a specific blog post by ID.

---

## Planned Features for Version 1

1. Add CSS improvements for enhanced visual appeal.
2. Render header and footer as reusable components.
3. Upgrade HTML rendering using object-oriented design principles.
4. Add image support for posts.
5. Implement admin and user-specific routes.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

Feel free to reach out if you have any questions or suggestions:

- **Email**: gdevweb@example.com
- **GitHub**: [GDevWeb](https://github.com/GDevWeb)
