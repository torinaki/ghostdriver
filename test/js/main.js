var assert = require('assert'),
  test = require('selenium-webdriver/testing'),
  /**
   *
   * @type {webdriver.WebDriver}
   */
  webdriver = require('selenium-webdriver'),
  driver;


test.describe('Google Search', function () {
    test.it('should work', function () {

        var fs = require('fs');
        driver = new webdriver.Builder().
            usingServer('http://localhost:8910').
            withCapabilities(webdriver.Capabilities.phantomjs()).
            build();
        driver.get("http://localhost:1234/");

        driver.schedule(
            new webdriver.Command(webdriver.CommandName.GET_NETWORK_LOGS),
            'WebDriver.manage().logs().getNetworkLog()'
        ).then(function (har) {
            fs.writeFile("./test.json", JSON.stringify(har, null, " "), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });

        driver.manage().logs().getAvailableLogTypes().then(function (types) {
            console.log(types);
        });

        driver.manage().logs().get('browser').then(function (entries) {
            var log = '';
            entries.forEach(function (entry) {
                log += entry.level.name + " " +
                    (new Date(entry.timestamp*1000)).toISOString() + " " +
                    entry.message + "\n";
            });
            fs.writeFile("./test.txt", log, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });

//    driver.manage().logs().get(webdriver.logging.Type.BROWSER).then(function () {
//      console.log(arguments);
//    });
    });
});

