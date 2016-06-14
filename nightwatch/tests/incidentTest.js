//var baseUrl = 'http://helsinki/';
var baseUrl = 'https://dev10392.service-now.com';

var admin_user = 'admin';
var admin_password = 'Mattyg1245';
var admin_displayname = 'System Administrator';

module.exports = {
	before : function (browser) {
		browser
			.url(baseUrl + '/login.do')
			.login(admin_user, admin_password, admin_displayname);
	}, 

	'Hello Test!': function(browser) {
		browser
			.waitForElementVisible('body', 10000);
	},
	
	'Test Incident Form': function(browser) {
		browser
			.url(baseUrl + '/incident.do')
			.waitForElementVisible('body', 5000)
			.waitForElementVisible('[name=incident\\.number]', 2000)
			.waitForElementVisible('[name=incident\\.category]', 2000)
			.waitForElementVisible('[name=incident\\.short_description]', 2000);


		browser.useXpath();
		browser
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.category\']', 'network')
			.pause(1000);
		/*browser
			.expect
			.element('//select[@id=\'incident.subcategory\']/option[text()=\'DNS\']')
			.present;*/
		browser
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.subcategory\']', 'dns')
			.pause(1000);
		browser
			.waitForElementVisible('//select[@name=\'incident.contact_type\']', 1000)
			.setValue('//select[@name=\'incident.contact_type\']', 'self-service')
			.pause(1000);
		browser
			.waitForElementVisible('//select[@name=\'incident.impact\']', 1000)
			.setValue('//select[@name=\'incident.impact\']', '1')
			.pause(1000);
		browser
			.waitForElementVisible('//select[@name=\'incident.urgency\']', 1000)
			.setValue('//select[@name=\'incident.urgency\']', '1')
			.pause(1000);



		browser.useCss();
		browser
			.waitForElementVisible('[name=sys_display\\.incident\\.caller_id]', 1000)
			.setValue('[name=sys_display\\.incident\\.caller_id]','Scott Seixas')
			.pause(1000);
		browser
			.waitForElementVisible('[name=incident\\.short_description]', 1000)
			.setValue('[name=incident\\.short_description]','Selenium Automation Testing')
			.pause(1000);
		browser
			.waitForElementVisible('[name=incident\\.work_notes]', 1000)
			.setValue('[name=incident\\.work_notes]','work notes added from selenium test script #1')
			.pause(1000);
		browser
			.waitForElementVisible('[name=incident\\.comments]', 1000)
			.setValue('[name=incident\\.comments]','comments added from selenium test script #1')
			.pause(1000);

		//clicks the submit button on a new record
		browser
			.waitForElementVisible('button[id=sysverb_insert]', 1000)
			.click('button[id=sysverb_insert]')
	}
};