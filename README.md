# [StudyScape](https://study-scape.netlify.app/)

<img width="1680" alt="Screenshot 2025-03-11 at 10 33 47 PM" src="https://github.com/user-attachments/assets/412bb936-56fe-49d1-96c7-528df1b3434b" />

## CSE 403 Project Description: 
This project aims to identify, evaluate, and share detailed information about
studying spots on and around the University of Washington campus, providing students
with a comprehensive resource to optimize their study experience. Each study location is
assessed based on key factors such as the hours of operation, walking distance from
central areas, outlet availability, nearby restrooms, and food and drink options.
Additionally, the project evaluates each location’s capacity constraints, noise level, and
accessibility limitations. Reviews and ratings from students, along with photographs, are
provided to offer a clear and relatable perspective of each space from reliable sources.
Overall, this project seeks to empower university students to make informed decisions
about where to study based on their preferences and needs.

## Users and Developers guide
We now have guides in one location! Access the documentation [here](https://docs.google.com/document/d/1rZ31D1uOTsLFKJloVl5T59feAOC0EVws56s-OQ7Rgx0/edit?usp=sharing).

## Toolchain and processes
To build and test the system, make sure to perform `git pull` to obtain the latest information before committing and pushing changes. All files required for testing, as well as the files themselves, are located on this repository. Code is built on the local IDEs of the developers and managed via Git and GitHub Actions.

   1. Clone repository
   2. Open terminal
   3. cd to study-scape
   4. run "npm install"
   5. create ".env.local" file, fill with our supabase credentials
   6. start docker
   7. run "npx supabase start"
   8. run "supabase test db" to test tables and columns
   9. run "supabase stop" to ensure stopping the container

To run the system:

   1. cd to study-scape
   2. run "npm run dev"
   2. Open browser to http://localhost:3000 to see the website!

## Third version release!
   See the [site](https://study-scape.netlify.app/)!
   
   1. Users can now Add Locations!
   2. See location images!
   4. Implemented user auth and profiles with bios!
   5. Added location reviews, ratings, and bookmarks!

## Second version release!
   1. Revamped UI!
   2. Search and filter of locations list
   3. Live site! https://study-scape.netlify.app/

## First version release!
   Use cases that are operational are as follows:
   1. User wants to visually see the locations available and pan around the map for further options.
   2. User wants to see the full list of study locations available (no filters applied)
   3. User wants to access "favorited" spots via the "bookmarks" link at the top-right of the page.


