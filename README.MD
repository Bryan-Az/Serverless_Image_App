# Serverless Image App

The goal for this repository is to deploy a simple serverless application.

For example, like this one which generates Doge meme images, randomly choosing colors and locations of text, writing an image into an S3 bucket, as described here:
https://github.com/iopipe/lambda-workshop (Links to an external site.)

## Instructions

1. Clone this directory
2. CD into the directory
3. Change your region to us-east-1 in the AWS Console. 
4. Create a new lambda layer in the AWS console in the layers tab by uploading the image-magick-font-freetype.zip file, which is located in the root of this directory
5. It is important to use the ARN generated for this layer. Be sure to replace the ARN in the serverless.yml file with the ARN generated for your layer. It is used in the create method specified.
6. Create a ~/.aws/credentials file with your AWS credentials
7. Run bash serverless_start.sh to initiate npm with serverless
8. Now that it's running, you should sign into your AWS account and modify the role that 
   was created to include the policy S3FullAccess
9. Now, go to S3 and look for the bucket that was created. This is where the images will be stored.
    Important: Modify the bucket permissions to make it public by removing the block public access.
    Further, go to the bucket policy and add the following (remember to format the json correctly):
   {
   "Version": "2012-10-17",
   "Statement": [
   {
   "Sid": "Statement1",
   "Effect": "Allow",
   "Principal": "*",
   "Action": "s3:*",
   "Resource": "arn:aws:s3:::kangaroo-images/*"
   }
   ]
   }

10. Finally, you can test the output of the app in your terminal
11. Run the following command: serverless invoke --function create -p event.json
12. You should see the following output, or something similar:
    {
    "text": "https://kangaroo-images.s3.amazonaws.com/0e4b0b0a-5b1a-4b8a-8b8a-1a4b0b0a5b1a.png",
    "unfurl_links": true,
    "response_type": "in_channel"
    }
