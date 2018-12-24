Email : xiaolong.zhang@supinfo.com
I didn't change backend mock file , so you could use origin backend file.

For this test , I use Vue-cli to build the project , And use axios to handle the post/get .

And for display the chart, I use v-charts to display data.

Beacuse the requsetment is to build a sample page to display data, so I didn't build other pages for login..
And I only choose one user(swagtv) to display the data .

To run the project , first run backend server , then use npm run server to run vue server.

There are some questions for me to use your backend mock : 
1. why shift all audience timestamps to end on Date.now() ,
So ,I display all data in bandwidth.json and audience1.json to display.

And there are some issue "Invalid Host/Origin header" beacuse of webpack.
https://github.com/webpack/webpack-dev-server/issues/1604
I didn't finish, but it didn't affect chart working.


I also add one display picture.