/*
 * Loading Modules
 * */
var async = require("async");

/*
 * This is the start point for BootStrap. This method is triggered externally from app.js when the instance is loaded.
 * This is only called once when the instance spins up.
 * */
exports.init = function () {
    console.log("Executing Bootstrap");

    switch (__appEnv) {
        case "development":
            bootstrapForDevelopment();
            break;
        case "test":
            bootstrapForTest();
            break;
        case "production":
            bootstrapForProduction();
            break;
        case "qa":
            bootstrapForQa();
            break;
        default:
            console.log("No Bootstrap for the Environment:", __appEnv);
    }
};

/*
 * Bootstrap execution for the env "development"
 * */
function bootstrapForDevelopment() {
    var tasks = [];

    //Define the tasks in order of execution
    tasks.push(createSuperAdminUserIfDoesNotExist);

    async.series(tasks, function () {
        console.log("Finished executing Bootstrap for 'development'");
    });
}

/*
 * Bootstrap execution for the env "production"
 * */
function bootstrapForProduction() {
    var tasks = [];

    //Define the tasks in order of execution
    tasks.push(createSuperAdminUserIfDoesNotExist);

    async.series(tasks, function () {
        console.log("Finished executing Bootstrap for 'production'");
    });
}

/*
 * Bootstrap execution for the env "test"
 * */
function bootstrapForTest() {
    var tasks = [];

    //Define the tasks in order of execution
    tasks.push(createSuperAdminUserIfDoesNotExist);

    async.series(tasks, function () {
        console.log("Finished executing Bootstrap for 'test'");
    });
}

/*
 * Bootstrap execution for the env "qa"
 * */
function bootstrapForQa() {
    var tasks = [];

    //Define the tasks in order of execution
    tasks.push(createSuperAdminUserIfDoesNotExist);

    async.series(tasks, function () {
        console.log("Finished executing Bootstrap for 'qa'");
    });
}


/***********************************************************************************************
 *
 * Individual task methods are described below.
 *
 ***********************************************************************************************/

/*
 * Create A super admin user if does not exist.
 * */
function createSuperAdminUserIfDoesNotExist(callback) {

    User.findOne({email:"test@test.com"},function(err,user){
        if(err) callback(err,null);
        else if(! user){
            var user=new User({
                name:"Test User",
                email:"test@test.com",
                password:"test"
            });
            user.save(function(err,user,numberOFUSer){
                if(err) callback(err,null);
                else{
                    console.log("Bootstrap User");
                    callback(null,user);
                };
            });
        }else{
            callback(null,user);
        }
    })

}
