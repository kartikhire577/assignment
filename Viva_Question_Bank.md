# Viva Question Bank (3 Marks)

## Selenium / Maven / TestNG
1. **What is Selenium WebDriver?** An API to automate browsers (Chrome, Firefox, Edge) by controlling them through browser drivers.
2. **What is Maven and what is pom.xml?** Build/dependency tool. `pom.xml` lists project info, dependencies (selenium-java, testng) and plugins (surefire).
3. **Why TestNG?** Annotations (@Test, @BeforeClass...), testng.xml suites, parameters, data providers, parallel execution, reports.
4. **Locators in Selenium?** id, name, className, tagName, linkText, partialLinkText, cssSelector, xpath.
5. **findElement vs findElements?** findElement returns first match or throws NoSuchElementException; findElements returns a list (empty if none).
6. **Implicit vs explicit wait?** Implicit: global polling time for all finds. Explicit (WebDriverWait + ExpectedConditions): waits for a specific condition.
7. **driver.close() vs driver.quit()?** close closes current window; quit closes all windows and ends the session.
8. **How to take a screenshot?** `((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE)` then copy the file.
9. **How to find broken links?** Collect all `<a>` hrefs, send HTTP request (HttpURLConnection), status >= 400 means broken.
10. **What is POM (Page Object Model)?** A class per page holding locators and actions; improves maintenance and reuse.
11. **Page Factory?** Initialises `@FindBy` elements with `PageFactory.initElements(driver, this)`.
12. **parallel attribute in testng.xml?** `parallel="methods|tests|classes"` with `thread-count`; use ThreadLocal<WebDriver> for thread safety.
13. **invocationCount?** `@Test(invocationCount = 3)` runs the same test 3 times.
14. **Cross browser testing in TestNG?** Pass `browser` parameter from testng.xml with `@Parameters` and create the matching driver.
15. **How to download a file?** Set Chrome prefs `download.default_directory` and `download.prompt_for_download=false`, click the link.
16. **DataProvider?** Supplies multiple data sets to one test method (used for keyword searches).

## React
1. **What is React / JSX?** JS library for UIs built from components; JSX is HTML-like syntax compiled to `React.createElement`.
2. **Functional vs class component?** Functions with hooks vs classes with lifecycle methods; functional is the modern way.
3. **useState?** Hook to hold component state: `const [v, setV] = useState(init)`.
4. **useEffect?** Runs side effects (fetch, subscriptions) after render; dependency array controls when it re-runs; `[]` = once.
5. **Props vs state?** Props are read-only inputs from parent; state is internal and changeable.
6. **onChange vs onInput?** In React both fire on every input change; onChange is the recommended, controlled-input handler.
7. **Controlled component?** Input value driven by React state.
8. **Why `key` in lists?** Helps React identify items for efficient re-rendering.
9. **Virtual DOM?** In-memory copy of the DOM; React diffs old/new trees and updates only the changed real DOM nodes.
10. **react-router-dom?** Client side routing: BrowserRouter, Routes, Route, Link/NavLink, useNavigate, useParams, Navigate.
11. **Protected route?** A wrapper component that renders children only if authenticated, else `<Navigate to="/login"/>`.
12. **Route parameter?** `/user/:id` read using `useParams()`; `path="*"` handles 404.
13. **Redux?** Predictable global state container: store, actions, reducers; dispatch(action) -> reducer -> new state.
14. **Redux Toolkit createSlice?** Generates action creators and reducer together; uses Immer so you can write "mutating" code safely.
15. **useSelector / useDispatch?** Read state from store / dispatch actions.
16. **Vite?** Fast dev server and build tool; `npm create vite@latest`, `npm run dev`.
