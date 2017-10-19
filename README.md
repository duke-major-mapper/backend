Backend for the major planner

Instructions:

1. `./cloud_sql_proxy -instances="duke-major-planner:us-east1:dmp-mysql-instance"=tcp:3306 -credential_file="proxy_keys.json" &`

  - Better to use: `gcloud beta sql connect dmp-mysql-instance --user=root`

2. `gulp`

3. `npm start`
