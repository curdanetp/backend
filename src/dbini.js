const {Client} = require('pg')
const {db}=require ('./config');
const pool = require('./db');
const client = new Client({
    user: db.user,
    password: db.password,
    host:db.host,
    port: db.port,
    database: 'postgres'
})
var Connected = false;
var TB_Exists = false;
var DB_Exists = false;
const createDB =  `CREATE DATABASE ${db.database};`
const createTB = 'CREATE TABLE tasks(id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE, description VARCHAR(1000));'   
const existTB = `SELECT count(1) as dbcount FROM pg_catalog.pg_tables where schemaname='public' and tablename='tasks';`
async function  DB_Init() {
    try {
        console.log('Connecting to DB Server');
        await client.connect();    
        Connected=true;        
    } catch (error) {
       console.log('Cannot Connect Server');
       console.log(error.message);
       console.log(JSON.stringify(db));
    } 
    if (Connected) {
       console.log('[Server Ok]');
       try {
            console.log('Verifying if Database exists...');
            const exDb = await client.query(`SELECT 1 as dbcount from pg_database WHERE datname='${db.database}'`)           
            //if (exDb.rows[0].dbcount==0){  // exDb=0 DB doesn't Exists
            var DBFound=false;
            if (exDb.rows[0]){
                DBFound =(exDb.rows[0].dbcount!="0");                
            }
            console.log('DBFound',DBFound)
            if (!DBFound){  //DB doesn't Exists                
                console.log('[Database not found]');
                console.log('Creating Database...');
                try {
                    await client.query(createDB);                    
                    console.log('[Create Database Ok]');
                    DB_Exists=true;
                    try {                
                        console.log('Verifying if Table exists...');
                        const exDb = await pool.query(existTB)                         
                        var TBFound=false;
                        if (exDb.rows[0]){
                            TBFound =(exDb.rows[0].dbcount!="0");                
                        }                            
                        console.log('TBFound',TBFound)          
                    } catch (error) {
                    console.log('[Error verifying Table existance]: ',error.message)                   
                    }
                    if (!TBFound) { 
                        console.log('[Table not found]');
                        console.log('Creating Table...');
                        try {
                            await pool.query(createTB);    
                            console.log('Create Table Ok');
                            TB_Exists=true;
                        } catch (error) {
                            console.log('[Cannot Create Table]: ',error.message);
                        }    
            
                    }
                }catch(error) {
                    console.log('[Cannot Create Database]: ',error.message);
                }            
            } else { // exDb=1 DB Exists
                console.log('[Database Ok]');
                DB_Exists=true;
                try {                
                    console.log('Verifying if Table exists...');
                    const exDb = await pool.query(existTB)            
                    var TBFound=false;                    
                    if (exDb.rows[0]){
                        TBFound =(exDb.rows[0].dbcount!="0");                
                    }                            
                    console.log('TBFound',TBFound)                            
                } catch (error) {
                console.log('[Error verifying Table existance]: ',error.message)                   
                }
                if (!TBFound) { 
                    console.log('[Table not found]');
                    console.log('Creating Table...');
                    try {
                        await pool.query(createTB);    
                        console.log('Create Table Ok');
                        TB_Exists=true;
                    } catch (error) {
                        console.log('[Cannot Create Table]: ',error.message);
                    }    
        
                } else {
                    console.log('[Table Ok]');
                    TB_Exists=true;
                }                
            }
       } catch (error) {
           console.log(`Cannot Connect to Database:${error.message}`);         
       }
    }
    if (TB_Exists & DB_Exists) {
        console.log('Database & Table Ready to Work')
    }
}

module.exports = {DB_Init}