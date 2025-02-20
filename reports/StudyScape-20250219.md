# Study Scape Status Report 2/19/2025

## Project Status

### Meeting Agenda
Continue work on website. CRUD implementation

### Goals for the week
Have skeleton of the project in the GitHub, ensure basic build and environments set up and functional.

### Progress and issues
We finished up our BETA implementation of the website, and finished our presentation. Has a working map, some markers, and limited study locations. 

### Goals for next week
Start implementing some more advanced features, and finish fully connecting the backend, frontend, and map. Add more locations. Search for existing datasets.

## Individual Status

### Goals for the week
- Dawn: Figure out how to have user schema store profile information, login information. Help Carl in general implementation of Supabase to StudyScape, add UUIDs to locations schema for uniqiuely IDing study spots.
- Sanjana: Further implement UI layout for beta release and work to get it connected to back end. 
- Michael: work towards beta release, get a basic map created with the first test waypoints.
- Carl: Have tables with appropriate columns created for the database base on a schema. Work with test project with testing, auth, and data store, implement basic Supabase functionality to StudyScape (~1 week)
- Brandon: Have a working map for the beat with limited markers for study spots.
- Julie: Add more features to the beta UI Layout with Sanjana.


### Progress and issues
- Michael: along with Brandon got a working MapBox map, with the correct boundaries and some markers. Worked on the presentation.
- Brandon: got a working MapBox map and markers. Presented beta in class.
- Carl: Implemented supabse SSR with cookies for 'show all locations' and 'bookmarks' lists with manual locations data from backend, updated schema to better reflect location's needs especially accessibility. Expanded database testing with pgTAP.
- Dawn: Presented beta in class today and wrote up the README.md file for it, might continue to hard-code data values into the schemas; catching up on documentation and contributing to codebase a bit slow this past week due to exams. Will bug Carl about what to do exactly.
- Sanjana: Worked on basic UI layout and beta release presentation.
- Julie: Worked on the beta UI Layout and beta release presentation.


### Goals for next week
- Michael: Either work on the GPS aspect, or custom markers. Have the markers connect with the locations automatically, rather than having to manually make markers. 
- Brandon: link marker components to backend and frontend for more interactivity and scalability.
- Carl: Implement data creation and inserting operations to backend from frontend. Refine data fetching and incorporate possible locations datasets to import for database. Improve current testing and automate new testing.
- Dawn: After implementation of Supabase to StudyScape, figure out how to have schema store and display information from users' reviews.
- Sanjana: Keep implementing UI layout and set up fetch requests for backend data.
- Julie: Make more features to the website.
