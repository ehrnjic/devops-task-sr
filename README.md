# DevOps task
Example how to build, test and deploy app as container with Azure DevOps Pipeline

# CI/CD
In this repository is a simple NodeJS application that I used in this example. 

In my organization on Azure DevOps, I created public pipeline https://dev.azure.com/devops-org-sr/nodejs-app to automate CI. 

This pipeline is configured to use this github repo as SCM and execute this steps: 1. Prepare build agent with Node envirovment, 2. Run npm build script with unit tests, 3. Containerize app, 4. Push that container to Azure Container Registry. Pipeline will be triggered when commit in the main branch or manually. Application deployment is automated and triggered by webhook when new image appears in container registry.
This pipeline is presented through the file **azure-pipelines.yml**. This file can be modified with new elements which means that the pipeline itself will be changed according to our needs.

```
trigger:
- main

variables:
  dockerRegistryServiceConnection: 'a9692551-7304-48fe-a554-03311f6ccebf'
  imageRepository: 'nodejs-app'
  containerRegistry: 'devopstaskcr.azurecr.io'
  dockerfilePath: '$(Build.SourcesDirectory)/Dockerfile'
  tag: '$(Build.BuildId)'

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '12.x'
  displayName: 'Install Node.js'

- script: |
    npm install
    npm run build
  displayName: 'npm install and build'

- task: Docker@2
  displayName: Build and push an image to container registry
  inputs:
    command: buildAndPush
    repository: $(imageRepository)
    dockerfile: $(dockerfilePath)
    containerRegistry: $(dockerRegistryServiceConnection)
    tags: |
      $(tag)
      latest
```

# Architecture high-level overview

![Home Infrastructure Diagram](https://raw.githubusercontent.com/ehrnjic/devops-task-sr/main/doc/devops-task-sr.png)
