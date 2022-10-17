import {PVController  } from "./Controller/PVController";

const main = async():Promise<void>=>{

let controller = new PVController();

// await controller.AddPV({

//     passengerVehiclesEntity:{
//         Brand:"Tata",
//         Color:"Red",
//         EngineType:"Electric",
//         MakeYear: new Date("2021-01-01"),
//         Mileage: 22,
//         PVName:"Tiago",
//         TopSpeed:200

//     }
// })

// await controller.UpdatePV({

//     passengerVehiclesEntity:{
//         Brand:"Tata",
//         Color:"Red",
//         EngineType:"Electric",
//         MakeYear: new Date("2021-01-01"),
//         Mileage: 22,
//         PVName:"Tiago",
//         TopSpeed:200

//     }
// })

// await controller.DeletePV({

//     passengerVehiclesEntity:{
//         Brand:"Tata",
//         Color:"Red",
//         EngineType:"Electric",
//         MakeYear: new Date("2021-01-01"),
//         Mileage: 22,
//         PVName:"Tiago",
//         TopSpeed:200
//     }
// })

let myResult = await controller.FindPV({

    passengerVehiclesEntity:{
       PVId:6
    }
})

console.log("Result:", myResult);

}



main()
    .then((result)=> console.log(result))
    .catch((ex)=> console.log(ex.message));

