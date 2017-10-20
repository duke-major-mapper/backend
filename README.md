### Backend for the major planner

Instructions:

Run `gcloud beta sql connect dmp-mysql-instance --user=root` to connect to sql server directly.
  - You must have the Google Cloud SDK set up. To do this, check the gcloud docs (they are very extensive).

Run `yarn run init-cloudsql`
 - Make sure you have `yarn` isntalled properlly for this to work. Do not use `npm` because when we deploy they're `.lock` files will conflict.
 - You must be connect through the CloudSQL proxy or have your IP Address set up with the CloudSQL instance.
     - If you need to use the proxy and you have already installed it, run this once you have requested for the `proxy_keys.json` file that you will need from Aman (hint: put this file in the root director and run the following in the root directory):

     `./cloud_sql_proxy -instances="duke-major-planner:us-east1:dmp-mysql-instance"=tcp:3306 -credential_file="proxy_keys.json" &`
