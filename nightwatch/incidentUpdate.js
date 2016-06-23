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
	
	'Update Incident': function(browser) {
		browser
			.url(baseUrl + '/incident.do?sys_id=03a12f410fc46600114a3b8ce1050e4c')
			.waitForElementVisible('body', 5000)

		//exclusively use the Xpath locator to locate elements
		browser.useXpath();

		browser  //locate the Incident State field and set it to 'In Progress'
			.waitForElementVisible('//select[@name=\'incident.state\']', 1000)
			.setValue('//select[@name=\'incident.state\']', '2')
			.pause(1000);

		browser  //locate the Category field and set it to 'Hardware'
			.waitForElementVisible('//select[@name=\'incident.category\']', 1000)
			.setValue('//select[@name=\'incident.category\']', 'hardware')
			.pause(1000);

		browser  //locate the Subcategory field and set it to 'Disk'
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.subcategory\']', 'disk')
			.pause(1000);

		browser  //locate the Impact field and set it to '2'
			.waitForElementVisible('//select[@name=\'incident.impact\']', 1000)
			.setValue('//select[@name=\'incident.impact\']', '2')
			.pause(1000);

		browser  //locate the Urgency field and set it to '1'
			.waitForElementVisible('//select[@name=\'incident.urgency\']', 1000)
			.setValue('//select[@name=\'incident.urgency\']', '1')
			.pause(1000);



		//exclusively use the useCss locator to locate elements
		browser.useCss();

		browser  //locate the Assignment Group field and set it to the 'Service Desk'
			.waitForElementVisible('[name=sys_display\\.incident\\.assignment_group]', 2000)
			.clearValue('input[name=sys_display\\.incident\\.assignment_group]')
			.setValue('[name=sys_display\\.incident\\.assignment_group]','Service Desk')
			.pause(1000);

		browser  //locate the Assigned To field and set it to 'ITIL User'
			.waitForElementVisible('[name=sys_display\\.incident\\.assigned_to]', 2000)
			.clearValue('input[name=sys_display\\.incident\\.assigned_to]')
			.setValue('[name=sys_display\\.incident\\.assigned_to]','ITIL User')
			.pause(1000);

		//randomly generate either a 0 or 1
		var randomNumber = Math.floor((Math.random() * 10000) + 1);

		browser  //locate the Work Notes field and add the string below
			.waitForElementVisible('[id=activity-stream-work_notes-textarea]', 1000)
			.setValue('[id=activity-stream-work_notes-textarea]','Work Note added from Selenium test update script')
			.pause(1000);

		browser  //locate the Comments field and add the string below
			.waitForElementVisible('[id=activity-stream-comments-textarea]', 1000)
			.setValue('[id=activity-stream-comments-textarea]','Customer Comment added from Selenium test update script')
			.pause(1000);



		//take screenshot of the whole thing
		browser
			.saveScreenshot('/Users/mglenn/' + randomNumber + '.jpg');

		//clicks the submit button on a new record
		browser
			.waitForElementVisible('button[id=sysverb_update]', 1000)
			.click('button[id=sysverb_update]')
	}
};