package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class SauceDemoParallelTest {
    // ThreadLocal keeps one browser per thread so parallel methods do not clash
    private final ThreadLocal<WebDriver> tl = new ThreadLocal<>();

    @BeforeMethod
    public void setUp() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        tl.set(driver);
        driver.get("https://www.saucedemo.com/");
    }

    @Test
    public void verifyPageTitle() {
        System.out.println("[" + Thread.currentThread().getName() + "] verifyPageTitle");
        Assert.assertEquals(tl.get().getTitle(), "Swag Labs");
    }

    @Test
    public void verifyLogoDisplayed() {
        System.out.println("[" + Thread.currentThread().getName() + "] verifyLogoDisplayed");
        Assert.assertTrue(tl.get().findElement(By.className("login_logo")).isDisplayed());
    }

    @Test
    public void displayUrl() {
        System.out.println("[" + Thread.currentThread().getName() + "] URL = " + tl.get().getCurrentUrl());
        Assert.assertEquals(tl.get().getCurrentUrl(), "https://www.saucedemo.com/");
    }

    @AfterMethod
    public void tearDown() {
        tl.get().quit();
        tl.remove();
    }
}
