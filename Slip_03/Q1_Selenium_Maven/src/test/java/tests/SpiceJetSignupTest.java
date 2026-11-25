package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class SpiceJetSignupTest {

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

    @Test
    public void verifySignupPage() {
        driver.get("https://www.spicejet.com/");

        // The site is dynamic: if the locator changes, inspect the button in DevTools and update it.
        WebElement signup = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(
                "//div[normalize-space()='Signup' or normalize-space()='Sign up' or normalize-space()='Sign Up']"
                + " | //a[normalize-space()='Signup' or normalize-space()='Sign up']")));
        signup.click();

        // Verify registration page: URL or page content mentions sign up
        boolean onRegistration = wait.until(d ->
                d.getCurrentUrl().toLowerCase().contains("signup")
                || d.getPageSource().toLowerCase().contains("sign up")
                || d.getPageSource().toLowerCase().contains("create account"));
        System.out.println("URL after click: " + driver.getCurrentUrl());
        Assert.assertTrue(onRegistration, "Registration page not displayed");
    }
}
