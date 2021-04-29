4/29

This sprint was made using main2 as a basis, and I tried not to change other's code with some really important exceptions in account. By that I'm mainly referring to how Account was not actually connected with AccountManager until now, so I set that up for this as well.

As a user I would like the ability to change the privacy of my user page to decide who can and cannot see the memes I post. cos- there should be two privacy settings: Private and Public

cos- i should be able to choose between private and public in a settings menu

cos- if i choose private, then only those who follow me can view the memes i post

cos- if i choose private, those who don't follow me should be able to view my user page, but they should not be able to see the memes i post

cos- if i choose public then anyone who views my page should be able to see my memes (unless they're blocked)

cos- i should be able to switch between these two settings at any time

cos- if i choose public, then other users should be able to instantly follow me

cos- if i choose private, then if someone tries to follow me they should not be able to instantly follow me. instead I should be sent a notification giving me the option to either accept or decline their follow request.

I had some of this implemented already, but I never focused too much on it. Also, I had to somewhat implement the friend/follow in order to accomplish these goals.

I completed all of them except the last two (and the blocking portion since that's an entirely different thing) due to the following/friends system as well as the login system not being fully developed. However, I was able to show off the key factors of the privacy systems using a more efficient testing method. I also had friend and the current user share their privacy settings due to more efficient testing as well. I think it is overall a very solid base despite some (what would be if this weren't the end of the semester) temporary shortcomings.

The text on profile shows privacy (true/private or false/public) and friendship (true or false). It can easily be removed, but it was really helpful for testing.