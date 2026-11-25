package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class GoogleSearchTest {

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

    @DataProvider(name = "keywords")
    public Object[][] keywords() {
        return new Object[][]{
                {"India", "Qutub Minar"},
                {"Agra", "Taj Mahal"},
                {"Hyderabad", "Charminar"}
        };
    }

    @Test(dataProvider = "keywords")
    public void searchKeyword(String country, String monument) {
        driver.get("https://www.google.com/");
        WebElement box = wait.until(ExpectedConditions.elementToBeClickable(By.name("q")));
        box.clear();
        box.sendKeys(country + " " + monument);
        box.sendKeys(Keys.ENTER);
        wait.until(ExpectedConditions.titleContains(monument));
        System.out.println("Searched: " + country + " " + monument + " | Title: " + driver.getTitle());
        Assert.assertTrue(driver.getTitle().contains(monument));
    }
}
