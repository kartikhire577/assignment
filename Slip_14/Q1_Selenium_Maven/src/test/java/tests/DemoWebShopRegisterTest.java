package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class DemoWebShopRegisterTest {
    static final String PASSWORD = "Test@12345";

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

    @Test
    public void registerNewUser() {
        String email = "user" + System.currentTimeMillis() + "@example.com";   // unique every run
        register(email);
        String msg = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div.result"))).getText();
        System.out.println(msg);
        Assert.assertEquals(msg, "Your registration completed");
    }
}
