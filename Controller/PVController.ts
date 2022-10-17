import {PassengerVehiclesEntity,PVOracleEntity} from "../Entity/PVEntity";
import {PVRepository,IPVRepository} from "../Repository/pvRepository";
import {IPVCURDOperationsLogic,IPVLogicOptions,PVLogicCurdOperations} from "../Logic/PVLogic";
import {Connection} from "typeorm";
import { DbConnection } from "../Repository/DbConnection";

export class PVController implements IPVCURDOperationsLogic{

private readonly pvRepository:IPVRepository;
private readonly pvCURDOperationsLogic:IPVCURDOperationsLogic;
private readonly connection:Promise<Connection>;



constructor(){
    this.connection= DbConnection();
    this.pvRepository=new PVRepository(this.connection)
    this.pvCURDOperationsLogic= new PVLogicCurdOperations(this.pvRepository);
}

    public async AddPV(params: IPVLogicOptions):Promise<void>{

        try {

            await this.pvCURDOperationsLogic.AddPV({
                passengerVehiclesEntity:params.passengerVehiclesEntity
            })
        
        } catch (error) {

            throw new Error(error);
            
        }

    }
 
    public async UpdatePV(params: IPVLogicOptions): Promise<void> {

        try {

            await this.pvCURDOperationsLogic.UpdatePV({
                passengerVehiclesEntity:params.passengerVehiclesEntity
            })
        
        } catch (error) {
    
            throw new Error(error);
            
        }
    }

    public async GetPVs(): Promise<PassengerVehiclesEntity[] | undefined> {
        
        let result;

        try {

            result = await this.pvCURDOperationsLogic.GetPVs();
        
        } catch (error) {
    
            throw new Error(error);
            
        }

        return result;

    }

    public async DeletePV(params: IPVLogicOptions): Promise<void> {

        let result;

        try {

            result = await this.pvCURDOperationsLogic.DeletePV({passengerVehiclesEntity:params?.passengerVehiclesEntity!});
        
        } catch (error) {
    
            throw new Error(error);
            
        }

        return result;

    }


    public async GetPVAvailableStock(params: IPVLogicOptions): Promise<number | undefined> {
        
        let result;

        try {

            result = await this.pvCURDOperationsLogic.GetPVAvailableStock({pvOracleEntity:params?.pvOracleEntity!});
        
        } catch (error) {
    
            throw new Error(error);
            
        }

        return result;

    }


    public async FindPV(params: IPVLogicOptions): Promise<PassengerVehiclesEntity | undefined> {

        let result;

        try {

            result = await this.pvCURDOperationsLogic.FindPV({passengerVehiclesEntity:params?.passengerVehiclesEntity!})
        
        } catch (error) {

            throw new Error(error);
            
        }

        return result;
    }

}