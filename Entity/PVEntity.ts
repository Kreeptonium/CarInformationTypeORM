import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("passengervehicles")

export class PassengerVehiclesEntity{

    
    @PrimaryGeneratedColumn()
    @PrimaryColumn("int")
    PVId?:number;

    @Column("varchar")
    PVName?:string;

    @Column("varchar")
    Brand?:string;

    @Column("varchar")
    MakeYear?:Date;

    @Column("varchar")
    EngineType?:string; //Electric, Hybrid, Petrol, Diesel etc.

    @Column("varchar")
    Color?:string

    @Column("int")
    TopSpeed?:number;

    @Column("int")
    Mileage?:number;

    @Column("varchar")
    Identifier?:string;

}

@Entity("pvinventory")

export class PVOracleEntity{

@PrimaryColumn("int")
@PrimaryGeneratedColumn()
OracleId?:number;

@Column("int")
PVId?:number;

@Column("int")
AvailableStock?:number;

@Column("int")
BackOrders?:number;

@Column("int")
FaultyPVs?:number;

}