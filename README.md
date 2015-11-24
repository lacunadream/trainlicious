## Trainlicious

### Background
One of the problems that many train operators have been facing is the lack of real-time passenger volume data. Taking into consideration infrastructure and cost constraints, we decided to build a solution that leveraged upon CCTV image feeds to calculate in real-time the level of crowdedness in carriages.

This repo contains the backend - reads from a postgresql database and exposes a REST API. 

### Issues
1. Every API call results in a database connection + call. I am not sure if the the connection needs to be recreated on every API call. Is there a way to keep the connection alive/pool properly? 

### Footnote
Trainlicious emerged as the champion of HackTrain 2.0
