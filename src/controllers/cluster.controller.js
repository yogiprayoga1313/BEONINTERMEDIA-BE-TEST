const clusterModel = require("../models/cluster.model")

exports.getCluster = async (request, response) => {
    try { 
        const sortWhaitlist = ["name"]
        if(request.query.sort && !sortWhaitlist.includes(request.query.sort)){
            return response.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options: ${sortWhaitlist.join(",")}`
            })
        }

        const sortByWhaitlist = ["asc", "desc"]
        if(request.query.sortBy && !sortByWhaitlist.includes(request.query.sortBy.toLowerCase())){
            return response.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options:  ${sortByWhaitlist.join(",")}`
            })
        }

        const data = await clusterModel.findAllCluster(request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        return response.json({
            success: true,
            message: "List off all Cluster",
            results: data
        })

    } 
    catch (error) {
        console.log(error)
    }
}

exports.getOneCluster = async (request, response) => {
    try {
        if(isNaN(request.params.id) && parseInt(request.params.id) !== request.params.id){
            return response.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const data = await clusterModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail Cluster",
                results: data
            })
        }
        else{
            return response.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: data
            })
        }
  
    } catch (error) {
        console.log(error)
  
    }
  
}

exports.createCluster = async (request, response) => {
    // console.log(request.body)
    try{
        if(!request.body.name,
            !request.body.cluster_nomer,
            !request.body.status_payment_id,
            !request.body.status_huni_id){
            return response.status(404).json({
                success: false,
                message: "Data cannot be empty!"
            })
        }
        const cluster = await clusterModel.insert(request.body)
        return response.json({
            success: true,
            message: "Create cluster data success",
            results: cluster
        })
    }catch(err){
        console.log(err)
    }
}

exports.updateCluster = async (request, response) => {
    try{
        if(!request.params.id || isNaN(request.params.id)){
            return response.status(404).json({
                success: false,
                message: "Error : ID cannot be empty!",
                results: ""
            })
        }
        const resultUpdate = await clusterModel.update(request.params.id, request.body)
        if(resultUpdate){
            return response.json({
                success: true,
                message: "Update cluster sucessfully",
                results: resultUpdate
            })
        }
        else{
            return response.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: ""
            })
        }
    }
    catch(err){
        return console.log(err)
    }
}

exports.deleteCluster = async (request, response) => {
    try {
        const resultsCluster = await clusterModel.findOne(request.params.id)
        if(!resultsCluster){
            return response.status(404).json({
                success: false,
                message: "Error : Data Cluster not found"
            })
        }
        await clusterModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete Cluster sucessfully"
        })
    } catch (error) {
        return  console.log(error)
    }

}