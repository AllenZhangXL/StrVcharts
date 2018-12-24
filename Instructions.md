Email : xiaolong.zhang@supinfo.com

For this test , I use Vue-cli to build the project , And use axios to handle the post/get .

And for display the chart, I use v-charts to display data.

Beacuse the requsetment is to build a sample page to display data, so I didn't other pages for login..



To run the project , first run backend server , then use npm run server to run vue server.

There are some questions for me to use your backend mock , 

1. why shift all audience timestamps to end on Date.now() 


And there are some issue "Invalid Host/Origin header" beacuse of webpack.
https://github.com/webpack/webpack-dev-server/issues/1604
I didn't finish, but it didn't affect chart working.
