# Client CSV Uploader UI

`Client CSV Uploader UI` is the frontend interface that connects with the CSV Uploader backend, allowing a user to upload and edit their own CSVs through this GUI.

- List all objects in a user's s3 Bucket (user_id from a test `Auth0`)
- Upload new CSV/JSON data to their s3 Bucket
- Edit JSON data/title of existing object

## How to run

To load all node modules 
```sh
$ npm i
```
To run a local development application

```sh
$ npm run dev
```
Create a test account in the Auth0 portal, this will use your `user_id` to send requests to the backend. A local backend must be running with authenticated AWS permissions in order to create/edit data.

## Next Steps

- More streamlined way to connect to AWS without the local profile
- Implementation with Vistar Trafficking Repo
- Flask improvements that align with Vistar standards
  - Error handling
  - Logging
  - Environment configurations
  - Security

## Included modules support

- [`Flask`] — base for application.
- [`boto3`] — for uploading csv data to AWS.
- [`flask_cors`] — grants access to client frontend.
- [`flask_smorest`] — blueprint routing and error handling.
- [`marshmallow`] — object/schema validation.