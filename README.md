# Senior Enrichment Project Replay

Make a thing **again**!

## Getting started

1. Fork and clone this repo
2. *Set the name of your project in `package.json`*. The skeleton intentionally ships with an invalid name.
3. `npm install`
4. Start the build and the application processes with: `npm run start:dev`
5. If you navigate to the URL you should see some UI already :) [We already have some connection code to get you started]

## Requirements

### The Premise
 Design a website for aircraft fanatics 🤓 and create a RESTful API that allows you to manage these aircrafts!

### The tools

Use at least Sequelize, Express, React, Redux, and React-Redux when creating this app. You can incorporate any additional libraries or tools you wish.

### DB Design

#### Aircrafts
  * have profile info including:
    * make - not empty or null (e.g. Lockheed Martin - for more [makers](https://en.wikipedia.org/wiki/List_of_aircraft_manufacturers)) ** done **
    * model - not empty or null (ex. [Lockheed models](https://en.wikipedia.org/wiki/List_of_Lockheed_aircraft)) ** done **
    * year - after 1903 👵 * done *
    * type - can be either Attack, Bomber, Versatile, Transport, Reconoissance or Rescue ** done **
    * cost - decimal stored in millions (i.e. $1 million would be 1 in the database) ** done **
    * imageUrl - has default value ** done **
    * description - extremely large text ** done **
  * must track the aircraft it succeeds via a reference called 'succeeded'
  * must be assigned to a country ** done **
  * must have a method `getAircraftByType`, that gets aircrafts by inputted type ** done **
  * must have a method to change the `cost` of 1 to $1,000,000 when retrieving records ** done **

#### Countries
  * have profile info including:
    * name - not empty or null ** done **
    * GFI - decimal between 0 - 10 (global firepower index) ** done **
    * flagUrl - has a default value ** done **
  * can have many aircrafts assigned (may have none) ** done **
  * must have a method `getTopFive` which finds the top 5 strongest nations sorted by GFI (0 is the strongest, 10 is the weakest) ** done **

### Views and Functionality

- Navigation: as a user I...
  * will land on **Home** by default ** done **
  * can navigate to **Countries** from **Home** ** done **
  * can navigate to **Aircrafts** from **Home** ** done **
  * can navigate to view a top 5 **Single Country** from **Home** (see `Views` below for more details) ** done **
  * can navigate to view a **Single Country** from **Countries** ** done **
  * can navigate to view a **Single Aircraft** from **Aircrafts**
  * can navigate to view a **Single Aircraft** from **Single Country** (for any aircraft that the country owns)
  * can navigate to view an aircrafts' **Single Country** from **Single Aircraft**

- Views: as a user I...
  * see a navbar in every view ** done **
  * see a scoreboard of the top 5 countries, in order, measured by GFI (Global Firepower Index - 0 is strongest(top), 10 is the weakest(bottom)) on the **Home** view ** done **
  * see a list of all countries on the **Countries** view ** done **
  * see a list of all aircrafts on the **Aircrafts** view ** done **
  * see details about a country on the **Single Country** view, including that country's aircrafts
  * see details about an aircraft on the **Single Aircraft** view, including that aircrafts' country

- Actions: as a user I...
  * can create a country
  * can edit a country's info, including adding/removing an aircraft to/from that country
  * can delete a country
  * can create an aircraft
  * can edit an aircraft's info, including the country that owns the aircraft
  * can delete an aircraft

### Routes

```
GET
- all countries  /* done */
  - populated with aircrafts

- a country by id /* done */
  - populated with aircrafts
  - excluding the description of the aircraft

- top 5 countries /* done */
  - by GFI (0 is strongest (top), 10 is weakest (bottom))
  - sorted strongest to weakest

- all aircrafts /* done */
  - populated with the name of the country that owns each aircraft
  - excluding the descriptions

- an aircraft by id
  - populated with only the name of the country that owns the aircraft
```

```
POST  /* done */
- new country
- new aircraft
```

```
PUT /* done */
- update country info for one country
- update aircraft info for one aircraft
```

```
DELETE /* done */
- a country
  - deletes all aircrafts associated with the country
- an aircraft
```

### How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE :
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect


## Video Walkthrough

Please submit a 3-minute screencast of a walk-through of the functionality *and code* (focus mostly on code) for each user story in your app. E.g. for "As a user, I can create a campus", please show us that you can successfully create a campus in your app, and also the actual code that is involved in doing that (from the front-end components to the backend routes and models). We recommend using Quicktime to record the screencast (instructions on how to do that [here](https://support.apple.com/kb/PH5882?locale=en_US&viewlocale=en_US)).

Once you've recorded your screencast, please *upload it to YouTube as an unlisted video*. Email `academics@fullstackacademy.com` with the title `Senior Enrichment Submission: [Your Name]` and include your repo link and YouTube recording link. This will aid us in evaluating your submission.

## Evaluation
[Rubric](https://docs.google.com/document/d/1opwC-nuzmc84jTZqpQn1hsXiMxWSpkK_TwQAOHEEbEs/edit?usp=sharing)

- Code modularity/readability (25%)
- Models (25%)
- Routes (25%)
- Frontend logic and functionality (25%)
- Design + Bonus features (up to 10 Extra Credit points)

