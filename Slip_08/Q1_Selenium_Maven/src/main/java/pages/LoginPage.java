package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** Page Object WITHOUT Page Factory: By locators + driver.findElement() */
public class LoginPage {
    private final WebDriver driver;

    private final By username = By.id("user-name");
    private final By password = By.id("password");
    private final By loginBtn = By.id("login-button");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterUsername(String user) {
        driver.findElement(username).sendKeys(user);
    }

    public void enterPassword(String pass) {
        driver.findElement(password).sendKeys(pass);
    }

    public void clickLogin() {
        driver.findElement(loginBtn).click();
    }

    public ProductsPage login(String user, String pass) {
        enterUsername(user);
        enterPassword(pass);
        clickLogin();
        return new ProductsPage(driver);
    }
}
