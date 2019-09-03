---
id: starting-the-blockchain-services
title: Starting the blockchain services
sidebar_label: Starting the blockchain services
---


## Introduction

This guide allows you to test out being a Tesuji Plasma chain operator. You'll learn how to start the blockchain services, using either Docker Compose, or a Linux install and manual startup.

<!-- CHECK AND REMOVE THIS NOTE AFTER LUMPHINI? -->

> A public testnet for the OMG Network is coming soon. However, if you are brave and want to test being a Tesuji Plasma chain operator, read on!

***

## How to start to blockchain services

### Option 1: Use Docker Compose (recommended)

This is the recommended method to start the blockchain services, with the auxiliary services automatically provisioned through Docker.

**Pre-requisites:**

<!-- * Use docker-compose version 1.24.0, build 0aa59064. Version 1.17 has been found to be problematic. INO SAYS CAN BE REMOVED. I HAVE ASKED TO CLARIFY IF WE ARE NO LONGER RECOMMENDING ANY VERSION-->
* Stop any services that are listening on the following TCP ports: 9656, 7434, 5000, 8545, 5432, 5433. All commands should be run from the root of the repo.


**Perform these steps:**

1. Bring up the system, or specific services only:
    * To bring up the entire system, run `docker-compose up`
    * To bring up specific services only, such as the childchain service or geth, run `docker-compose up childchain geth ...`

    Note: This will also bring up any services the childchain depends on.

    * To run a Watcher only, first, ensure you sent an ENV variable called withINFURA_API_KEYwith your api key; then, run:  `docker-compose -f docker-compose-watcher.yml up`

2. To retrieve the deployed contract details, run `curl localhost:8000/get_contract`
    
***



### Option 2: Install on a Linux host & manual start up

1. Install the child chain server and watcher.
    
    Follow the guide here: https://github.com/omisego/elixir-omg/blob/master/docs/install.md

2. Start the service (manual service startup).
    
    <!-- INO SAYS THIS GUIDE NEEDS TO BE REWRITTEN SO COMMENTING OUT FOR NOW, AND AWARE THERE ARE THUS NO INSTRUCTIONS PROVIDED FOR THIS STEP: Follow the guide for manual service startup, here: https://github.com/omisego/elixir-omg/blob/master/docs/manual_service_startup.md -->

3. Follow steps in the demo scripts

    Once you've have started the child chain server and/or the watcher, follow the steps in the demo scripts.

    **Important!** Some steps should be performed in the Elixir shell (iex), and some in the shell directly. To start a configured instance of the iex REPL, from the elixir-omg root directory inside the container:
    ```
    iex -S mix run --no-start --config ~/config.exs
    ```

    **Important!** Follow one of the scripts in the docs directory. Don't pick any OBSOLETE demos.

***


## Troubleshooting
See more troubleshooting information at https://github.com/omisego/elixir-omg/blob/master/docs/troubleshooting.md



### View running containers
Run `docker ps`

### Stop all running containers
Containers may be left hanging if service start up fails, and this may impact services starting when running docker-compose up in future.
Run `docker kill $(docker ps -q)`

### Blockhain services not present on host
If the blockchain services are not already present on the host,	docker-compose attempts to build the image with the following tag, and continues using it: 

`elixir-omg:dockercompose` 

### Make Docker use latest commit from elixir-omg
To resolve, trigger a fresh build by passing `--build flag` to `docker-compose up --build`
