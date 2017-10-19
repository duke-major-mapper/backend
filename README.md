Backend for the major planner

Instructions:

Run `gcloud beta sql connect dmp-mysql-instance --user=root` to connect to sql server.
  - You must have the Google Cloud SDK set up. To do this, check the gcloud docs (they are very extensive).

Run `yarn run init-cloudsql`
 - Make sure you have `yarn` isntalled properlly for this to work. Do not use `npm` because when we deploy they're `.lock` files will conflict.
