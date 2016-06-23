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

		var mrcArray = ['349.99','350.00','350.01'];
		var mrc = mrcArray[Math.floor(Math.random() * mrcArray.length)];

		var nrcArray = ['1999.99','2000.00','2000.01'];
		var nrc = nrcArray[Math.floor(Math.random() * nrcArray.length)];

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

	
	'First Round of Approvals - Net Logistics': function(browser) {

		browser
			//upon reload of the form, wait for certain elements to load
            .waitForElementVisible('body', 1000)

			//clicks the 'Approve' button on the current record. 
			//This UI Action will allow any admin account to approved
			//even if they are not an approver for that record
			.waitForElementVisible('button[id=approve_ckt]', 1000)	
			.click('button[id=approve_ckt]')
			.pause(500)
	           
	},

	'Second Round of Approvals - Vendor Performance': function(browser) {

		browser
			//upon reload of the form, wait for certain elements to load
            .waitForElementVisible('body', 1000)

			//clicks the 'Approve' button on the current record. 
			//This UI Action will allow any admin account to approved
			//even if they are not an approver for that record
			.waitForElementVisible('button[id=approve_ckt]', 1000)	
			.click('button[id=approve_ckt]')
			.pause(500)
	           
	},

	'Third Round of Approvals - Net Ops Management': function(browser) {

		browser
			//upon reload of the form, wait for certain elements to load
            .waitForElementVisible('body', 1000)

			//clicks the 'Approve' button on the current record. 
			//This UI Action will allow any admin account to approved
			//even if they are not an approver for that record
			.waitForElementVisible('button[id=approve_ckt]', 1000)	
			.click('button[id=approve_ckt]')
			.pause(500)
	           
	},

	'Fourth Round of Approvals (If Necessary) - Tech Ops Management': function(browser) { 

		browser
			//upon reload of the form, wait for certain elements to load
			.waitForElementVisible('body', 1000)

			//checks the value of the MRC (u_price) and NRC (u_nrc) field values
			//if the following are true, another approval is triggered which we'll check
			//u_state = 'Ready for Approval' (20) && (u_price > 350 || u_nrc > 2000)
			.getValue('[id=u_circuit_provisioning\\.u_price\\.display]',function(mrcResult){
				if(mrcResult.value >= '350.00'){
					browser.waitForElementVisible('button[id=approve_ckt]', 1000)	
					browser.click('button[id=approve_ckt]')
					console.log('Approval','')
					browser.pause(500)
				}
				else {
					browser.getValue('[id=u_circuit_provisioning\\.u_nrc\\.display]',function(nrcResult){
						if(nrcResult.value >= '2000.00'){
							browser.waitForElementVisible('button[id=approve_ckt]', 1000)	
							browser.click('button[id=approve_ckt]')
							browser.pause(500)
						}
					})
				}
			})
	},


	"Validate 'Final Docs' TKT": function(browser){

		//query the api for a newly created TKT with the CKT as it's parent thats assigned to Vendor Performance and a state of 'Open'
		//open a new window, going to the TKT we discovered
		//set priority and set to closed-complete
	},


	"Validate 'Circuit Provisioning Order' TKT": function(browser){

		//validate the state/stage of the CKT are set to in progress
		//query the api for a newly created TKT with the CKT as it's parent thats assigned to Network and a state of 'Open'
		//open a new window, going to the TKT we discovered
		//set priority and set to closed-complete
	},

	"Validate 'Order State' & 'Stage' fields": function(browser){

		//navigate to the circuit provisioning request
		//verify the stage and order state fields are 'complete'
	}



		//check the workflow stages
		//check the breadcrumb stages (Request, Awaiting Approval, etc...)
		//grab the sysd of the current record once it's been detected

	
}