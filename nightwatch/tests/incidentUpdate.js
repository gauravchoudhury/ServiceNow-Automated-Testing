/*this script opens a new session of your default browser and performs the following

1) Opens and navigates to the login.do page of the specified instance and logs in
2) Navigates to record specified on the incident table
3) Updates the following fields
	Subcategory
	Impact
	Urgency
	Short Description
4) Saves the record (immiates clicking on the Update button)

Need to work in the following fields
	Caller Id
	Work Notes
	Comments


*/


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
	
	'Update_Incident': function(browser) {
		browser
			.url(baseUrl + '/incident.do?sys_id=a3fafefc0f0c2600114a3b8ce1050e1c')
			.waitForElementVisible('body', 5000)
			.waitForElementVisible('[name=incident\\.number]', 2000)
			.waitForElementVisible('[name=incident\\.category]', 2000)
			.waitForElementVisible('[name=incident\\.short_description]', 2000);


		browser.useXpath();
		browser
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.category\']', 'network')
			.pause(1000);
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
			.setValue('//select[@name=\'incident.impact\']', '2')
			.pause(1000);
		browser
			.waitForElementVisible('//select[@name=\'incident.urgency\']', 1000)
			.setValue('//select[@name=\'incident.urgency\']', '3')
			.pause(1000);



		browser.useCss();
		/*browser
			.waitForElementVisible('[name=sys_display\\.incident\\.caller_id]', 1000)
			.setValue('[name=sys_display\\.incident\\.caller_id]','Scott Seixas')
			.pause(1000);*/
		browser
			.waitForElementVisible('[name=incident\\.short_description]', 1000)
			.setValue('[name=incident\\.short_description]',' - Adding an Update')
			.pause(1000);
		/*browser
			.waitForElementVisible('[name=incident\\.activity-stream-work_notes-textarea]', 1000)
			.setValue('[name=incident\\.activity-stream-work_notes-textarea]','work notes added from selenium test update script')
			.pause(1000);
		browser
			.waitForElementVisible('[name=activity-stream-comments-textarea]', 1000)
			.setValue('[name=activity-stream-comments-textarea]','comments added from selenium test update script')
			.pause(1000);*/

		//clicks the submit button on a new record
		browser
			.waitForElementVisible('button[id=sysverb_update]', 1000)
			.click('button[id=sysverb_update]')
	}
};