package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

import java.io.File;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotTest {

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

    private void capture(String name) throws Exception {
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        String ts = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        Path dest = Paths.get("screenshots", name + "_" + ts + ".png");
        Files.createDirectories(dest.getParent());
        Files.copy(src.toPath(), dest, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Screenshot saved: " + dest.toAbsolutePath());
        Assert.assertTrue(Files.exists(dest));
    }

    @Test
    public void takeScreenshots() throws Exception {
        driver.get("https://garwarecollege.mespune.in/");
        wait.until(d -> ((JavascriptExecutor) d).executeScript("return document.readyState").equals("complete"));
        System.out.println("Title: " + driver.getTitle());
        capture("garware_home");

        // scroll down and take a second screenshot
        ((JavascriptExecutor) driver).executeScript("window.scrollBy(0, 800)");
        Thread.sleep(1000);
        capture("garware_scrolled");
    }
}
