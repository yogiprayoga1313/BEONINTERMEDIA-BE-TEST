const clusterRouters = require("express").Router()


const clusterControllers = require("../controllers/cluster.controller")

clusterRouters.get("/:id", clusterControllers.getOneCluster)
clusterRouters.get("/", clusterControllers.getCluster)
clusterRouters.post("/", clusterControllers.createCluster)
clusterRouters.patch("/:id", clusterControllers.updateCluster)
clusterRouters.delete("/:id", clusterControllers.deleteCluster)

module.exports = clusterRouters