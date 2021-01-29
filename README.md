# tpo-tstoll-project3

Project 3

This is a web form where users are required to enter the following information:

-Name*

-Email Address**

Users are also encouraged to fill out information pertaining to their job role, in addition to selecting a T-shirt and corresponding theme for the conference. If a user does not see their job role listed, they can select "Other" and a text field will appear for them to manually input their title. T shirt colors will be determined based upon the design selected.

Next users are required to sign up for conference activities**. Making at least 1 selection is required to submit the form, and do not worry, a failsafe has been added to prevent users from signing up for conflicting events. The users total cost will populate at the bottom of the activities selection based upon the choices they made.

Finally the user must input payment information. If the user chooses to pay by PayPal or Bitcoin, they will be directed to the corresponding site to proceed with payment. If the user chooses credit card, they must input their card information including card number**, zip code**, and CVV**. The user will be prompeted conditionally for the credit card number if they do not enter at least 13 digits. They will receive a different message if it fails for a different criteria.

*The name field will dynamically verify as the user is typing to ensure they do not leave the field blank. If the field is blank, they will receive an error message in real time.

**These required fields will not prompt an error until the form is submitted. The user cannot submit the form until all verification requirements are satisfied.
 