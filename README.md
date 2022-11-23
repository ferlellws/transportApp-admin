# transportApp
Esta es la base para el backend del aplicativo de transporte SaaS para crear los tenants.

## Arquitectura

El aplicativo está implementado con arquitectura serverless con el uso de la nube de AWS.

[!Alt text](../../../Downloads/Arquitectura%20BabyGift-Arquitectura%20BabyGift.jpeg)

## Requirements
* AWS CLI
* [Python 3.6 installed](https://www.python.org/downloads/)
* [Docker installed](https://www.docker.com/community-edition)
* [Python Virtual Environment](http://docs.python-guide.org/en/latest/dev/virtualenvs/)


## CLI Commands to package and deploy your application
CLI commands to package, deploy and describe outputs defined within the cloudformation stack.

First, we need an `S3 bucket` where we can upload our Lambda functions packaged as ZIP before we deploy anything - If you don't have a S3 bucket to store code artifacts then this is a good time to create one:

```bash
aws s3 mb s3://BUCKET_NAME
```

Next, run the following command to package your Lambda function. The `sam package` command creates a deployment package (ZIP file) containing your code and dependencies, and uploads them to the S3 bucket you specify. 

```bash
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

The `sam deploy` command will create a Cloudformation Stack and deploy your SAM resources.
```bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name transportapp \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides MyParameterSample=MySampleValue
```

To see the names of the S3 bucket and DynamoDB table created after deployment, you can use the `aws cloudformation describe-stacks` command.
```bash
aws cloudformation describe-stacks \
    --stack-name transportapp --query 'Stacks[].Outputs'
```
