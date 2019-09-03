---
id: install-eWallet-server
title: Install eWallet Server
sidebar_label: Install eWallet Server
---


## Overview

This is a guide to installing eWallet Server. 

Instructions are provided for the following options: 
* A quick install on macOS and Linux; or, 
* Advanced install (bare metal) instructions on other platforms


### Quick install on macOS or Linux
The quickest way to get OmiseGO eWallet Server running on macOS and Linux is to use Docker-Compose.

**Perform these steps:**

1. Install [Docker](https://docs.docker.com/install/) and [Docker-Compose](https://docs.docker.com/compose/install/).

2. Download OmiseGO eWallet Server's [docker-compose.yml](https://raw.githubusercontent.com/omisego/ewallet/master/docker-compose.yml):
    ```
    curl -O -sSL
    ```

    https://raw.githubusercontent.com/omisego/ewallet/master/docker-compose.yml

3. Create docker-compose.override.yml, either manually, or use this auto-configuration script:
    ```
    curl -O -sSL
    ```
    https://raw.githubusercontent.com/omisego/ewallet/master/docker-gen.shchmod +x docker-gen.sh./docker-gen.sh > docker-compose.override.yml


4. Initialize the database and start the server:
    ```
    docker-compose run --rm ewallet initdb
    docker-compose run --rm ewallet seed
    docker-compose up -d
    ```

***



### Advanced install on other platforms

This section provides instructions for installing the eWallet server on a base operating system, on platforms other than macOS or Linux.  

The advanced installation involves these tasks:

1. Prepare the environment
2. Set up the server.
3. Seed the database.
4. Start the server.


#### Step 1: Prepare the environment
To run this bare metal install, you'll need the following applications installed and running on your machine before you can set up the server:

* [PostgreSQL](https://www.postgresql.org/) - used for storing most of the data for the eWallet and LocalLedger.

* [ImageMagick](https://www.imagemagick.org/script/index.php) - used for formatting images in the Admin Panel. Tested with version> 7.0.7-22.

* [Elixir](https://elixir-lang.org/install.html) - used as the primary language for the server components of the eWallet.

* [Git](https://git-scm.com/) - used for downloading and synchronizing codebase with the remote code repository.

* [NodeJS](https://nodejs.org/en/) - used for building front-end code for the Admin Panel.

Once you have these applications installed, you're ready to set up the server. 

> Using macOS? You can also [install these dependencies via Homebrew](https://github.com/omisego/ewallet/blob/master/docs/setup/macos/brew_install_dependencies.md).





#### Step 2: Set up the server

Perform these steps to set up the server:  

1. Get the code. Pull the eWallet code from the OmiseGO eWallet Git repository, to      a directory of your choice:
    ```
    $ git clone https://github.com/omisego/ewallet && cd ./ewallet
    ```

2. Install code dependencies:

    2.1 Fetch Elixir dependencies:
        ```
        $ mix deps.get
        ```

    2.2 Install front-end dependencies:
    ```
    $ (cd apps/frontend/assets/ && npm install)
    ```

    > **Note**: *Parentheses in the code above forces the commands to be executed in a subshell, and returns to the current working directory after the execution.*

3. Configure environment variables:
    
    Some configurations have predefined default values. 
    
    If your environment requires different values; then, run the following to set environment variables in the current session (or to add the settings to any profile you're using): 

    run `export ENV=value`

    | Environment variable  |   Description |
    |   ---                 |   ---         |
    |   PORT                |   The internal listening port for the application. Defaults to 4000   |
    | DATABASE_URL          | The URL where the eWallet database can be accessed. Defaults to postgres://localhost/ewallet_dev  |
    |   LOCAL_LEDGER_DATABASE_URL   | The URL where the Local Ledger database can be accessed. Defaults to postgres://localhost/local_ledger_dev    |

    > **Note:** *For more information about all the environment variables, see Environment Variables.*

4. Migrate the database: 

    4.1 Run the following command to set up the databases:   
    `$ mix do ecto.create, ecto.migrate`

    4.2 Run the following command to set up the test database, which is used to run the tests: 
    `$ MIX_ENV=test mix do ecto.create, ecto.migrate`


Use the following command to run the tests:  $ mix test
This will ensure your setup is working properly.

#### Step 3: Seed the database
Some initial data is required to start the server. Either run the seed or the sample seed below:

1. Option A: Run this command to set up the initial data:
    `$ mix seed`

2. Option B: Run this command to set up the initial data and populate the database with more sample data
    `$ mix seed --sample`ß


#### Step 4: Start the server
1. Use the following command to start the server: 
    `$ mix omg.server`

2. View confirmation output:
    ```
    [info] Setting up websockets dispatchers...
    [info] Running UrlDispatcher.Plug with Cowboy http on port 4000
    ```

3. Now you can access the eWallet server, using the available APIs:
    ```
    $ curl http://localhost:4000
    {"status": true}
    Next step

4. Read the documentation to learn more and start using your eWallet!

If you need help with the setup, check the Setup Troubleshooting guide


*********

Create and update the database
Docker image entrypoint is configured to recognize most commands that are used during normal operations. The way to invoke these commands depend on the installation method you choose.

In case of Docker-Compose, use docker-compose run --rm ewallet <command>
In case of Docker, use docker run -it --rm omisego/ewallet <command>
In case of bare metal, see also bare metal installation instruction.
initdb
For example:

docker-compose run --rm ewallet initdb (Docker-Compose)
docker run -it --rm omisego/ewallet:latest initdb (Docker)
These commands create the database if not already created, or upgrade them if necessary. This command is expected to be run every time you have upgraded the version of OmiseGO eWallet Suite.

seed
For example:

docker-compose run --rm ewallet seed (Docker-Compose)
docker run -it --rm omisego/ewallet:latest seed (Docker)
These commands create the initial data in the database. If seed is run without arguments, the command will seed initial data for production environment. The seed command may be configured to seed with other kind of seed data:

seed --sample will seed a sample data suitable for evaluating OmiseGO eWallet Server.
seed --e2e will seed a data for end-to-end testing.
config
For example:

docker-compose run --rm ewallet config <key> <value> (Docker-Compose)
docker run -it --rm omisego/ewallet:latest config <key> <value> (Docker)
These commands will update the configuration key (see also settings documentation) in the database. For some keys which require whitespace, such as gcs_credentials, you can prevent string splitting by putting them in a single or double-quote, e.g. config gcs_credentials "gcs configuration".

Documentation
Detailed documentation can found in the GitHub docs directory. It is recommended to take a look at the documentation of the OmiseGO eWallet Server you are running.

API documentation
OmiseGO eWallet Server is meant to be run by the provider, and thus API documentation is available in the OmiseGO eWallet Server itself rather than as online documentation. You may review the API documentation at the following locations in the OmiseGO eWallet Server setup.

/api/admin/docs.ui for Admin API, used by server apps to manage tokens, accounts, transactions, global settings, etc.
/api/client/docs.ui for Client API, used by client apps to create transaction on behalf of user, user's settings, etc.
In case you want to explore the API documentation without installing the OmiseGO eWallet Server, you may use our OmiseGO eWallet Staging. Please note that OmiseGO eWallet Staging tracks development release and there might be API differences from the stable release.

Admin API documentation (Swagger JSON, Swagger YAML)
Client API documentation (Swagger JSON, Swagger YAML)
Community Efforts
We are thankful to our community for creating and maintaining these wonderful works that we otherwise could not have done ourselves. If you have ported any part of the OmiseGO eWallet Server to another platform, we will be happy to list them here. Submit us a pull request.

Alainy/OmiseGo-Go-SDK (Golang)
block-base/ewallet-js (JavaScript)
Contributing
Contributing to the OmiseGO eWallet Server can be contributions to the code base, bug reports, feature suggestions or any sort of feedback. Please learn more from our contributing guide.

Support
The OmiseGO eWallet Server team closely monitors the following channels.

GitHub Issues: Browse or file a report for any bugs found
Gitter: Discuss features and suggestions in real-time
Stack Overflow: Search or create a new question with the tag omisego
If you need enterprise support or hosting solutions, please get in touch with us for more details.

License
The OmiseGO eWallet Server is licensed under the Apache License

## Setup Troubleshooting Guide

### "invalid url ... path should be a database name"

**Problem:**

    ```elixir
    (Mix) Could not start application ewallet_db: EWalletDB.Application.start(:normal, []) returned an error: shutdown: failed to start child: EWalletDB.Repo
    (EXIT) an exception was raised: (Ecto.InvalidURLError) invalid url http://localhost, path should be a database name
    ```

**Solution**

The eWallet cannot connect to the database. Ensure you're using a valid URL, which would include the database protocol, e.g. `postgres://` and should point to the address where your database resides, as well as the database name. 
For example:

    ```bash
    export DATABASE_URL=postgres://localhost/ewallet_dev
    export LOCAL_LEDGER_DATABASE_URL=postgres://localhost/local_ledger_dev
    ```

The above set valid URLs to the environment variables, which point the eWallet to the `postgres` databases at `localhost` with the database names `ewallet_dev` and `local_ledger_dev`.
***

### "Connect raised a KeyError error ... exception details are hidden ..."

**Problem:**

    ```elixir
    (Mix) The database for LocalLedgerDB.Repo couldn't be created: an exception was raised:
    ** (RuntimeError) Connect raised a KeyError error. The exception details are hidden, as they may contain sensitive data such as database credentials.
    (elixir) lib/keyword.ex:386: Keyword.fetch!/2
    (postgrex) lib/postgrex/protocol.ex:610: Postgrex.Protocol.auth_md5/4
    (postgrex) lib/postgrex/protocol.ex:504: Postgrex.Protocol.handshake/2
    (db_connection) lib/db_connection/connection.ex:135: DBConnection.Connection.connect/2
    (connection) lib/connection.ex:622: Connection.enter_connect/5
    (stdlib) proc_lib.erl:249: :proc_lib.init_p_do_apply/3
    ```

**Solution:**

Your eWallet instance has reached the database server. The database server is expecting a username and password. 
Ensure that:

1. You're not running commands as `sudo`.

2. If your database server requires authentication, you've provided the eWallet with the correct postgres's username and password (e.g. notice this part: your_pg_username:your_pg_password)

    ```bash
    export DATABASE_URL=postgres://your_pg_username:your_pg_password@localhost/ewallet_dev
    export LOCAL_LEDGER_DATABASE_URL=postgres://your_pg_username:your_pg_password@localhost/local_ledger_dev
    ```

3. If you prefer to entrust your local connections, your `pg_hba.conf` file should allow trusted connections from localhost, such as the following: 

    ```
    # TYPE  DATABASE        USER            ADDRESS                 METHOD
    local   all             all                                     trust
    host    all             all             127.0.0.1/32            trust
    host    all             all             ::1/128                 trust
    ```

***




