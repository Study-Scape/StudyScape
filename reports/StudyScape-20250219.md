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
- Dawn:
- Sanjana: Further implement UI layout for beta release and work to get it connected to back end. 
- Michael: work towards beta release, get a basic map created with the first test waypoints.
- Carl: Have tables with appropriate columns created for the database base on a schema. Work with test project with testing, auth, and data store, implement basic Supabase functionality to StudyScape (~1 week)
- Brandon: Have a working map for the beat with limited markers for study spots.
- Julie: Make a beta UI Layout with Sanjana and link it with backend.


### Progress and issues
- Michael: along with Brandon got a working MapBox map, with the correct boundaries and some markers. Worked on the presentation.
- Brandon: got a working MapBox map and markers. Presented beta in class.
- Carl: Implemented supabse SSR with cookies for 'show all locations' and 'bookmarks' lists with manual locations data from backend, updated schema to better reflect location's needs especially accessibility. Expanded database testing with pgTAP.


### Goals for next week
- Michael: Either work on the GPS aspect, or custom markers. Have the markers connect with the locations automatically, rather than having to manually make markers. 
- Brandon: link marker components to backend and frontend for more interactivity and scalability.
- Carl: Implement data creation and inserting operations to backend from frontend. Refine data fetching and incorporate possible locations datasets to import for database. Improve current testing and automate new testing.


> ## Format
> Each status report must be a markdown file and must include the following two sections:
> 1. Project status (status update for your TA, including an agenda for the project meeting)  
> 2. Progress and plans of each individual team member.  
>  
> Both sections should have the following three subsections. Each subsection is best organized as bullet points:
> - Goals for the week. The first subsection is easy. It should be an exact copy of the third section from last week (i.e., goals from a week ago). It can be empty for the first week. 

> - Progress and issues. The second subsection should report on progress and issues: what you did, what worked, what you learned, where you had trouble, and where you are blocked.

> - Goals for next week. The third subsection should outline your plans and goals for the following week. Each bullet point should include a measurable task and a time estimate (no longer than a week). If tasks from one week aren’t yet complete, they should roll over into tasks for the next week with an updated estimate for time to completion. For the project status, this third subsection should be higher-level and indicate who is responsible for what tasks. Also, it’s good to include longer-term goals in this list as well, to keep the bigger picture in mind and plan beyond just the next week.