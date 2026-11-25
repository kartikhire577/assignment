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
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com/");
    }

    @Test
    public void validLogin() {
        LoginPage login = new LoginPage(driver);
        ProductsPage products = login.login("standard_user", "secret_sauce");
        Assert.assertEquals(products.getHeading(), "Products");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
