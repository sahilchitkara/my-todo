var ConfigManager = require("./modules/ConfigManager");
var MongoDatabaseProvider = require("./modules/MongoDatabaseProvider");
var fs = require("fs");
var path = require("path");

//Populate the configurations by reading the AppConfig as well as the Config.json files. The environment is considered.
exports.initConfig = function (options) {
    new ConfigManager(options, function (config) {
        Object.defineProperty(global, '_config', {
            get: function () {
                return config;
            }
        });
    });
};

//Init all database Models
exports.initDomains = function (callback) {
    MongoDatabaseProvider.getDatabase(function (db) {
        Object.defineProperty(global, '_db', {
            get: function () {
                return db;
            }
        });
        fs.readdir(path.join(__appBaseDir, "domain"), function (err, list) {
            if (err) log.error(err);
            else {
                list.forEach(function (item) {
                    var name = item.toString().replace(/\.js$/, "");
                    var model = db.getDomain(name);
                    model.ensureAllManuallyDefinedSchemaIndexes();
                    Object.defineProperty(global, name, {
                        get: function () {
                            return model;
                        }
                    });
                });
            }
            callback();
        });
    });
};
