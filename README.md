# Angular Lazy Pagination with MatPaginator

**This project demonstrates lazy loading pagination of a 10,000 items using:**

- Angular (frontend) with Angular Material's MatPaginator
- Spring Boot (backend) serving paginated data from a static JSON file (db.json)

**Features**
- Angular Material Table with Pagination
- Server-side paginated data loading (1000 records per request)
- Dynamic disabling of the Next button when all data is loaded
- Display of next data block only when on you click on "Next Page Button" on the last page of the paginator.
- Backend reads from resources/db.json and serves paginated slices

**How It Works**
- Data is loaded in chunks of 1000 via the DemoService.
- When the user navigates to the last page of currently loaded data, the component:
  * Detects this using pageIndex and data.length.
  * Calls loadProducts() to fetch the next 1000 on clicking "Next Page Button".
- Data is appended to the existing datasource.
- The Next button is dynamically disabled when all data has been loaded.


**Technologies Used**
- Angular 15
- Angular Material
- Spring Boot 3.4.5
- Java 17
