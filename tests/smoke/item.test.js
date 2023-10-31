const { Builder, By, Key, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert')
const screen = {
  width: 640,
  height: 480
};

describe('@Smoke - Add item to basket', function() {
  this.timeout(30000)
  let driver
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
  it('should be able to add item to basket', async function() {
    await driver.get("https://www.saucedemo.com/")
    await driver.manage().window().setRect({ width: 1300, height: 692 })
    await driver.findElement(By.css("*[data-test=\"username\"]")).click()
    await driver.findElement(By.css("*[data-test=\"username\"]")).sendKeys("standard_user")
    await driver.findElement(By.css("*[data-test=\"password\"]")).click()
    await driver.findElement(By.css("*[data-test=\"password\"]")).sendKeys("secret_sauce")
    await driver.findElement(By.css("*[data-test=\"login-button\"]")).click()
    await driver.findElement(By.css("*[data-test=\"add-to-cart-sauce-labs-backpack\"]")).click()
    await driver.findElement(By.linkText("1")).click()
    assert(await driver.findElement(By.css(".inventory_item_name")).getText() == "Sauce Labs Backpack")
    await driver.findElement(By.css("*[data-test=\"remove-sauce-labs-backpack\"]")).click()
  })
})
