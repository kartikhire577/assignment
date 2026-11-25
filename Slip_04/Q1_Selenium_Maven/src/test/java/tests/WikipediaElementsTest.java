package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class WikipediaElementsTest {

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

    @BeforeClass(dependsOnMethods = "setUp")
    public void openSite() {
        driver.get("https://testautomationpractice.blogspot.com/");   // Step 2
    }

    @Test(priority = 1)
    public void verifyTitle() {                                       // Step 3
        Assert.assertEquals(driver.getTitle(), "Automation Testing Practice");
    }

    @Test(priority = 2)
    public void verifyWikipediaIcon() {                               // Step 4
        WebElement icon = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".wikipedia-icon")));
        Assert.assertTrue(icon.isDisplayed(), "Wikipedia icon not displayed");
    }

    @Test(priority = 3)
    public void verifyWikipediaSearchButton() {                       // Step 5
        WebElement btn = driver.findElement(By.cssSelector(".wikipedia-search-button"));
        Assert.assertTrue(btn.isDisplayed(), "Wikipedia search button not displayed");
    }
}
