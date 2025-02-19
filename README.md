# StudyScape
CSE 403 Project
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

## Toolchain and processes
To build and test the system, make sure to perform `git pull` to obtain the latest information before committing and pushing changes. All files required for testing, as well as the files themselves, are located on this repository. Code is built on the local IDEs of the developers and managed via Git and GitHub Actions.

To run the system:
1. Clone repository
2. Open terminal
3. cd to study-scape
4. create .env.local with our supabase credentials
5. "npm install"
6. "npm run dev"
7. Open browser to http://localhost:3000 to see the website!

## First version release!
As of the latest commits, the exact use cases outlined in our project requirements from earlier are not operational. However, a more basic form of these use cases are operational as follows:
   1. User wants to visually see the locations available and pan around the map for further options.
   2. User wants to see the full list of study locations available (no filters applied)
   3. User wants to access "favorited" spots via the "bookmarks" link at the top-right of the page.