package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class DemoWebShopLoginTest {
    static final String PASSWORD = "Test@12345";
    String email = "user" + System.currentTimeMillis() + "@example.com";

    WebDriver driver;
    WebDriverWait wait;

    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();            // Selenium Manager downloads chromedriver automatically
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) driver.quit();
    }

    private void register(String email) {
        driver.get("https://demowebshop.tricentis.com/");
        driver.findElement(By.linkText("Register")).click();
        driver.findElement(By.id("gender-male")).click();
        driver.findElement(By.id("FirstName")).sendKeys("Test");
        driver.findElement(By.id("LastName")).sendKeys("User");
        driver.findElement(By.id("Email")).sendKeys(email);
        driver.findElement(By.id("Password")).sendKeys(PASSWORD);
        driver.findElement(By.id("ConfirmPassword")).sendKeys(PASSWORD);
        driver.findElement(By.id("register-button")).click();
    }

    // Create a registered account first so the login test is self contained.
    @BeforeClass(dependsOnMethods = "setUp")
    public void createAccount() {
        register(email);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div.result")));
        driver.findElement(By.linkText("Log out")).click();
    }

    @Test
    public void loginWithValidCredentials() {
        driver.get("https://demowebshop.tricentis.com/");            // 2. URL
        driver.findElement(By.linkText("Log in")).click();           // 3. click Log in link
        driver.findElement(By.id("Email")).sendKeys(email);          // 4. email
        driver.findElement(By.id("Password")).sendKeys(PASSWORD);    // 5. password
        driver.findElement(By.cssSelector("input.login-button")).click();   // 6. Log in button

        // 7. verify user is logged in (account link shows the email)
        WebElement account = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("a.account")));
        Assert.assertEquals(account.getText(), email);

        // 8. verify Log out link is displayed
        Assert.assertTrue(driver.findElement(By.linkText("Log out")).isDisplayed());
    }
}
