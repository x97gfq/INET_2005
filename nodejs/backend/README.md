# INET 2005 – MFlix Movies API (Node.js + Express + MongoDB)

A minimal REST-style API your students can run locally against the **sample_mflix** database. It uses **Express** and the official **MongoDB Node.js driver**.

## What is an API? What is an endpoint?

- **API (Application Programming Interface)**: a contract that lets one piece of software talk to another. On the web, we often expose **HTTP**-based APIs.
- **Endpoint**: a specific URL + HTTP method (like `GET /api/movies`) that performs an action (fetch, create, update). Think of endpoints like function names you can call over HTTP.

## Endpoints (all `GET`)

- `GET /api/health` – service heartbeat.
- `GET /api/movies` – list movies with pagination and optional filters.
  - Query params: `page` (default `1`), `limit` (default `20`),
    `title` (partial, case-insensitive), `actor` (partial), `year` (number), `genre` (partial).
  - Sorting: `sort` (e.g. `title`, `year`), `order` (`asc|desc`).
- `GET /api/movies/:id` – fetch one movie by its MongoDB **ObjectId**.
- `GET /api/movies/search/:title` – quick title search.
- `GET /api/movies/actor/:name` – search by cast member.
- `GET /api/movies/year/:year` – filter by release year.
- `GET /api/movies/genre/:genre` – filter by genre.

### Examples

```http
GET http://localhost:3000/api/movies?limit=5&title=matrix
GET http://localhost:3000/api/movies/actor/keanu
GET http://localhost:3000/api/movies/genre/sci
GET http://localhost:3000/api/movies/year/1999
GET http://localhost:3000/api/movies/673a4f3f0f9f2d36a86b3a01
```

## Prereqs

- Node.js 18+ (or your Docker image with Node)
- Local MongoDB with the **sample_mflix** dataset (connection string defaults to `mongodb://localhost:27017`).

## Setup & Run

```bash
cp .env.example .env
npm install
npm start
# API at http://localhost:3000
```

If your MongoDB uses a different connection string or DB name, edit `.env`.

## Notes for teaching

- The code uses **regex** for partial, case-insensitive searches on `title`, `cast`, and `genres`.
- `GET /api/movies/:id` shows **path params** and validating **ObjectId**.
- Encourage students to add indexes for performance (e.g., `title`, `cast`, `genres`, `year`) if they grow this further.

## Postman

A Postman collection is included in `postman/INET2005-MFlix-API.postman_collection.json`. Import it into Postman and set the `baseUrl` variable if needed.

---

## Async/Await 101

JavaScript is single-threaded, so long-running tasks (like database queries) are handled asynchronously using Promises. `async`/`await` is a modern way to work with these Promises in a clean, readable manner.

### ✅ What is `async`/`await`?

- `async` marks a function as asynchronous and ensures it returns a Promise.
- `await` pauses the execution of an `async` function until the Promise resolves.

### ✅ Why use it?

- Makes asynchronous code look synchronous.
- Easier to read and maintain.
- Works seamlessly with `try/catch` for error handling.

### ✅ Example: Without `async/await` (using `.then()`)

```js
moviesCollection.findOne({ title: 'Matrix' })
  .then(doc => console.log(doc))
  .catch(err => console.error(err));
```

### ✅ Same example with `async/await`:

```js
async function getMovie() {
  try {
    const doc = await moviesCollection.findOne({ title: 'Matrix' });
    console.log(doc);
  } catch (err) {
    console.error(err);
  }
}
```

# Promises in JavaScript

A **Promise** in JavaScript is an object that represents the eventual **result of an asynchronous operation**. It acts like a placeholder for a value that you don’t have yet but will get in the future (or an error if something goes wrong).

---

### ✅ States of a Promise
A Promise can be in one of three states:
1. **Pending** – The operation hasn’t finished yet.
2. **Fulfilled** – The operation completed successfully (resolved).
3. **Rejected** – The operation failed (error).

---

### ✅ Why use Promises?
Before Promises, developers used **callbacks**, which often led to “callback hell” (deeply nested code). Promises make async code easier to manage and chain.

---

### ✅ Example

```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data loaded!");
    // or reject("Something went wrong");
  }, 1000);
});

fetchData
  .then(result => console.log(result))  // runs if resolved
  .catch(error => console.error(error)); // runs if rejected
```

### ✅ How does `async/await` relate?
`async/await` is **syntactic sugar** over Promises. Instead of chaining `.then()` and `.catch()`, you can write code that looks synchronous:

```js
async function loadData() {
  try {
    const result = await fetchData;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

---

*Dataset reference:* MongoDB sample dataset **MFlix** (database: `sample_mflix`, collection: `movies`).
