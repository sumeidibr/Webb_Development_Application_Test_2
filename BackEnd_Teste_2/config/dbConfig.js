export default  {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'teste_2_daw',
    dialect: 'mysql',
    
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}