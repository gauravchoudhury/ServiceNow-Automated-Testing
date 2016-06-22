var baseUrl = 'https://ecdev.service-now.com';

var admin_user = 'matt.glenn';
var admin_password = 'Mattyg1245!';
var admin_displayname = 'Matthew Glenn';

module.exports = {
	before : function (browser) {
		browser
			.url(baseUrl + '/login.do')
			.login(admin_user, admin_password, admin_displayname);
	}, 

	'Testing Login and redirect to /nav_to.do': function(browser) {
		browser
			.waitForElementVisible('body', 10000);
	},
	
	'Insert Circuit Provisioning Ticket': function(browser) {

		//arrays to allow for random values to be insterted into the Circuit Provisioning form
		var vendorArray = ['Aeprovi','DTAG','Verizon Business'];
		var vendor = vendorArray[Math.floor(Math.random() * vendorArray.length)];

		var termArray = ['12','24','36'];
		var term = termArray[Math.floor(Math.random() * termArray.length)];

		var priceArray = ['249.00','250.00','499.00','501.00','999.00','1001.00'];

		var mrc = priceArray[Math.floor(Math.random() * priceArray.length)];
		var nrc = priceArray[Math.floor(Math.random() * priceArray.length)];

		var orderNum = Math.floor((Math.random() * 100000) + 1);


		browser
			//redirect to the circuit provisioning form and wait for certain elements to load
			.url(baseUrl + '/u_circuit_provisioning.do?')
			.waitForElementVisible('body', 5000)
			.waitForElementNotVisible('[id=sys_uniqueValue]',2000)


		    //locate the Term field and set it to whatever the array returns
			.waitForElementVisible('[name=u_circuit_provisioning\\.u_term]', 1000)
			.setValue('[name=u_circuit_provisioning\\.u_term]',term)
			.pause(500)


		    //locate the Price field and set to a random value
			.waitForElementVisible('[id=u_circuit_provisioning\\.u_price\\.display]', 1000)
			.clearValue('[id=u_circuit_provisioning\\.u_price\\.display]')
			.setValue('[id=u_circuit_provisioning\\.u_price\\.display]',mrc)
			.pause(500)


		    //locate the Price field and set to a random value
			.waitForElementVisible('[id=u_circuit_provisioning\\.u_nrc\\.display]', 1000)
			.clearValue('[id=u_circuit_provisioning\\.u_nrc\\.display]')
			.setValue('[id=u_circuit_provisioning\\.u_nrc\\.display]',nrc)
			.pause(500)


		    //locate the vendor field and set it whatever the array returns
			.waitForElementVisible('[name=sys_display\\.u_circuit_provisioning\\.u_vendor]', 1000)
			.setValue('[name=sys_display\\.u_circuit_provisioning\\.u_vendor]',vendor)
			.pause(500)


		    //locate the Order Number field and set it to whatever is returned
			.waitForElementVisible('[id=u_circuit_provisioning\\.u_order_number]', 1000)
			.setValue('[id=u_circuit_provisioning\\.u_order_number]',orderNum)
			.pause(500)

		
		    //clicks the submit button on a new record
			.waitForElementVisible('button[id=sysverb_insert_and_stay]', 1000)	
			.click('button[id=sysverb_insert_and_stay]')
			.pause(500)

	},

	'Request Approval': function(browser) {

		browser
			//upon reload of the form, wait for certain elements to load
			.waitForElementVisible('body', 5000)


		    //clicks the Request Approval button on a new record
			.waitForElementVisible('button[id=request_approval]', 1000)	
			.click('button[id=request_approval]')
			.pause(5000)

	},

	
	'Select Random Approval and, well, Approve it!!': function(browser) {

		browser
			//upon reload of the form, wait for certain elements to load
            .waitForElementVisible('body', 1000)

			//clicks the 'Approve' button on the current record. 
			//This UI Action will allow any admin account to approved
			//even if they are not an approver for that record
			.waitForElementVisible('button[id=approve_ckt]', 1000)	
			.click('button[id=approve_ckt]')
			.pause(500)
	           
	}

		
		//dependent on the values for NRC and MRC, recurse through this process x amount of times
		//check the breadcrumb stages (Request, Awaiting Approval, etc...)
		//grab the sysd of the current record once it's been detected
		//after we request approval, we need to redirect to the previous record
		//need to find the approval section
		//locate any <a> with the class of 'linked formlink' and an innerText value of 'requested'
		//pick a random occurrance that matches the above condition
		//once loaded, click on the approve button on the sys_approval form and close the tab
		//reload page once we're back on the circuit provisioning form and check for approvals again
	
}