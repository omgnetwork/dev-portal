---
id: ewallet-components
title: Components
sidebar_label: Components
---




The eWallet is an umbrella Elixir application containing the following sub-applications:

  - [ewallet_api](https://github.com/omisego/ewallet/tree/master/apps/ewallet_api): Sub-application acting as a gateway to the World Wide Web through HTTP-RPC endpoints. These endpoints are used to __interact with the eWallet__. Check the [Swagger spec](https://github.com/omisego/ewallet/blob/master/apps/ewallet_api/priv/spec.yaml) for more details.

  - [admin_api](https://github.com/omisego/ewallet/tree/master/apps/admin_api): Sub-application acting as a gateway to the World Wide Web through HTTP-RPC endpoints. These endpoints are used to __manage__ the system. Check the [Swagger spec](https://github.com/omisego/ewallet/blob/master/apps/admin_api/priv/spec.yaml) for more details.

  - [frontend](https://github.com/omisego/ewallet/tree/master/apps/frontend): Sub-application containing the front-end that allows provider admins, such as staff at the headquarter, to perform system-wide actions such as managing tokens, accounts, API keys, users, and wallets.

  - [ewallet](https://github.com/omisego/ewallet/tree/master/apps/ewallet): Sub-application containing the business logic (minting process, transfer of value, etc.).

  - [ewallet_db](https://github.com/omisego/ewallet/tree/master/apps/ewallet_db): Sub-application containing all the database schemas and migrations.

  - [local_ledger](https://github.com/omisego/ewallet/tree/master/apps/local_ledger): Sub-application containing the business logic.

  - [local_ledger_db](https://github.com/omisego/ewallet/tree/master/apps/local_ledger_db): Sub-application containing all the database schemas and migrations.

  - [ewallet_config](https://github.com/omisego/ewallet/tree/master/apps/ewallet_config): Sub-application used to handle the settings and application environments.

  - [url_dispatcher](https://github.com/omisego/ewallet/tree/master/apps/url_dispatcher): Sub-application dealing with dispatching each HTTP request to the appropriate sub-application.

  - [activity_logger](https://github.com/omisego/ewallet/tree/master/apps/activity_logger): Sub-application tracking activities such as inserting, updating, deleting records, etc.

  - [utils](https://github.com/omisego/ewallet/tree/master/apps/utils): Sub-application containing utility functions that are not strictly related to the eWallet business logic.

  - [load_tester](https://github.com/omisego/ewallet/tree/master/apps/load_tester): Sub-application containing the load test runner and its scripts.

  - [eth_blockchain](https://github.com/omisego/ewallet/tree/master/apps/eth_blockchain) Interface to the Ethereum blockchain and its adapters

  - [eth_geth_adapter](https://github.com/omisego/ewallet/tree/master/apps/eth_geth_adapter) The interface to interact with geth JSON RPC api