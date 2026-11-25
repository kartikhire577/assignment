package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ProductsPage {
    @FindBy(className = "title")
    private WebElement heading;

    public ProductsPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }

    public String getHeading() {
        return heading.getText();
    }
}
