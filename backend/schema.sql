USE FinanceTracker;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(25) NOT NULL UNIQUE,
    avatar INT NOT NULL, 
    password VARCHAR(255) NOT NULL
);

CREATE TABLE incomes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    amount INT NOT NULL,
    date DATETIME NOT NULL,
    fixed BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	name VARCHAR(30) NOT NULL,
    budget INT NOT NULL,
    expense INT NOT NULL,
    color VARCHAR(15) NOT NULL,
    icon JSON NOT NULL, 
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
	amount INT NOT NULL,
	date DATETIME NOT NULL,
    fixed BOOLEAN DEFAULT false,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (category_id) REFERENCES categories(id) 
);
