package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class BasicControlsTest {

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

    // If a locator fails, re-inspect the element in DevTools (the practice site may change).
    @Test
    public void handleBasicControls() {
        driver.get("https://www.hyrtutorials.com/p/basic-controls.html");

        // Text boxes
        driver.findElement(By.id("firstName")).sendKeys("John");
        driver.findElement(By.id("lastName")).sendKeys("Doe");

        // Radio buttons
        WebElement male = driver.findElement(By.id("malerb"));
        male.click();
        Assert.assertTrue(male.isSelected(), "Male radio not selected");

        // Check boxes
        WebElement english = driver.findElement(By.id("englishchbx"));
        WebElement hindi = driver.findElement(By.id("hindichbx"));
        english.click();
        hindi.click();
        Assert.assertTrue(english.isSelected() && hindi.isSelected());

        // Email & password
        driver.findElement(By.id("email")).sendKeys("john@example.com");
        driver.findElement(By.id("password")).sendKeys("Pass@123");

        // Button
        driver.findElement(By.id("registerbtn")).click();
        System.out.println("Message: " + driver.findElement(By.id("msg")).getText());
    }
}
