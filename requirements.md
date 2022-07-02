## Functional Requirements

- [x] Authentication:

  - [x] User must be able to authenticate with login and password;
  - [x] Authentication must return a JWT token;
  - [x] The user should be able to retrieve their data only with the token, if it is still valid;

- [x] User:

  - [x] The user must be able to create an account;
  - [x] The user must be able to change their name and email;
  - [x] The user must be able to change their password;
  - [x] The user must be able to recover their password by email;

## Business Rule

- [x] Authentication:

  - [x] User token must have a maximum duration of 30 min

- [x] User:

  - [x] Only the authenticated user will be able to make changes, being these only in their profile;
  - [x] Password recovery will take place via a URL sent via email where it has a token with a duration of 30 minutes, to which the user can change their password;
