---
id: integrate-the-eWallet-server
title: Integrate the eWallet server
sidebar_label: Integrate the eWallet server
---


## Overview
This page provides an overview for learning how to integrate eWallet server with your applications.

You may communicate with the eWallet Server APIs using any programming language you choose, via either of the following:

1. The HTTP-RPC endpoints directly; or,
2. One of the available SDKs

## HTTP-RPC WEB APIs
To use the HTTP-RPC web APIs directly, see the OpenAPI specifications containing all the available endpoints and how to interact with them.

You can access the interactive documentation on any running eWallet application, including the ones you deploy yourself!

### Admin API

* Interactive docs: http://localhost:4000/api/admin/docs
* OpenAPI YAML specs: http://localhost:4000/api/admin/docs.yaml
* OpenAPI JSON specs: http://localhost:4000/api/admin/docs.json

### eWallet API

* Interactive docs: http://localhost:4000/api/client/docs
* OpenAPI YAML specs: http://localhost:4000/api/client/docs.yaml
* OpenAPI JSON specs: http://localhost:4000/api/client/docs.json

## SDKs
The table describes the SDKs you can use for integration:

| SDK   | Integration type |
| ------------- | ------------- |
| Ruby SDK  | Used for implementing sensitive calls in your server-side applications (such as crediting or debiting tokens from/to a user).  |
| * iOS SDK
* Android SDK  | SDKs for non-sensitive, client-side application calls.


## Not seeing what you need?
If none of the current SDKs matches your needs, you can create it! 

Get in touch with us on Gitter and let us know. We'll be happy to help you implement it; if your SDK meets our standards, we'll support it as one of our official SDKs.