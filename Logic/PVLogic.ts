import { PassengerVehiclesEntity, PVOracleEntity } from "../Entity/PVEntity";
import { IPVRepository } from "../Repository/pvRepository";
import { DbConnection } from "../Repository/DbConnection";



export interface IPVLogicOptions{
    passengerVehiclesEntity?:PassengerVehiclesEntity;
    pvOracleEntity?:PVOracleEntity;
}

export interface IPVCURDOperationsLogic{

    AddPV(params: IPVLogicOptions):Promise<void>;
    UpdatePV(params: IPVLogicOptions):Promise<void>;
    GetPVs():Promise<PassengerVehiclesEntity[] | undefined>
    DeletePV(params: IPVLogicOptions):Promise<void>;
    GetPVAvailableStock(params: IPVLogicOptions):Promise<number | undefined>;
    FindPV(params: IPVLogicOptions):Promise<PassengerVehiclesEntity | undefined>;

}


export class PVLogicCurdOperations implements IPVCURDOperationsLogic{

   private readonly pvRepository:IPVRepository;

    constructor(_pvRepository:IPVRepository){

        this.pvRepository=_pvRepository;
        
    }
    

    public async AddPV(params: IPVLogicOptions): Promise<void> {
        
       try {
        
        await this.pvRepository.AddPV(params?.passengerVehiclesEntity!);


       } catch (error) {
        
        throw new Error(error);

       }
        
    }

    public async UpdatePV(params: IPVLogicOptions): Promise<void> {
        
        try {

            await this.pvRepository.UpdatePV(params.passengerVehiclesEntity!);
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    public async GetPVs(): Promise<PassengerVehiclesEntity[] | undefined> {

        let result:PassengerVehiclesEntity[];
        try {

            result= await this.pvRepository.GetPVs();
            
        } catch (error) {
            
            throw new Error(error);
        }
        
        return result;

    }

    public async DeletePV(params: IPVLogicOptions): Promise<void> {
        
        try {

            await this.pvRepository.DeletePV(params?.passengerVehiclesEntity?.PVId!);
            
        } catch (error) {
            
            throw new Error(error);
        }

    }

    public async GetPVAvailableStock(params: IPVLogicOptions): Promise<number | undefined> {
       
        let result:number;
        try {

            result=await this.pvRepository.GetPVAvailableStock(params?.passengerVehiclesEntity?.PVName!);
            
        } catch (error) {
            
            throw new Error(error);
        }

        return result;
    }

    public async FindPV(params: IPVLogicOptions): Promise<PassengerVehiclesEntity | undefined> {
        
        let result:PassengerVehiclesEntity;
        try {

            result=await this.pvRepository.FindPV(params?.passengerVehiclesEntity?.PVId!);
            
        } catch (error) {
            
            throw new Error(error);
        }

        return result;

    }

}