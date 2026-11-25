package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class CrossBrowserTest {
    WebDriver driver;

    @Parameters("browser")
    @BeforeClass
    public void setUp(@Optional("chrome") String browser) {
        switch (browser.toLowerCase()) {
            case "firefox": driver = new FirefoxDriver(); break;
            case "edge":    driver = new EdgeDriver();    break;
            default:        driver = new ChromeDriver();
        }
        driver.manage().window().maximize();
        System.out.println("Launched browser: " + browser);
    }

    @Test
    public void openGoogleAndFirebox() {
        driver.get("https://www.google.com/");
        System.out.println("Google title: " + driver.getTitle());
        Assert.assertTrue(driver.getTitle().contains("Google"));

        driver.get("https://firebox.com/");
        System.out.println("Firebox title: " + driver.getTitle() + " | URL: " + driver.getCurrentUrl());
        Assert.assertFalse(driver.getTitle().isEmpty());
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}
