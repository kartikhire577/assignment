package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

import java.util.List;

public class RadioButtonCountTest {

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
    public void countRadioButtons() {
        driver.get("https://www.techlistic.com/p/selenium-practice-form.html");
        List<WebElement> radios = driver.findElements(By.cssSelector("input[type='radio']"));
        System.out.println("Number of radio buttons on the page: " + radios.size());
        Assert.assertTrue(radios.size() > 0, "No radio buttons found");
    }
}
