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

public class LinkCountTest {

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
    public void countAndPrintLinks() {
        driver.get("https://www.calculator.net/");
        List<WebElement> links = driver.findElements(By.tagName("a"));   // every hyperlink = <a> tag
        System.out.println("Total hyperlinks: " + links.size());
        int i = 1;
        for (WebElement link : links) {
            System.out.println(i++ + ". " + link.getText().trim() + "  ->  " + link.getAttribute("href"));
        }
        Assert.assertTrue(links.size() > 0);
    }
}
