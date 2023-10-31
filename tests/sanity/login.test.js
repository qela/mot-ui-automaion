const { Builder, By, Key, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert')
const screen = {
  width: 640,
  height: 480
};

describe('@Sanity - Successful Login', function() {
  this.timeout(30000)
  let driver; 
  let vars
  beforeEach(async function() {
    driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('should be able to login successfully', async function() {
    await driver.get("https://www.saucedemo.com/")
    await driver.manage().window().setRect({ width: 1300, height: 692 })
    assert(await driver.findElement(By.css(".login_logo")).getText() == "Swag Labs")
    await driver.findElement(By.css("*[data-test=\"username\"]")).click()
    await driver.findElement(By.css("*[data-test=\"username\"]")).sendKeys("standard_user")
    await driver.findElement(By.css("*[data-test=\"password\"]")).click()
    await driver.findElement(By.css("*[data-test=\"password\"]")).sendKeys("secret_sauce")
    await driver.findElement(By.css("*[data-test=\"login-button\"]")).click()
  })
})
