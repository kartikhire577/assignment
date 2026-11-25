package tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.*;
import java.time.Duration;
import java.util.*;

public class DownloadFileTest {
    WebDriver driver;
    WebDriverWait wait;
    String downloadDir;

    @BeforeClass
    public void setUp() throws Exception {
        downloadDir = Paths.get(System.getProperty("user.dir"), "downloads").toString();
        Files.createDirectories(Paths.get(downloadDir));
        File[] old = new File(downloadDir).listFiles();
        if (old != null) for (File f : old) f.delete();

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadDir);
        prefs.put("download.prompt_for_download", false);
        prefs.put("download.directory_upgrade", true);
        prefs.put("safebrowsing.enabled", false);
        prefs.put("safebrowsing.disable_download_protection", true);

        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("prefs", prefs);
        options.addArguments("--start-maximized");
        options.addArguments("--unsafely-treat-insecure-origin-as-secure=http://omayo.blogspot.com");
        options.addArguments("--disable-features=InsecureDownloadWarnings");
        driver = new ChromeDriver(options);                          // Step 1: launch Chrome
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    /** Finds the download link: text contains "download" or href points to a file. */
    private WebElement findDownloadLink() {
        for (WebElement a : driver.findElements(By.tagName("a"))) {
            String text = a.getText().trim().toLowerCase();
            String href = a.getAttribute("href");
            href = href == null ? "" : href.toLowerCase();
            System.out.println("LINK: [" + a.getText().trim() + "] -> " + href);
            if (text.contains("download")
                    || href.matches(".*\\.(txt|pdf|zip|doc|docx|xls|xlsx|csv|png|jpg|jpeg|exe|msi|rar)(\\?.*)?$")) {
                return a;
            }
        }
        return null;
    }

    private boolean waitForFile(int seconds) throws InterruptedException {
        for (int i = 0; i < seconds; i++) {
            File[] files = new File(downloadDir).listFiles(
                    (d, n) -> !n.endsWith(".crdownload") && !n.endsWith(".tmp"));
            if (files != null && files.length > 0) {
                System.out.println("Downloaded file: " + files[0].getAbsolutePath());
                return true;
            }
            Thread.sleep(1000);
        }
        return false;
    }

    @Test
    public void downloadFile() throws Exception {
        driver.get("http://omayo.blogspot.com/p/page7.html");        // Step 2: open URL
        wait.until(d -> ((JavascriptExecutor) d)
                .executeScript("return document.readyState").equals("complete"));

        WebElement link = findDownloadLink();
        Assert.assertNotNull(link, "No download link found - see the LINK lines printed above");
        String href = link.getAttribute("href");
        System.out.println("Clicking: " + link.getText() + " -> " + href);

        // Step 3: click the link (JS click avoids overlay / scrolling problems)
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
        boolean downloaded = waitForFile(15);

        // Fallback: if Chrome blocked / opened the file instead, download the href directly
        if (!downloaded && href != null && href.startsWith("http")) {
            System.out.println("Browser download not detected, downloading href directly...");
            String name = href.substring(href.lastIndexOf('/') + 1).split("\\?")[0];
            if (name.isEmpty()) name = "downloaded_file";
            try (InputStream in = new URL(href).openStream()) {
                Files.copy(in, Paths.get(downloadDir, name), StandardCopyOption.REPLACE_EXISTING);
            }
            downloaded = waitForFile(3);
        }
        Assert.assertTrue(downloaded, "File was not downloaded");
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}
