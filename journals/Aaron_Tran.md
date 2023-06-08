## 6/7/23

Back-end deployment up
Fixed mixed content error by removing "/" present in some routes
Refractored code to hold images in public/static/img
Debugged spinner with Matt (Got it to reset to sponsored list everytime we reset | Changed the way spinner displayed selected choice so that it doesn't override other potential choices)

## 6/6/23

Got front-end and back-end deployment
Pipelines are now working
Managed to fix front-end deployment to actually render our page

## 6/5/23

Helped Luis try to refactor code to grab data for edit restaurant
Working on ci/cd deployment
Helped Matt figure out / debug the last part of our main functionality (filtering with friend’s lists)
Got the lists to filter correctly !!
Started deployment
Got stuck on linting → Installed black → Fixed unused errors
Got stuck with unit-test pipeline → Realized we don’t add it
Did not deploy → Need copy authenticator

## 6/3/23

Sick sad

## 6/2/23

Helped Luis refractor his code to display different instances of restaurant lists depending if the user clicks on their own restaurant lists vs. friends’ restaurant lists
Helped Justin with useUser (profile picture in top corner)
Helped Debug Spinner
Classes were being replaced by variants in Tailwind that didn’t allow the spinner to render
Helped Matt with grabbing userData → Need ID to grab other data (ended up using useUser)
Connected Delete Restaurant List and Edit Restaurant List to Profile Page
Made parts of the page responsive to changes in screen size
Helped to prepopulate form information inside of Edit Restaurant List

## 6/1/23

Set-up initialized data with postgres database
Helped Luis connect created restaurants to restaurant list (SQL backend)
Helped Justin brainstorm front-end design for main page & fix form errors for signin/signup
Helped justin switch nav links to make it ci/cd ready
Helped Luis get delete functionality on restaurants
Helped justin figure out ternary operators to show different navbars for logged in vs logged out users
Finished 2 unit tests (GET and POST request)

## 5/31/23

Figuring out how to initialize postgres database with data that we need (cuisines & sponsored restaurants)
Helped brainstorm connection for a more user friendly interface for the restaurant creation
Helped debug SQL statements for restaurant lists

## 5/30/23

Meeting with each team member to check-in with progress / blockers
Assigned Tasks for Team members (trying to match with their interests)
Matt:
Figure out how to stop spinner
Will collaborate to figure out main filtering portion
Luis:
Filter Restaurant List
Connect Restaurant List to correct Restaurant Form
Justin:
Finish Restaurant Form
Design all forms
Made friend’s list scrollable based on amount of friends content
Made endpoints to edit profile / get a specific set of information for users
Made a front-end form that enables users to change profile picture and edit their account information (i.e. first name, last name, password, profile picture)
Needed 2 new endpoints
Further designed friend’s list and profile pages (for both self and friends)

## 5/29/23

Debugged messed-up Main branch
Reverted Git branch
Deleted duplicate package.json
Previous edits to the tailwind.config.js was messing with styling
Had to redo a few pages where code was missing
Started designing front-end friend’s list
Helped Justin
Go through tailwind.config.js and how to download new packages via Docker Desktop
Double checked his installations
Met with Matt to discuss spinning animation

## 5/28/23

Added functionality that allows users to make friend requests to other users with a registered username
Added search functionality to look through list of current friends & list of restaurant lists
Helped Justin brainstorm edit profile functionality & with git pipeline

## 5/26/23

Added functionality that allows users to delete a friend through their friend’s profile card
Edited SQL create friend requests to check for if friend_requests already exists from another user (to prevent duplicate friend requests from being sent)
Edited SQL delete friends endpoint to include deletion of friend request instance to allow for users to add each other as friends again in the future
Installed Headless UI and utilized its functionality to create a modal template that would alert user’s of their attempt at deleting a friendship instance
Created modals that holds user’s friend requests
Created clickable components that allow users to accept or reject friend requests

## 5/25/23

Added an endpoint to restaurant_list to pull in restaurant data by user_id
Helped Justin debug his front-end component
Worked with Matt to brainstorm filtering SQL queries for main function
Finished delete functionality for friends (front-end)
Finished display for friend requests
Edited friendships endpoint to remove “accepted” friend request when a user deletes another user off their friend’s list
Allows users to re add each other as friends if the scenario arises
Clickable accept / reject friend requests

## 5/24/23

Finished base profile page
Worked with token to pull information from backend

## 5/23/23

Started working on front-end auth with Matt
Helped debug endpoints for Justin
Debugged git error on my 36 branch
Managed to get through the error and finish front-end auth
Successfully got front-end auth to allow permissions to pull data from secured endpoints

## 5/22/23

Helped Justin debug and finish his POST endpoint (as a starting guide for his endpoint )
Started exploring tailwind → Made a little guideline for the friends page

## 5/21/23

Finished Base Endpoints for:
Friend Requests: POST make friend request
User can make friend request with another user’s username
Friend Requests: PUT accept / reject friend request
Edited GET Friend Requests to only pull for “pending” friend requests

## 5/20/23

Started on endpoints for Friends and Friend Requests
Planning out how endpoints fit into front-end components
Finished Base Endpoints for:
Friends: GET all friends
Friends: DELETE friend
Friend Requests: GET all friend requests

## 5/18/23

Finished base authentication (i.e. sign up, login) with JWTdown for FastAPI

## 5/17/23

Figured out a format to connect our stories and features for issues in gitlab
Split up writing SQL table tasks to teammates
Reconvened and walked through each table to make sure data structures were correct
Helped each individual push their changes onto Gitlab
Pulled down all SQL queries created to test functionality
Debugged SQL queries and made sure docker containers ran with those new migration files

## 5/16/23

Separated our MVP into small features
Designated teammates to work on writing base issues for gitlab
Set-up dockerfile
Managed to connect to beekeeper to our postgres database

## 5/15/23

Checked in with group mates to decide SQL vs. NoSQL
Decided on SQL
Explained new normalized SQL data models to team mates
Created templates for endpoints
Delegated teammates to do specific endpoints
Did research on how to implement friends & friend requests
Started templates for User Stories

## 5/14/23

Did Research on SQL vs. NoSQL
Deemed SQL to be better with how our project is set up
Did more research on SQL and how to implement the different relationship types (one-to-one, one-to-many, many-to-many)
Normalized the data based on the new concepts I learned

## 5/9/23

Started designing wireframes
