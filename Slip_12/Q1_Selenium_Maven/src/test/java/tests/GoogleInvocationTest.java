package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class GoogleInvocationTest {
    WebDriver driver;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();                      // 1. launch Chrome
        driver.manage().window().maximize();
    }

    // invocationCount = 3 -> this single test case is executed 3 times
    @Test(invocationCount = 3)
    public void verifyGoogleHome() {
        driver.get("https://www.google.com/");            // 2. open URL
        Assert.assertTrue(driver.getTitle().contains("Google"));            // 3. title
        WebElement logo = driver.findElement(By.cssSelector(
                "img[alt='Google'], svg[aria-label='Google'], #hplogo"));
        Assert.assertTrue(logo.isDisplayed(), "Logo not displayed");        // 4. logo
        System.out.println("URL: " + driver.getCurrentUrl());               // 5. URL
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();                                     // 6. close all windows
    }
}
