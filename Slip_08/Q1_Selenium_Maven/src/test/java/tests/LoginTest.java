package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;
import pages.ProductsPage;

public class LoginTest {
    WebDriver driver;

    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();                  // 1. launch Chrome
        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com/");     // 2. open URL
    }

    @Test
    public void validLogin() {                        // 3. login using POM
        LoginPage login = new LoginPage(driver);
        ProductsPage products = login.login("standard_user", "secret_sauce");
        Assert.assertEquals(products.getHeading(), "Products");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
