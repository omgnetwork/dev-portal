---
id: api-reference-introduction
title: Introduction
sidebar_label: Introduction
---

This is a guide to working with the OmiseGO Network REST APIs.

The OmiseGO API documentation describes how you can explore and interact with the OmiseGO APIs. This documentation should help you become familiar with the available resources and how to consume them with HTTP requests.

## Authentication
OmiseGO APIs are completely open. No authentication is required to query and get data

## OmiseGO Network APIs


### Watcher	
Everyone needs to run their own watcher. This means you are not bound by a requirement to place complete trust in the network operator (in this case, OmiseGO).

* Watcher’s informational API
    
    API for common interactions, such as balance query, or making transactions. 

    View the docs at https://developer.omisego.co/elixir-omg/docs-ui/?url=master/informational_api_specs.yaml

* Watcher security-critical API
    
    Plasma exit operations API.

    View the docs at https://developer.omisego.co/elixir-omg/docs-ui/?url=master/security_critical_api_specs.yaml


### Child chain	
A public and open Plasma operator API that allows you to get block data for implementing your own watcher.

View the doc at https://developer.omisego.co/elixir-omg/docs-ui/?url=master/operator_api_specs.yaml

To use the child chain you'll need to first deposit funds (on Ethereum) into the OmiseGO Network.

Funds on the network are protected by your own private key, which is the authorization mechanism used to sign Ethereum and Plasma transactions.

When sending properly signed transactions, you authorize yourself as a valid owner of the funds. Additionally, Plasma guarantees the safety of your funds against dishonest attempts by other users or the operator. A Plasma operator API that allows you to get block data for implementing your own watcher.

<!-- Review comment was: Authentication: I can see no point to list ch-ch endpoints in the table. Also this is safer to submit txs through a Watcher -->
<!-- | Endpoint  | Description   |
| ---       |   ---         |
| transaction.submit    | Submits a signed transaction to the child chain. |
| block.get | Retrieves a specific block from the child chain by its hash, which was published on the root chain. | -->



## JSON Schema
All resources support JSON Schema. Responses are in JSON format. View the API documentation to view details of a resource. 

For the child chain server and Watcher, all calls use HTTP POST and pass options in the request body in JSON format. 

Errors
Errors usually return with HTTP response code 200, even if the result is an error, with error details in the response body. One exception to this is if an internal server error occurs - in this case it will return 500

When an error occurs, success is set to false and data will contain more information about the error.

```
{
  "version": "1",
  "success": false,
  "data": {
    "code": "account:not_found",
    "description": "Account not found"
  }
}
```

## Error Codes


| Code  | Description   |
| ---   | ---   |
| server:internal_server_error  | Something went wrong on the server. You'll need to try again. |
| operation:bad_request | Parameters required by this operation are missing or incorrect. More information about error in response object data/messages property. |
| operation:not_found   | Operation cannot be found. Check request URL. |
| challenge:exit_not_found  | The challenge of particular exit is impossible because exit is inactive or missing |
| challenge:utxo_not_spent  | The challenge of particular exit is impossible because provided UTXO is not spent |
| exit:invalid  | UTXO was spent or does not exist. |
| get_status:econnrefused   | Cannot connect to the Ethereum node. |
| in_flight_exit:tx_for_input_not_found | No transaction that created input. |
| transaction:not_found | Transaction doesn't exist for provided search criteria. |
| transaction.create:insufficient_funds | Account balance is too low to satisfy the payment. |
| transaction.create:too_many_outputs   | Total number of payments + change + fees exceed maximum allowed outputs in transaction. We need to reserve one output per payment and one output per change for each currency used in the transaction. |
| transaction.create:empty_transaction  | Requested payment resulted in an empty transaction, which transfers no funds. |
| submit_typed:missing_signature    | Signatures should correspond to inputs owner. When all non-empty inputs has the same owner, signatures should be duplicated. |
| submit_typed:superfluous_signature    | Number of non-empty inputs should match signatures count. Remove redundant signatures. |

