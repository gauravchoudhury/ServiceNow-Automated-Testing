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
	
	'Insert Incident': function(browser) {
		browser
			.url(baseUrl + '/incident.do?')
			.waitForElementVisible('body', 5000)
			.waitForElementNotVisible('[name=sys_uniqueValue]',2000)

		//get sys_id of record for use later
		//var sysId = browser.getValue('[name=sys_uniqueValue]').toString();

		//exclusively use the Xpath locator to locate elements
		browser.useXpath();

		browser  //locate the Category field and set it to 'Network'
			.waitForElementVisible('//select[@name=\'incident.category\']', 1000)
			.setValue('//select[@name=\'incident.category\']', 'network')
			.pause(1000);

		browser  //locate the Subcategory field and set it to 'DNS'
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.subcategory\']', 'dns')
			.pause(1000);

		browser  //locate the Contact Type field and set it to 'Self-Service'
			.waitForElementVisible('//select[@name=\'incident.contact_type\']', 1000)
			.setValue('//select[@name=\'incident.contact_type\']', 'self-service')
			.pause(1000);

		browser  //locate the Impact field and set it to '3'
			.waitForElementVisible('//select[@name=\'incident.impact\']', 1000)
			.setValue('//select[@name=\'incident.impact\']', '3')
			.pause(1000);

		browser  //locate the Urgency field and set it to '3'
			.waitForElementVisible('//select[@name=\'incident.urgency\']', 1000)
			.setValue('//select[@name=\'incident.urgency\']', '3')
			.pause(1000);


		//exclusively use the useCSS locator to locate elements
		browser.useCss();

		browser  //locate the Caller ID field and set it to the user below
			.waitForElementVisible('[name=sys_display\\.incident\\.caller_id]', 1000)
			.setValue('[name=sys_display\\.incident\\.caller_id]','Scott Seixas')
			.pause(1000);

		browser  //locate the Short Description field and set it to the string below
			.waitForElementVisible('[name=incident\\.short_description]', 1000)
			.setValue('[name=incident\\.short_description]','Selenium Automation Testing')
			.pause(1000);

		browser  //locate the Work Notes field and set it to string below
			.waitForElementVisible('[name=incident\\.work_notes]', 1000)
			.setValue('[name=incident\\.work_notes]','work notes added from selenium test script #1')
			.pause(1000);

		browser  //locate the Comments field and set it to string below
			.waitForElementVisible('[name=incident\\.comments]', 1000)
			.setValue('[name=incident\\.comments]','comments added from selenium test script #1')
			.pause(1000);

		//clicks the submit button on a new record
		browser
			.waitForElementVisible('button[id=sysverb_insert]', 1000)	
			.click('button[id=sysverb_insert]')
	}
};

