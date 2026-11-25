package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

public class BrokenLinksTest {

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
    public void findBrokenLinks() {
        driver.get("http://www.deadlinkcity.com/");
        List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println("Total links: " + links.size());
        int broken = 0;

        for (WebElement link : links) {
            String url = link.getAttribute("href");
            if (url == null || url.isEmpty() || !url.startsWith("http")) continue;   // skip mailto:, javascript:, empty
            try {
                HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
                con.setRequestMethod("HEAD");
                con.setConnectTimeout(5000);
                con.setReadTimeout(5000);
                con.connect();
                int code = con.getResponseCode();
                if (code >= 400) {
                    broken++;
                    System.out.println("BROKEN  [" + code + "] " + url);
                } else {
                    System.out.println("OK      [" + code + "] " + url);
                }
            } catch (Exception e) {
                broken++;
                System.out.println("BROKEN  [" + e.getClass().getSimpleName() + "] " + url);
            }
        }
        System.out.println("Total broken links: " + broken);
    }
}
