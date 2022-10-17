import {PassengerVehiclesEntity, PVOracleEntity} from "../Entity/PVEntity";
//import {pvinventory} from "../Entity/PVOracle";
import {Connection} from "typeorm";
import { FindOptionsWhere } from 'typeorm';
import {Guid} from "guid-typescript";


export interface IPVRepository{
    AddPV(PVEntity:PassengerVehiclesEntity):Promise<void>;
    UpdatePV(PVEntity:PassengerVehiclesEntity):Promise<void>;
    GetPVs():Promise<PassengerVehiclesEntity[]>
    DeletePV(PVId:number):Promise<void>;
    GetPVAvailableStock(PVName:string):Promise<number>;
    FindPV(PVId:number):Promise<PassengerVehiclesEntity>;
}



export class PVRepository implements IPVRepository{

    private readonly connection:Promise<Connection>;

    constructor(connection:Promise<Connection>){

        this.connection = connection;
    }


    public async AddPV(passengerVehicles: PassengerVehiclesEntity): Promise<void> {
       

        try {
            
            passengerVehicles.Identifier = Guid.create().toString();

            await (await this.connection)
                      .getRepository(PassengerVehiclesEntity)
                      .save(passengerVehicles);

        } catch (error) {

            throw(error);

        }

    }




    public async UpdatePV(passengerVehicles: PassengerVehiclesEntity): Promise<void> {
        

        try {
            
            let repository = await( await this.connection)
                                .getRepository(PassengerVehiclesEntity);

            let passengerVehiclesUpdate = await repository.findOne({ where: { PVId: passengerVehicles.PVId }});

           

            if(passengerVehiclesUpdate !== undefined){

                passengerVehiclesUpdate!.Brand = passengerVehicles.Brand;
                passengerVehiclesUpdate!.PVName = passengerVehicles.PVName;
                passengerVehiclesUpdate!.Color = passengerVehicles.Color;
                passengerVehiclesUpdate!.EngineType = passengerVehicles.EngineType;
                passengerVehiclesUpdate!.MakeYear = passengerVehicles.MakeYear;
                passengerVehiclesUpdate!.Mileage = passengerVehicles.Mileage;
                passengerVehiclesUpdate!.TopSpeed = passengerVehicles.TopSpeed;
            }


            await repository.save(passengerVehiclesUpdate!);

            
        } catch (error) {
            
        }

    }

    public async GetPVs(): Promise<PassengerVehiclesEntity[]> {
        

        try {
            
        let repository = await(await this.connection)
                            .getRepository(PassengerVehiclesEntity);
        let pvList = await repository.createQueryBuilder("passengervehicles")
                  .select(['passengervehicles.PVId','passengervehicles.PVName','passengervehicles.Brand','passengervehicles.MakeYear','passengervehicles.EngineType','passengervehicles.Color','passengervehicles.TopSpeed','passengervehicles.Mileage'])
                  .getMany();

        //if(pvList.length>0){
            return pvList;
        //}

        

        } catch (error) {
            
        
            throw new Error(error);


        }

    }

    public async DeletePV(PVId: number): Promise<void> {

        try {
            
            let repository = await(await this.connection)
                                .getRepository(PassengerVehiclesEntity);

            let pvRemove = await repository.findOne({where: { PVId : PVId } });

            if(pvRemove!==undefined){

                await repository.remove(pvRemove!);
            }

        } catch (error) {
            
            throw new Error(error);

        }
    }

    public async GetPVAvailableStock(PVName:string): Promise<number> {
        
        try {
            
            let repository = await(await this.connection)
                                .getRepository("pvinventory");
            let  pvStock= await repository.createQueryBuilder("pvinventory")
                                           .where("pvinventory.PVName = :PVName", {PVName:PVName})
                                           .getCount()
            

            //if(pvStock !== undefined){

                return pvStock;
           // }

        } catch (error) {
            
            throw new Error(error);
        }

    }

    public async FindPV(PVId: number): Promise<PassengerVehiclesEntity> {
        
        try {
            
            let repository = await(await this.connection)
                                .getRepository("passengervehicles");
            let pvDetails = await repository.createQueryBuilder("passengervehicles")
                                            .select(['passengervehicles.PVId','passengervehicles.PVName','passengervehicles.Brand','passengervehicles.MakeYear','passengervehicles.EngineType','passengervehicles.Color','passengervehicles.TopSpeed','passengervehicles.Mileage'])
                                            .getOne();


            //if(pvDetails!==undefined){

                return pvDetails!;
            //}

        } catch (error) {
            
            throw new Error(error);

        }

    }


}