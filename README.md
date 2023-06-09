## MVP

- Register
- Login
- Log out
- should have "Trello like" base
- Using Cards as habit trackers
  - add counter
  - redirect to a new view when clicked on
- On top right should appear a summary of the habits and the total amount
- Card should redirect to a new view

# Logged out

- Can see the default habits but cant interact with the Cards

# Login

- Functionality to add habits to our list

# Model user

- name
- username
- password

# Model Card

- Title
- Image
- Counter

# Summary

- array of id's

## Bonus

- Delete account
- Add functionality to the Cards
- Categories for habits
- Calendar display

/\*

User
Habit --> CRUD
-- title
-- description
-- picture
-- category ["health", "sports", "nutrition"]

Options:
a. all habits are public (similar to what we did in class)
b. habits are private for each user
-- we need to store who created a habit ex. owner
-- when we display the list of habits, we need to filter those for current user
c. when signup, user can choose from list of habits + they can add their own

\*/
