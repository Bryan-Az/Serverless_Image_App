# Serverless Image App

The goal for this repository is to deploy a simple serverless application.

For example, like this one which generates Doge meme images, randomly choosing colors and locations of text, writing an image into an S3 bucket, as described here:
https://github.com/iopipe/lambda-workshop (Links to an external site.)

## Instructions

1. Clone this directory
2. CD into the directory
3. Create a ~/.aws/credentials file with your AWS credentials
4. Run bash serverless_start.sh to initiate npm with serverless
5. Now that it's running, you should sign into your AWS account and modify the role that 
   was created to include the policy S3FullAccess
6. Also, change your region to us-east-1
7. Now, go to S3 and look for the bucket that was created. This is where the images will be stored.
    Important: Modify the bucket permissions to make it public by removing the block public access.
    Further, go to the bucket policy and add the following:
   {
     "Version": "2012-10-17",
     "Statement": [
     {
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::iopipe-workshop-doge-65901570/*"
      }
    ]
   }
8. Finally, you can test the output of the app in your terminal
9. Run the following command: serverless invoke --function create -p event.json
10. You should see the following output, or something similar:
    {
    "text": "<https://s3.amazonaws.com/iopipe-workshop-doge-65901570/doge-22.jpg>",
    "unfurl_links": true,
    "response_type": "in_channel"
    }
