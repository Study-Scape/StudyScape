# Study Scape Status Report 2/26/2025

## Project Status

### Meeting Agenda
1. Beta++ and guides
2. Readying for deployment

### Goals for the week
Implement more advanced features of: user adding, user updating, and bookmarking locations. Improve map component with markers with data and interactivity. Manually add most popular study locations to database leave rest to user base. Implement unique user sessions with auth for personal bookmarks. Search for existing locations datasets.

### Progress and issues
Now using trunk-based development workflow for Git that solved issues with keeping unneccsary branches and merge conflicts/re-commits in main.

### Goals for next week
First production build deployed.

## Individual Status

### Goals for the week
- Carl: Improve current testing and automate that new testing. Transition to full-stack dev to build CRUD features. Improve UI/UX.
- Dawn: After implementation of Supabase to StudyScape, figure out how to have schema store and display information from users' reviews.
- Julie: More UI implementations and fleshing out the features we have, and brainstorming more features to be implemented.
- Michael: Either work on the GPS aspect, or custom markers. Have the markers connect with the locations automatically, rather than having to manually make markers. 
- Brandon: link marker components to backend and frontend for more interactivity and scalability.


### Progress and issues
- Carl: Modularized all locations sheet into a component. Implemented Supabase's Realtime API for database inserts and updates to rows. Implemented Supabase client and server components.
- Dawn: Progress has been hindered due to exams but will get back up to speed around the end of the week hopefully. Did help out with outlining and uploading the user and developer guides. Updated Supabase schemas to reflect current needs.
- Julie: I made pseudo profile page and made the UI of booksmarks page better.
- Michael: made an initial gps feature for the map, and added name markers and longitude and latitude for the markers, which directly pull from Supabase.
- Brandon: worked on connnecting markers to backend to pull name and location to automatically display on map. 

### Goals for next week
- Carl: Refine data creation and inserting to database from frontend. Implement location images to front and backend. Deploy a production build and host the webapp.(~1 week)
- Dawn: Refine data creation and inserting to database from frontend. Implement location images to front and backend. (aka try to help Carl)
- Julie: Make more UI implementations and think of other features to code.
- Michael: add more information to the markers, and refine the gps system. 
- Brandon: Add more information to markers and maybe add interaction with frontend location list.