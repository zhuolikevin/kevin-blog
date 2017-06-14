---
layout: post
title: "Get Started with AWS DynamoDB in Node.js"
date: 2017-06-13 13:10:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Note
excerpt: Amazon DynamoDB is a fast and flexible NoSQL Database service integrated in AWS. This post works as a tutorial to get yourself ready for developing an application in NodeJS with data hosted in DynamoDB
---

Amazon DynamoDB is a fast and flexible NoSQL Database service integrated in AWS. This post works as a tutorial to get yourself ready for developing an application in NodeJS with data hosted in DynamoDB.

## Local Development

### 1. Download DynamoDB and DynamoDB Admin GUI

To develop your application locally without connecting to the cloud, we need to download the local version of DynamoDB. Can be found [here](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

After downloading the DynamoDB, we can find it as a `.jar` program. Java Runtime Environment (JRE) 6.x or newer is needed for the service. In the directory which you extracted, we can run it with the following command:

```bash
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

Then the database will be running on *http://localhost:8000*.

![DynamoDB running]({{ site.baseurl }}/assets/images/2017-06-13-1.png)

Now we can access our local database with [DynamoDB CLI](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html). However, lazy person as me prefers GUI to play with it. Fortunately, many other lazy people who met this problem days or years ago contribute to the community with fantastic tools. Among those tools, I recommend **dynamodb-admin**, which is published on npm and can be found [here](https://github.com/aaronshaf/dynamodb-admin).

We can use the following command to run **dynamodb-admin**

```bash
$ export AWS_ACCESS_KEY_ID=your_aws_id
$ export AWS_SECRET_ACCESS_KEY=your_aws_key
$ export DYNAMO_ENDPOINT=http://localhost:8000
$ dynamodb-admin
```

Then we can visit *http://localhost:8001* to play with our new database!

![dynamodb-admin]({{ site.baseurl }}/assets/images/2017-06-13-2.png)

> Note: You may see an empty database with no tables

### 2. Access the database with Node.js API

There are detailed references on how to make CRUD operations on DynamoDB with Node.js. Here we only take **scan** (i.e. getting all the items in a table).

First we need to connect to our database

```javascript
var AWS = require('aws-sdk');

// Define development or production
var endpoint = process.env['SITE_ENV'] == 'dev'
  ? 'http://localhost:8000'
  : 'https://dynamodb.us-west-2.amazonaws.com';

AWS.config.update({
  region: 'us-west-2',
  endpoint: endpoint
});
```

Here we need to `npm install aws-sdk` first if haven't yet.

For `endpoint`, we setup an enviroment variable in order to specify our development or production mode. So we need to export the enviroment variable locally.

```bash
export SITE_ENV=dev
```

When we deploy our codes to AWS, there is no such a variable on Amazon instances, then it will be using the remote endpoint.

Scanning the table is fairly easy.

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'Photos',
    ProjectionExpression: 'id, photo_url'
  };
docClient.scan(params, function(err, data) {
  if (err) {
    // Error handling
  } else {
    var photos = data.Items;
    // All photos as a list
  }
});
```

### Some useful links

- [Official Website of DynamoDB](https://aws.amazon.com/dynamodb/)
- [Developer Guide](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Getting Started Guide](http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/Welcome.html)
- [Local DynamoDB GUI Admin](https://github.com/aaronshaf/dynamodb-admin)
