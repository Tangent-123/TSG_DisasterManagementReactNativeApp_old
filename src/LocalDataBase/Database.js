import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "Advisory.db";
const database_version = "1.0";
const database_displayname = "Local dataBase";
const database_size = 200000;
export default class Database {

    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM LoginData LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql
                                        ('CREATE TABLE IF NOT EXISTS LoginData (LArnID, LTaskTypeTitle, LName,LMobile,LEmail,LenableNext,LenableNSE,LenableBSE,Lebranch,LuserName,Ltype,Lcrm)');
                                }).then(() => {
                                    console.log("Table Created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });
    }
   // Client List Data Save
    initClientDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT * FROM ClientData').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql
                                    // ('CREATE TABLE IF NOT EXISTS ClientData (ClientID, ClientName, ClientAddress,ClientPan,ClientMobile,ClientEmail,ClientCode)');
                                     ('CREATE TABLE IF NOT EXISTS ClientData (ClientData)');
                                }).then(() => {
                                    console.log("Client Table Rohit bhai Created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });

                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });
    }
    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };
    //List Show data
    listProduct() {
        return new Promise((resolve) => {
            const products = [];
            this.initClientDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM ClientData', []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results;
                        console.log('empty' + len)
            //             for (let i = 0; i < len; i++) {
            //                 let row = results.rows.item(i);

            // //                 "ID": "123896",
            // // "name": "A K A Consultants (i) Pvt Ltd",
            // // "address": "8 S.b.i. Officers Colony,opp. Anand Bazar Near Beema Nagar  Indore 452001",
            // // "pan": "AADCM9617K",
            // // "mobile": "N/A",
            // // "email": "akakcm@gmail.com",
            // // "code": "150018"
            //                 console.log('empty' + row)
            //                 console.log(`Prod ID: ${row.ID}, Prod Name: ${row.name}`)
            //                 console.log(`Prod ID: ${row.address}, Prod Name: ${row.pan}`)
            //                 console.log(`Prod ID: ${row.mobile}, Prod Name: ${row.email}`)
            //                 const { ID, name, address, } = row;
            //                 products.push({
            //                     ID,
            //                     name,
            //                     address
            //                 });
            //             }
                        console.log(len);
                        resolve(len);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    //login data
    getproduct() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM LoginData').then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //get Client List
    getClientListData() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM LoginData').then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // //get value by ID
    // productById(id) {
    //     console.log(id);
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
    //                     console.log(results);
    //                     if (results.rows.length > 0) {
    //                         let row = results.rows.item(0);
    //                         resolve(row);
    //                     }
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    //Add Product Function 
    DataLoginData(prod) {
        console.log('kapp' + prod.arn_id)
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO LoginData VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?)',
                        [prod.arn_id, prod.beskTypeTitle,
                        prod.name, prod.mobile,
                        prod.email, prod.enableNext,
                        prod.enableNSE, prod.enableBSE,
                        prod.ebranch, prod.userName,
                        prod.type, prod.crm]).
                        then(([tx, results]) => {
                            resolve(results);
                        });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //ClientList Table
    ClientListData(prod) {
      // console.log('kapp' +JSON.stringify(prod.ID))
        return new Promise((resolve) => {
            this.initClientDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO ClientData VALUES (?)',
                        [prod,
                        // prod.name, prod.address,
                        // prod.pan, prod.mobile,
                        // prod.email, prod.code,
                        ]).
                        then(([tx, results]) => {
                            resolve(results);
                        });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    // //Update Product function
    // updateProduct(id, prod) {
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('UPDATE LoginData SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?', [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice, id]).then(([tx, results]) => {
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    //Delete Product Function 
    deleteProduct() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM LoginData').then(([tx, results]) => {
                        console.log('logiotu' + results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
 }