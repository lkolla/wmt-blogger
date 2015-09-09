# wmt-blogger
Blogger Site built in nodejs

Completed:
Required: On /login, Clicking "Sign Up" should redirect to /signup
Required: On /signup, clicking "Sign Up" should create a new user with the provided details
		  Required fields: email, password, username
 		  Optional fields: blog name, blog description
		  If the email or username is taken or invalid, show an error message
		  Username restrictions:
				Case insensitive (for uniqueness), but maintain capitalization for display
				Alphanumeric	 		  
		  Add the following password restrictions:
				Minimum length: 4
				At least 1 uppercase and 1 lowercase letter
				At least 1 number		  
		  On success, log in user and redirect to /profile
		  
Required: User Model
Required: Login /login
Required: Toolbar
Required: Create/Edit Post at /post/<postID>
Required: Profile
			Show a list of blog posts created by the logged in user
			Each post in the list should at least show title, creation date, update date
			Each post in the list should have a functioning "Delete" and "Edit" link
			Show comment count

Required: Show a list of latest comments to logged in user's posts with
Required: Blog at /blog/<blogId>
Required: Comments

			
		  