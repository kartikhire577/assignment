# CA-605-MJP Full Stack Development II & Software Testing Lab - Practical Slip Solutions
MSc (Computer Application) Semester III, Abasaheb Garware College

Each `Slip_NN` folder contains:
- `Q1_Selenium_Maven/` - Maven project (Selenium 4.25 + TestNG 7.10, Java 11+), `pom.xml` and `testng.xml` included
- `Q2_React_App/` - React 18 + Vite project
- `README.md` - how to run that slip

## Requirements
JDK 11+, Maven 3.8+, Google Chrome (Firefox/Edge for Slip 7), Node.js 18+ and npm.
Selenium 4.6+ downloads the browser driver by itself (Selenium Manager), so no WebDriverManager or manual chromedriver is needed. Internet access is required.

## Slip index
| Slip | Q1 Selenium | Q2 React |
|---|---|---|
| 1 | Download a file (omayo page7) | React login form with onInput/onChange/onSubmit |
| 2 | Screenshots (garwarecollege) | useEffect fetch users to console |
| 3 | SpiceJet signup | ON/OFF toggle changing UI background |
| 4 | Title/Wikipedia icon/button checks | react-router Home, About, Contact |
| 5 | Google search 3 keyword combos | Login Admin/Pass123, Unauthorized, 404 |
| 6 | TestNG parallel (saucedemo) | Protected route with mock auth |
| 7 | Cross browser TestNG (google, firebox) | TODO list |
| 8 | POM without Page Factory | Toggle button ON/OFF with colour |
| 9 | Count/print hyperlinks (calculator.net) | Counter with initial prop |
| 10 | Broken links (deadlinkcity) | Valid number + digit sum |
| 11 | Count radio buttons + testng.xml | String operations |
| 12 | TestNG invocationCount | Notes app with Redux Toolkit createSlice |
| 13 | Title/Wikipedia icon/button checks | Redux counter, count on console |
| 14 | Demo Web Shop register | Calculator |
| 15 | Handle basic HTML controls | Counter with actions and reducers |
| 16 | Count radio buttons + testng.xml | Virtual DOM vs traditional DOM |
| 17 | Demo Web Shop login | Sign-In / Sign-Out with useState |
| 18 | Download a file (omayo page7) | Profile page |
| 19 | Screenshots (garwarecollege) | List of 10 favourite movies |
| 20 | Google search 3 keyword combos | /user/:id route params |
| 21 | POM with Page Factory | Even/odd and palindrome |

## Notes
- Slips 1=18, 2=19, 4=13, 5=20, 11=16 have the same Selenium question; the same solution is copied into each.
- The Selenium targets are live public websites (SpiceJet, Google, demo shops). Their HTML changes over time, and Google/SpiceJet may show consent pages or bot checks. If a locator fails, inspect the element in Chrome DevTools and update the `By` locator in the test class.
- Demo Web Shop slips (14, 17) register a new user with a unique e-mail on every run.
- Slip 5/20 Google search may hit a CAPTCHA when automated; run again or solve it manually.
- React projects were not run in this environment (no network); run `npm install` first.
